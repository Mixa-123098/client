import React, { useState, useEffect } from "react";
import useImageUploader from "../../custom-hooks/useImageUploader";

import modalStore from "../../store/ModalStore";
import fileStore from "../../store/cropImgStore";

const CropImgDisplay = ({ label, src }) => {
  const { imagePreview } = useImageUploader({ src });

  const handleModalClose = () => {
    fileStore.setFileName(src && src);
    fileStore.fetchFile();

    const delay = 2500;

    modalStore.setIsModalReadyWithDelay(true, delay);
  };

  return (
    <div
      style={{ width: "25vw", height: "auto", padding: "10px", margin: "5px" }}
    >
      <div>{label}</div>
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          style={{ maxWidth: "100%", maxHeight: "200px" }}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => handleModalClose()}
        />
      )}
    </div>
  );
};

const CropHeaderAndPrewImg = ({ data }) => {
  const { project_id } = data;
  const [imgList, setImgList] = useState([]);
  const [blueprint, setBlueprint] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      fetch(`https://server-2gn8.onrender.com/projects`).then((response) =>
        response.json()
      ),
      fetch(`https://server-2gn8.onrender.com/blueprints`).then((response) =>
        response.json()
      ),
    ])
      .then(([projectsData, blueprintsData]) => {
        setImgList(projectsData.filter((img) => img.id === project_id));
        setBlueprint(
          blueprintsData.filter(
            (img) => img.project_id === parseInt(project_id)
          )
        );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [project_id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const currentImg = imgList && imgList[0];
  const currentBlueprint = blueprint && blueprint[0];

  return (
    <div>
      <CropImgDisplay
        label="Шапка проєкту"
        name="header_img"
        src={currentImg && currentImg.project_header_img}
      />
      <CropImgDisplay
        label="Превью проєкту"
        name="header_prew"
        src={currentImg && currentImg.project_img_src}
      />
      <CropImgDisplay
        label="Планування"
        name="blueprint"
        src={currentBlueprint && currentBlueprint.img}
      />
    </div>
  );
};

const CroppedImges = ({ project_id }) => {
  const [imges, setImges] = useState([]);

  const handleModalClose = (currentImg) => {
    fileStore.setFileName(currentImg);
    fileStore.fetchFile();

    const delay = 2500;

    modalStore.setIsModalReadyWithDelay(true, delay);
  };

  useEffect(() => {
    fetch("https://server-2gn8.onrender.com/project_imges")
      .then((response) => response.json())
      .then((data) => {
        setImges(
          data
            .filter((img) => img.project_id === project_id)
            .sort((a, b) => a.order - b.order)
        );
      })
      .catch((error) => {
        console.error("Error fetching img data:", error);
      });
  }, [project_id]);

  return (
    <div>
      <CropHeaderAndPrewImg data={{ imges, project_id }} />
      <div
        style={{
          width: "25vw",
          height: "auto",
          padding: "10px",
          margin: "0 5px 0 5px",
        }}
      >
        Картинки всередині проєкту
      </div>

      <div className="d-flex flex-wrap" style={{ maxWidth: "75vw" }}>
        {imges &&
          imges.map((element, index) => (
            <div
              key={index}
              style={{
                width: "25vw",
                height: "auto",
                padding: "10px",
                margin: "5px",
                cursor: "pointer",
              }}
            >
              <img
                src={`/img/main_imges_folder/${element.img}`}
                alt=""
                style={{ maxWidth: "100%" }}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => handleModalClose(element.img)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

const CropImgesComponent = () => {
  const [projects, setProjects] = useState([]);
  const [editedProject, setEditedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  fileStore.setCroppedProjectId(editedProject && editedProject.id);
  // console.log(editedProject);
  useEffect(() => {
    setLoading(true);
    fetch(`https://server-2gn8.onrender.com/projects`)
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleEditClick = (project) => {
    setEditedProject({ ...project });
  };

  const handleCancelClick = () => {
    setEditedProject(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="container mt-4 mb-4">
        <h1>Обрізати фотографії в проєктах</h1>
        <table className="table">
          {/* <thead>
            <tr>
              <th scope="col">Назва проєкту</th>
              <th scope="col">Місто</th>
              <th scope="col">Країна</th>
              <th scope="col">Дії</th>
            </tr>
          </thead> */}
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                {editedProject && editedProject.id === project.id ? (
                  <td colSpan="4">
                    <div>
                      <CroppedImges project_id={editedProject.id} />
                      <button
                        onClick={handleCancelClick}
                        className="btn btn-secondary mt-2 ml-2"
                      >
                        Закрити
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

export default CropImgesComponent;
