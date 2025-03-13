import React, { useState } from "react";
import useFileUpload from "../../custom-hooks/useFileUpload";
import { useTranslation } from "react-i18next";

const CreateProject = () => {
  const { t } = useTranslation();

  const [projectData, setProjectData] = useState({
    project_name: "",
    project_city: "",
    project_country: "",
    project_specialization: "",
    project_img_src: "",
    project_header_img: "",
    project_brief: "",
    project_finish_date: "",
    project_square: "",
    project_team: "",
    blueprint_img: "",
    blueprint_description: "",
    imges_list: [],
  });
  const tipoProjectId = Date.now();
  const { handleFileChange, handleUpload } = useFileUpload(
    setProjectData,
    projectData,
    tipoProjectId
  );

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProjectData({
      ...projectData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Project data submitted:", projectData);

    if (!["1", "2", "3"].includes(projectData.project_specialization)) {
      console.error("Invalid project_specialization value");
      alert(t("editPage.createNewProject.feedbacks.chooseSpecialization"));
      return;
    }
    try {
      const response = await fetch("http://localhost:3001/create_post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Server response:", result);
    } catch (error) {
      console.error("Error sending request:", error);
    }
    handleUpload("http://localhost:3001/upload");
  };

  return (
    <>
      <h2 className="mt-5 container">
        {t("editPage.createNewProject.create")}
      </h2>
      <form
        onSubmit={handleFormSubmit}
        className="d-flex flex-column container mt-4 was-validated"
      >
        <div className="d-flex">
          <div className="col-3">{t("editPage.createNewProject.name")}:</div>
          <div className="col-9">
            <input
              type="text"
              className={`form-control ${
                !projectData.project_name && "is-invalid"
              } `}
              name="project_name"
              value={projectData.project_name}
              onChange={handleInputChange}
              required
            />
            <div className="valid-feedback">
              {t("editPage.createNewProject.feedbacks.name.true")}
            </div>
            <div className="invalid-feedback">
              {t("editPage.createNewProject.feedbacks.name.false")}
            </div>
          </div>
        </div>
        <br />
        <div className="d-flex">
          <div className="col-3">{t("editPage.createNewProject.city")}:</div>
          <div className="col-9">
            <input
              type="text"
              name="project_city"
              className={`form-control ${
                !projectData.project_city && "is-invalid"
              } `}
              value={projectData.project_city}
              onChange={handleInputChange}
              required
            />
            <div className="valid-feedback">
              {t("editPage.createNewProject.feedbacks.city.true")}
            </div>
            <div className="invalid-feedback">
              {t("editPage.createNewProject.feedbacks.city.false")}
            </div>
          </div>
        </div>
        <br />
        <div className="d-flex">
          <div className="col-3">{t("editPage.createNewProject.country")}:</div>

          <div className="col-9">
            <input
              type="text"
              name="project_country"
              className={`form-control ${
                !projectData.project_country && "is-invalid"
              } `}
              value={projectData.project_country}
              onChange={handleInputChange}
              required
            />
            <div className="valid-feedback">
              {t("editPage.createNewProject.feedbacks.country.true")}
            </div>
            <div className="invalid-feedback">
              {t("editPage.createNewProject.feedbacks.country.false")}
            </div>
          </div>
        </div>
        <br />
        <div className="d-flex">
          <div className="col-3">
            {t("editPage.createNewProject.specialization.title")}:
          </div>

          <select
            name="project_specialization"
            id="project_specialization"
            className={`form-select ${
              projectData.project_specialization !== " " && "is-invalid"
            }`}
            value={projectData.project_specialization}
            onChange={handleInputChange}
            required
          >
            <option value=" ">
              {t("editPage.createNewProject.specialization.choose")}
            </option>
            <option value="1">
              {t("editPage.createNewProject.specialization.publicInteriors")}
            </option>
            <option value="2">
              {t("editPage.createNewProject.specialization.apartments")}
            </option>
            <option value="3">
              {t("editPage.createNewProject.specialization.privateHouses")}
            </option>
          </select>
        </div>
        <br />
        <div className="d-flex">
          <div className="col-3">
            {t("editPage.createNewProject.previewImage")}:
          </div>

          <input
            type="file"
            name="project_img_src"
            onChange={(e) => handleFileChange(e)}
            required
          />
        </div>
        <br />
        <div className="d-flex">
          <div className="col-3">
            {t("editPage.createNewProject.topProjectImage")}:
          </div>

          <input
            type="file"
            name="project_header_img"
            onChange={(e) => handleFileChange(e)}
            required
          />
        </div>
        <br />
        <div className="d-flex">
          <div className="col-3">
            {t("editPage.createNewProject.projectDescription")}:
          </div>

          <div className="col-9">
            <input
              type="text"
              name="project_brief"
              className={`form-control ${
                !projectData.project_brief && "is-invalid"
              } `}
              value={projectData.project_brief}
              onChange={handleInputChange}
              required
            />
            <div className="valid-feedback">
              {t("editPage.createNewProject.feedbacks.projectDescription.true")}
            </div>
            <div className="invalid-feedback">
              {t(
                "editPage.createNewProject.feedbacks.projectDescription.false"
              )}
            </div>
          </div>
        </div>
        <br />
        <div className="d-flex">
          <div className="col-3">{t("editPage.createNewProject.endDate")}:</div>

          <div className="col-9">
            <input
              type="text"
              name="project_finish_date"
              className={`form-control ${
                !projectData.project_finish_date && "is-invalid"
              } `}
              value={projectData.project_finish_date}
              onChange={handleInputChange}
              required
            />
            <div className="valid-feedback">
              {t("editPage.createNewProject.feedbacks.endDate.true")}
            </div>
            <div className="invalid-feedback">
              {t("editPage.createNewProject.feedbacks.endDate.false")}
            </div>
          </div>
        </div>
        <br />
        <div className="d-flex">
          <div className="col-3">{t("editPage.createNewProject.square")}:</div>

          <div className="col-9">
            <input
              type="text"
              name="project_square"
              className={`form-control ${
                !projectData.project_square && "is-invalid"
              } `}
              value={projectData.project_square}
              onChange={handleInputChange}
              required
            />
            <div className="valid-feedback">
              {t("editPage.createNewProject.feedbacks.square.true")}
            </div>
            <div className="invalid-feedback">
              {t("editPage.createNewProject.feedbacks.square.false")}
            </div>
          </div>
        </div>
        <br />
        <div className="d-flex">
          <div className="col-3">{t("editPage.createNewProject.team")}:</div>

          <div className="col-9">
            <input
              type="text"
              name="project_team"
              className={`form-control ${
                !projectData.project_team && "is-invalid"
              } `}
              value={projectData.project_team}
              onChange={handleInputChange}
              required
            />
            <div className="valid-feedback">
              {t("editPage.createNewProject.feedbacks.team.true")}
            </div>
            <div className="invalid-feedback">
              {t("editPage.createNewProject.feedbacks.team.false")}
            </div>
          </div>
        </div>
        <br />
        <div className="d-flex">
          <div className="col-3">
            {t("editPage.createNewProject.blueprintImage")}:
          </div>

          <input
            type="file"
            name="blueprint_img"
            onChange={(e) => handleFileChange(e)}
            required
          />
        </div>
        <br />
        <div className="d-flex">
          <div className="col-3">
            {t("editPage.createNewProject.blueprintDescription")}:
          </div>

          <div className="col-9">
            <input
              type="text"
              name="blueprint_description"
              className={`form-control ${
                !projectData.blueprint_description && "is-invalid"
              } `}
              value={projectData.blueprint_description}
              onChange={handleInputChange}
              required
            />
            <div className="valid-feedback">
              {" "}
              {t(
                "editPage.createNewProject.feedbacks.blueprintDescriprion.true"
              )}
            </div>
            <div className="invalid-feedback">
              {t(
                "editPage.createNewProject.feedbacks.blueprintDescriprion.false"
              )}
            </div>
          </div>
        </div>
        <br />
        <div className="d-flex">
          <div className="col-3">
            {t("editPage.createNewProject.imagesInsideTheProject")}:
          </div>

          <input
            type="file"
            name="imges_list"
            onChange={(e) => handleFileChange(e)}
            multiple
          />
        </div>

        <button type="submit" className="btn btn-dark col-2 mt-4 mb-5">
          {t("editPage.createNewProject.create")}
        </button>
      </form>
    </>
  );
};

export default CreateProject;
