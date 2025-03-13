import React, { useState } from "react";
import CropImg from "./CropImg";
import { observer } from "mobx-react-lite";
import modalStore from "../../store/ModalStore";
import fileStore from "../../store/cropImgStore";
import useFileUpload from "../../custom-hooks/useFileUpload";
import { useTranslation } from "react-i18next";

const CropModalForm = observer(() => {
  const { t } = useTranslation();

  const [projectData, setProjectData] = useState();
  // console.log(projectData);
  const { handleFileChange, handleUpload } = useFileUpload(
    setProjectData,
    projectData,
    fileStore.croppedProjectId
  );

  const handleSaveClick = (e) => {
    if (!fileStore.croppedImg) {
      alert(t("editPage.cropImages.noCroppedImage"));
    } else {
      window.confirm(`${t("editPage.cropImages.save")}?`);
      setTimeout(() => {
        handleUpload("http://localhost:3001/upload");
      }, 1000);
    }
  };
  const handleModalDismiss = () => {
    modalStore.setIsModalReadyWithDelay(false, 0);
  };

  const handleModalClick = (event) => {
    if (!event.target.closest(".modal-content")) {
      handleModalDismiss();
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        data-bs-keyboard="false"
        onClick={handleModalClick}
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {t("editPage.cropImages.cropImage")}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleModalDismiss}
              ></button>
            </div>

            {!modalStore.isModalReady ? (
              <h3 className="d-flex justify-content-center">
                {t("editPage.cropImages.loading")}
              </h3>
            ) : (
              <div className="mt-4">
                <CropImg
                  fileDataUrl={fileStore.fileDataUrl}
                  handleFileChange={handleFileChange}
                />
              </div>
            )}

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleModalDismiss}
              >
                {t("editPage.cropImages.close")}
              </button>
              <button
                type="button"
                className="btn btn-success"
                id="save-button"
                onClick={(e) => handleSaveClick(e)}
              >
                {t("editPage.cropImages.save")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default CropModalForm;
