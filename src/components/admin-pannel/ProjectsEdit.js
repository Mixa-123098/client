import React, { useState, useEffect } from "react";
import DragAndDropImges from "./DragAndDropImges";
import useFileUpload from "../../custom-hooks/useFileUpload";
import { useTranslation } from "react-i18next";
import { API_URL } from "../../config/api";

const ProjectsEdit = () => {
  const { t } = useTranslation();

  const [projects, setProjects] = useState([]);
  const [editedProject, setEditedProject] = useState(null);
  const [projectData, setProjectData] = useState({
    project_name: "",
  });
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("idle"); // idle | saving | success | error

  const { handleFileChange, handleUpload } = useFileUpload(
    setProjectData,
    projectData,
    editedProject && editedProject.id
  );

  useEffect(() => {
    setLoading(true);

    const fetchProjects = fetch(`${API_URL}/projects`).then((response) =>
      response.json()
    );

    fetchProjects
      .then((projectsData) => {
        setProjects(projectsData);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleEditClick = (project) => {
    setStatus("idle");
    setEditedProject({
      ...project,
      project_specialization: project.project_specialization?.trim(),
    });
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    setStatus("saving");
    try {
      await handleUpload(`${API_URL}/upload`);

      const response = await fetch(
        `${API_URL}/update_project/${editedProject.id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            project_name: editedProject.project_name,
            project_city: editedProject.project_city,
            project_country: editedProject.project_country,
            project_specialization: editedProject.project_specialization,
            project_img_src: projectData && projectData.header_prew,
            project_header_img: projectData && projectData.header_img,
            project_brief: editedProject.project_brief,
            project_finish_date: editedProject.project_finish_date,
            project_square: editedProject.project_square,
            project_team: editedProject.project_team,

            imges_list: order,

            prew_img: projectData && projectData.blueprint,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("update_failed");
      }

      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === editedProject.id ? editedProject : project
        )
      );
      setStatus("success");
      setEditedProject(null);
    } catch (error) {
      console.error("Error sending update request:", error);
      setStatus("error");
    }
  };

  const handleCancelClick = () => {
    setEditedProject(null);
    setStatus("idle");
  };

  const handleDeleteClick = async (projectId, project_name) => {
    const name = project_name.trimEnd();
    const isConfirmed = window.confirm(
      `${t("editPage.editProject.deleMassage")} "${name}?"`
    );

    if (isConfirmed) {
      try {
        const response = await fetch(
          `${API_URL}/delete_project/${projectId}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );

        if (response.ok) {
          setProjects((prevProjects) =>
            prevProjects.filter((project) => project.id !== projectId)
          );
        } else {
          const result = await response.json();
          console.error("Failed to delete project:", result);
        }
      } catch (error) {
        console.error("Error sending delete request:", error);
      }
    }
  };

  const handleInputChange = (e, field) => {
    setEditedProject((prevProject) => ({
      ...prevProject,
      [field]: e.target.value,
    }));
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="container mt-4 mb-4">
        <h1>{t("editPage.editProject.editProject")}</h1>

        {status === "success" && (
          <div className="alert alert-success" role="alert">
            {t("editPage.editProject.saveSuccess")}
          </div>
        )}
        {status === "error" && (
          <div className="alert alert-danger" role="alert">
            {t("editPage.editProject.saveError")}
          </div>
        )}

        <table className="table">
          <thead>
            <tr>
              <th scope="col">{t("editPage.editProject.projectName")}</th>
              <th scope="col">{t("editPage.editProject.city")}</th>
              <th scope="col">{t("editPage.editProject.country")}</th>
              <th scope="col">{t("editPage.editProject.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                {editedProject && editedProject.id === project.id ? (
                  <td colSpan="4">
                    <fieldset disabled={status === "saving"}>
                      <div>
                        <label>{t("editPage.editProject.projectName")}:</label>
                        <input
                          type="text"
                          value={editedProject.project_name}
                          onChange={(e) =>
                            handleInputChange(e, "project_name")
                          }
                          className="form-control"
                        />
                        <label>{t("editPage.editProject.city")}:</label>
                        <input
                          type="text"
                          value={editedProject.project_city}
                          onChange={(e) =>
                            handleInputChange(e, "project_city")
                          }
                          className="form-control"
                        />
                        <label>{t("editPage.editProject.country")}:</label>
                        <input
                          type="text"
                          value={editedProject.project_country}
                          onChange={(e) =>
                            handleInputChange(e, "project_country")
                          }
                          className="form-control"
                        />
                        <label>
                          {t(
                            "editPage.createNewProject.specialization.title"
                          )}
                          :
                        </label>
                        <select
                          value={editedProject.project_specialization}
                          onChange={(e) =>
                            handleInputChange(e, "project_specialization")
                          }
                          className="form-select"
                        >
                          <option value="1">
                            {t(
                              "editPage.createNewProject.specialization.publicInteriors"
                            )}
                          </option>
                          <option value="2">
                            {t(
                              "editPage.createNewProject.specialization.apartments"
                            )}
                          </option>
                          <option value="3">
                            {t(
                              "editPage.createNewProject.specialization.privateHouses"
                            )}
                          </option>
                        </select>

                        <label>
                          {t("editPage.editProject.projectDescription")}:
                        </label>
                        <input
                          type="text"
                          value={editedProject.project_brief}
                          onChange={(e) =>
                            handleInputChange(e, "project_brief")
                          }
                          className="form-control"
                        />
                        <label>{t("editPage.editProject.endDate")}:</label>
                        <input
                          type="text"
                          value={editedProject.project_finish_date}
                          onChange={(e) =>
                            handleInputChange(e, "project_finish_date")
                          }
                          className="form-control"
                        />
                        <label>{t("editPage.editProject.square")}:</label>
                        <input
                          type="text"
                          value={editedProject.project_square}
                          onChange={(e) =>
                            handleInputChange(e, "project_square")
                          }
                          className="form-control"
                        />
                        <label>{t("editPage.editProject.team")}:</label>
                        <input
                          type="text"
                          value={editedProject.project_team}
                          onChange={(e) =>
                            handleInputChange(e, "project_team")
                          }
                          className="form-control"
                        />
                        <DragAndDropImges
                          project_id={editedProject.id}
                          setOrder={setOrder}
                          handleFileChange={handleFileChange}
                        />
                        <button
                          onClick={(e) => handleSaveClick(e)}
                          className="btn btn-primary mt-2 d-inline-flex align-items-center gap-2"
                        >
                          {status === "saving" && (
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                          )}
                          {status === "saving"
                            ? t("editPage.editProject.saving")
                            : t("editPage.editProject.save")}
                        </button>
                        <button
                          onClick={handleCancelClick}
                          className="btn btn-secondary mt-2 ml-2"
                        >
                          {t("editPage.editProject.cancel")}
                        </button>
                      </div>
                    </fieldset>
                  </td>
                ) : (
                  <>
                    <td>{project.project_name}</td>
                    <td>{project.project_city}</td>
                    <td>{project.project_country}</td>
                    <td>
                      <button
                        className="btn btn-dark"
                        onClick={() => handleEditClick(project)}
                      >
                        {t("editPage.editProject.edit")}
                      </button>
                      <button
                        className="btn btn-danger ms-3"
                        onClick={() =>
                          handleDeleteClick(project.id, project.project_name)
                        }
                      >
                        {t("editPage.editProject.delete")}
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProjectsEdit;
