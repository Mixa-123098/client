import React, { useState } from "react";
import useFileUpload from "../../custom-hooks/useFileUpload";

const CreateProject = () => {
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
      alert("Виберіть спеціалізацію");
      return;
    }
    try {
      const response = await fetch("https://server-2gn8.onrender.com/create_post", {
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
    handleUpload("https://server-2gn8.onrender.com/upload");
  };

  return (
    <>
      <h2 className="mt-5 container">Створити новий проєкт</h2>
      <form
        onSubmit={handleFormSubmit}
        className="d-flex flex-column container mt-4 was-validated"
      >
        <div className="d-flex">
          <div className="col-3">Назва:</div>
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
            <div className="invalid-feedback">Назва проєкту обов'язкова</div>
            <div className="valid-feedback">Назва проєкту підходить</div>
          </div>
        </div>
        <br />
        <div className="d-flex">
          <div className="col-3">Місто:</div>
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
            <div className="valid-feedback">Назва міста підходить</div>
            <div className="invalid-feedback">Назва міста обов'язкова</div>
          </div>
        </div>
        <br />
        <div className="d-flex">
          <div className="col-3">Країна:</div>

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
            <div className="valid-feedback">Назва країни підходить</div>
            <div className="invalid-feedback">Назва країни обов'язкова</div>
          </div>
        </div>
        <br />
        <div className="d-flex">
          <div className="col-3">Спеціалізація:</div>

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
            <option value=" ">Виберіть спеціалізацію</option>
            <option value="1">Громадські інтер'єри</option>
            <option value="2">Квартири</option>
            <option value="3">Приватні будинки</option>
          </select>
        </div>
        <br />
        <div className="d-flex">
          <div className="col-3">Картинка(Превью):</div>

          <input
            type="file"
            name="project_img_src"
            onChange={(e) => handleFileChange(e)}
            required
          />
        </div>
        <br />
        <div className="d-flex">
          <div className="col-3">Картинка(Згори сторінки проєкту):</div>

          <input
            type="file"
            name="project_header_img"
            onChange={(e) => handleFileChange(e)}
            required
          />
        </div>
        <br />
        <div className="d-flex">
          <div className="col-3">Опис проєкту:</div>

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
            <div className="invalid-feedback">Опис проєкту обов'язковий</div>
            <div className="valid-feedback">Опис проєкту підходить</div>
          </div>
        </div>
        <br />
        <div className="d-flex">
          <div className="col-3">Дата завершення:</div>

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
            <div className="invalid-feedback">Дата завершення обов'язкова</div>
            <div className="valid-feedback">Дата завершення підходить</div>
          </div>
        </div>
        <br />
        <div className="d-flex">
          <div className="col-3">Площа(у квадратних метрах):</div>

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
            <div className="invalid-feedback">Площа обов'язкова</div>
            <div className="valid-feedback">Площа підходить</div>
          </div>
        </div>
        <br />
        <div className="d-flex">
          <div className="col-3">Команда:</div>

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
            <div className="invalid-feedback">Дата завершення обов'язкова</div>
            <div className="valid-feedback">Дата завершення підходить</div>
          </div>
        </div>
        <br />
        <div className="d-flex">
          <div className="col-3">Планування(Картинка):</div>

          <input
            type="file"
            name="blueprint_img"
            onChange={(e) => handleFileChange(e)}
            required
          />
        </div>
        <br />
        <div className="d-flex">
          <div className="col-3">Опис планування:</div>

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
            <div className="invalid-feedback">Опис плануваня обов'язковий</div>
            <div className="valid-feedback">Опис плануваня підходить</div>
          </div>
        </div>
        <br />
        <div className="d-flex">
          <div className="col-3">Картинки(в середині проєкту):</div>

          <input
            type="file"
            name="imges_list"
            onChange={(e) => handleFileChange(e)}
            multiple
          />
        </div>

        <button type="submit" className="btn btn-dark col-2 mt-4 mb-5">
          Створити проєкт
        </button>
      </form>
    </>
  );
};

export default CreateProject;
