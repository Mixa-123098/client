import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import useImageUploader from "../../custom-hooks/useImageUploader";
import { useTranslation } from "react-i18next";
import { API_URL } from "../../config/api";
import modalStore from "../../store/ModalStore";
import fileStore from "../../store/cropImgStore";

// The preview here doubles as the crop trigger: clicking it opens the same
// crop modal used everywhere else (fileStore.fileName + fetchFile() loads
// the saved image, modalStore signals it's ready). Cropping always applies
// to the currently-saved image (src), never to a file just picked locally
// and not yet uploaded — same as the old standalone crop tab.
const ImageDisplay = observer(({ label, src, name, handleFileChange }) => {
  const { t } = useTranslation();

  const { imagePreview, handleImageChange } = useImageUploader({ src });

  const handleChange = (e) => {
    handleImageChange(e);
    handleFileChange(e);
  };

  const handleCropClick = () => {
    fileStore.setFileName(src);
    fileStore.fetchFile().then(() => {
      modalStore.setIsModalReadyWithDelay(true, 0);
    });
  };

  // Crop-and-replace uploads reuse the original filename, so the browser
  // won't refetch on its own after a crop — cache-bust with savedVersion.
  // Blob URLs (a file just picked, not yet saved) are already unique.
  const displaySrc =
    imagePreview && !imagePreview.startsWith("blob:")
      ? `${imagePreview}?v=${fileStore.savedVersion}`
      : imagePreview;

  return (
    <div
      style={{ width: "25vw", height: "auto", padding: "10px", margin: "5px" }}
    >
      <div>{label}</div>
      {imagePreview && (
        <>
          <img
            src={displaySrc}
            alt="Preview"
            style={{
              maxWidth: "100%",
              maxHeight: "200px",
              cursor: src ? "pointer" : "default",
            }}
            data-bs-toggle={src ? "modal" : undefined}
            data-bs-target={src ? "#exampleModal" : undefined}
            onClick={src ? handleCropClick : undefined}
          />
          {src && (
            <div className="small text-muted">
              {t("editPage.editProject.clickToCrop")}
            </div>
          )}
        </>
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
});

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
      fetch(`${API_URL}/projects`, { credentials: "include" }).then(
        (response) => response.json()
      ),
      fetch(`${API_URL}/blueprints`, { credentials: "include" }).then(
        (response) => response.json()
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
