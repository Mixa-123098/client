import React, { useState, useEffect } from "react";
import DragAndDropImges from "./DragAndDropImges";
import useFileUpload from "../../custom-hooks/useFileUpload";

const ProjectsEdit = () => {
  const [projects, setProjects] = useState([]);
  const [editedProject, setEditedProject] = useState(null);
  const [projectData, setProjectData] = useState({
    project_name: "",
  });
  console.log(editedProject);
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  // console.log(order);
  // const [specialization, setSpecialization] = useState(
  //   editedProject && editedProject.project_specialization.replace(" ", "")
  // );

  const { handleFileChange, handleUpload } = useFileUpload(
    setProjectData,
    projectData,
    editedProject && editedProject.id
  );
  console.log(editedProject);
  useEffect(() => {
    setLoading(true);

    const fetchProjects = fetch(`http://localhost:3001/projects`).then(
      (response) => response.json()
    );
    const fetchOtherData = fetch(`http://localhost:3001/blueprints`).then(
      (response) => response.json()
    );

    Promise.all([fetchProjects, fetchOtherData])
      .then(([projectsData, otherData]) => {
        projectsData.ffskfkdskfds = true;
        setProjects(projectsData);
        // console.log(projectsData);
        // console.log(otherData);
        // setOtherData(otherData);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  // useEffect(() => {
  //   setLoading(true);
  //   fetch(`http://localhost:3001/projects`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setProjects(data);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  const handleEditClick = (project) => {
    setEditedProject({ ...project });
  };

  const handleSaveClick = async (e) => {
    try {
      e.preventDefault();
      handleUpload("http://localhost:3001/upload");

      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === editedProject.id ? editedProject : project
        )
      );

      const response = await fetch(
        `http://localhost:3001/update_project/${editedProject.id}`,
        {
          method: "PUT",
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
            // prew_img: projectData && projectData,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log("Project updated successfully:", result);
      } else {
        console.error("Failed to update project:", result);
      }
    } catch (error) {
      console.error("Error sending update request:", error);
    }

    setEditedProject(null);
  };

  const handleCancelClick = () => {
    setEditedProject(null);
  };

  const handleDeleteClick = async (projectId, project_name) => {
    const name = project_name.trimEnd();
    const isConfirmed = window.confirm(`Бажаєте видали "${name}?"`);

    if (isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:3001/delete_project/${projectId}`,
          {
            method: "DELETE",
          }
        );

        const result = await response.json();

        if (response.ok) {
          setProjects((prevProjects) =>
            prevProjects.filter((project) => project.id !== projectId)
          );
          console.log("Project deleted successfully:", result);
        } else {
          console.error("Failed to delete project:", result);
        }
      } catch (error) {
        console.error("Error sending delete request:", error);
      }
    } else {
      console.log("Deletion canceled by the user.");
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
        <h1>Редагувати проєкти</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Назва проєкту</th>
              <th scope="col">Місто</th>
              <th scope="col">Країна</th>
              <th scope="col">Дії</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                {editedProject && editedProject.id === project.id ? (
                  <td colSpan="4">
                    <div>
                      <label>Назва проєкту:</label>
                      <input
                        type="text"
                        value={editedProject.project_name}
                        onChange={(e) => handleInputChange(e, "project_name")}
                        className="form-control"
                      />
                      <label>Місто:</label>
                      <input
                        type="text"
                        value={editedProject.project_city}
                        onChange={(e) => handleInputChange(e, "project_city")}
                        className="form-control"
                      />
                      <label>Країна:</label>
                      <input
                        type="text"
                        value={editedProject.project_country}
                        onChange={(e) =>
                          handleInputChange(e, "project_country")
                        }
                        className="form-control"
                      />
                      {/* <label>Спеціалізація:</label>
                      <select
                        name="project_specialization"
                        value={specialization}
                        onChange={(e) =>
                          handleInputChange(e, "project_specialization")
                        }
                        className="form-select"
                      >
                        <option value="1">Громадські інтер'єри</option>
                        <option value="2">Квартири</option>
                        <option value="3">Приватні будинки</option>
                      </select> */}

                      <label>Опис проєкту:</label>
                      <input
                        type="text"
                        value={editedProject.project_brief}
                        onChange={(e) => handleInputChange(e, "project_brief")}
                        className="form-control"
                      />
                      <label>Дата завершення:</label>
                      <input
                        type="text"
                        value={editedProject.project_finish_date}
                        onChange={(e) =>
                          handleInputChange(e, "project_finish_date")
                        }
                        className="form-control"
                      />
                      <label>Площа:</label>
                      <input
                        type="text"
                        value={editedProject.project_square}
                        onChange={(e) => handleInputChange(e, "project_square")}
                        className="form-control"
                      />
                      <label>Команда:</label>
                      <input
                        type="text"
                        value={editedProject.project_team}
                        onChange={(e) => handleInputChange(e, "project_team")}
                        className="form-control"
                      />
                      {/* <label>Опис планування:</label>
                      <input
                        type="text"
                        value={editedProject.blueprint_description}
                        onChange={(e) =>
                          handleInputChange(e, "blueprint_description")
                        }
                        className="form-control"
                      /> */}
                      <DragAndDropImges
                        project_id={editedProject.id}
                        setOrder={setOrder}
                        handleFileChange={handleFileChange}
                      />
                      <button
                        onClick={(e) => handleSaveClick(e)}
                        className="btn btn-primary mt-2"
                      >
                        Зберегти
                      </button>
                      <button
                        onClick={handleCancelClick}
                        className="btn btn-secondary mt-2 ml-2"
                      >
                        Скасувати
                      </button>
                    </div>
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
                        Редагувати
                      </button>
                      <button
                        className="btn btn-danger ms-3"
                        onClick={() =>
                          handleDeleteClick(project.id, project.project_name)
                        }
                      >
                        Видалити
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
