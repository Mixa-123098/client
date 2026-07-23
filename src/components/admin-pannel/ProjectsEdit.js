import React, { useState, useEffect } from "react";
import DragAndDropImges from "./DragAndDropImges";
import useFileUpload from "../../custom-hooks/useFileUpload";
import { useTranslation } from "react-i18next";
import { API_URL } from "../../config/api";
import authStore from "../../store/authStore";

const ProjectsEdit = () => {
  const { t } = useTranslation();
  const canDelete = authStore.user?.role === "admin";

  const [projects, setProjects] = useState([]);
  const [editedProject, setEditedProject] = useState(null);
  const [projectData, setProjectData] = useState({
    project_name: "",
  });
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("idle"); // idle | saving | success | error
  const [retranslatingId, setRetranslatingId] = useState(null);
  const [retranslateResult, setRetranslateResult] = useState(null); // { id, ok } | null
  const [orderDirty, setOrderDirty] = useState(false);
  const [orderStatus, setOrderStatus] = useState("idle"); // idle | saving | success | error

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

  const handleRetranslateClick = async (projectId) => {
    setRetranslatingId(projectId);
    setRetranslateResult(null);
    try {
      const response = await fetch(`${API_URL}/projects/${projectId}/retranslate`, {
        method: "POST",
        credentials: "include",
      });
      setRetranslateResult({ id: projectId, ok: response.ok });
    } catch (error) {
      console.error("Error retranslating project:", error);
      setRetranslateResult({ id: projectId, ok: false });
    } finally {
      setRetranslatingId(null);
    }
  };

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

            // new_images comes from a multi-file input, so useFileUpload
            // stores it as a single string when exactly one file was picked
            // — normalize to an array either way.
            new_images:
              projectData && projectData.new_images
                ? [].concat(projectData.new_images)
                : [],
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

  const handleRowDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const handleRowDragOver = (e) => {
    e.preventDefault();
  };

  const handleRowDrop = (e, newIndex) => {
    e.preventDefault();
    const draggedIndex = Number(e.dataTransfer.getData("text/plain"));
    if (draggedIndex === newIndex) return;
    setProjects((prevProjects) => {
      const reordered = [...prevProjects];
      const [draggedProject] = reordered.splice(draggedIndex, 1);
      reordered.splice(newIndex, 0, draggedProject);
      return reordered;
    });
    setOrderDirty(true);
    setOrderStatus("idle");
  };

  const handleSaveOrder = async () => {
    setOrderStatus("saving");
    try {
      const response = await fetch(`${API_URL}/projects_order`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order: projects.map((project, index) => ({
            id: project.id,
            order: index,
          })),
        }),
      });
      if (!response.ok) throw new Error("order_save_failed");
      setOrderStatus("success");
      setOrderDirty(false);
    } catch (error) {
      console.error("Error saving project order:", error);
      setOrderStatus("error");
    }
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

        <p className="text-muted small">
          {t("editPage.editProject.reorderHint")}
        </p>
        {orderDirty && (
          <div className="d-flex align-items-center gap-2 mb-2">
            <button
              className="btn btn-dark btn-sm d-flex align-items-center gap-2"
              onClick={handleSaveOrder}
              disabled={orderStatus === "saving"}
            >
              {orderStatus === "saving" && (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              {t("editPage.editProject.saveOrder")}
            </button>
            {orderStatus === "error" && (
              <span className="text-danger small">
                {t("editPage.editProject.saveOrderError")}
              </span>
            )}
          </div>
        )}
        {orderStatus === "success" && !orderDirty && (
          <div className="alert alert-success py-1 small" role="alert">
            {t("editPage.editProject.saveOrderSuccess")}
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
            {projects.map((project, index) => (
              <tr
                key={project.id}
                draggable={!editedProject}
                onDragStart={(e) => handleRowDragStart(e, index)}
                onDragOver={handleRowDragOver}
                onDrop={(e) => handleRowDrop(e, index)}
                style={{ cursor: editedProject ? "default" : "grab" }}
              >
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
                        className="btn btn-outline-dark ms-3"
                        onClick={() => handleRetranslateClick(project.id)}
                        disabled={retranslatingId === project.id}
                      >
                        {retranslatingId === project.id && (
                          <span
                            className="spinner-border spinner-border-sm me-1"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        )}
                        {t("editPage.editProject.retranslate")}
                      </button>
                      {canDelete && (
                        <button
                          className="btn btn-danger ms-3"
                          onClick={() =>
                            handleDeleteClick(project.id, project.project_name)
                          }
                        >
                          {t("editPage.editProject.delete")}
                        </button>
                      )}
                      {retranslateResult && retranslateResult.id === project.id && (
                        <div
                          className={`small mt-1 ${
                            retranslateResult.ok ? "text-success" : "text-danger"
                          }`}
                        >
                          {retranslateResult.ok
                            ? t("editPage.editProject.retranslateSuccess")
                            : t("editPage.editProject.retranslateError")}
                        </div>
                      )}
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
