import React, { useState, useEffect } from "react";
import useImageUploader from "../../custom-hooks/useImageUploader";
import { useTranslation } from "react-i18next";

const ImageDisplay = ({ label, src, name, handleFileChange }) => {
  const { t } = useTranslation();

  const { imagePreview, handleImageChange } = useImageUploader({ src });

  const handleChange = (e) => {
    handleImageChange(e);
    handleFileChange(e);
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
        />
      )}

      <div>
        {t("editPage.editProject.ifYouWantToChangeImage1")}{" "}
        {src
          ? t("editPage.editProject.ifYouWantToChangeImage3")
          : t("editPage.editProject.ifYouWantToChangeImage4")}{" "}
        {t("editPage.editProject.ifYouWantToChangeImage2")}:
        <input type="file" name={name} onChange={(e) => handleChange(e)} />
      </div>
    </div>
  );
};

const EditHeaderAndPrewImg = ({ data, handleFileChange }) => {
  const { t } = useTranslation();
  const { project_id } = data;
  const [imgList, setImgList] = useState([]);
  const [blueprint, setBlueprint] = useState([]);
  const [loading, setLoading] = useState(true);
  // console.log(blueprint);
  useEffect(() => {
    setLoading(true);

    Promise.all([
      fetch(`http://localhost:3001/projects`).then((response) =>
        response.json()
      ),
      fetch(`http://localhost:3001/blueprints`).then((response) =>
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
      <ImageDisplay
        label={t("editPage.editProject.projectHeader")}
        name="header_img"
        src={currentImg && currentImg.project_header_img}
        handleFileChange={handleFileChange}
      />
      <ImageDisplay
        label={t("editPage.editProject.preview")}
        name="header_prew"
        src={currentImg && currentImg.project_img_src}
        handleFileChange={handleFileChange}
      />
      <ImageDisplay
        label={t("editPage.editProject.blueprintImage")}
        // name={Date.now() + "-" + Math.random()}
        // name={name}
        name="blueprint"
        src={currentBlueprint && currentBlueprint.img}
        handleFileChange={handleFileChange}
      />
    </div>
  );
};

export default EditHeaderAndPrewImg;
