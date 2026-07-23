import React, { useState } from "react";
import CropImg from "./CropImg";
import { observer } from "mobx-react-lite";
import modalStore from "../../store/ModalStore";
import fileStore from "../../store/cropImgStore";
import useFileUpload from "../../custom-hooks/useFileUpload";
import { useTranslation } from "react-i18next";
import { API_URL } from "../../config/api";

const CropModalForm = observer(() => {
  const { t } = useTranslation();

  const [projectData, setProjectData] = useState();
  const [saveStatus, setSaveStatus] = useState("idle"); // idle | saving | success | error
  const { handleFileChange, handleUpload, resetFiles } = useFileUpload(
    setProjectData,
    projectData,
    fileStore.croppedProjectId
  );

  const handleSaveClick = async () => {
    if (!fileStore.croppedImg) {
      alert(t("editPage.cropImages.noCroppedImage"));
      return;
    }
    if (!window.confirm(`${t("editPage.cropImages.save")}?`)) return;

    setSaveStatus("saving");
    try {
      await handleUpload(`${API_URL}/upload`);
      fileStore.bumpSavedVersion();
      fileStore.resetCrop();
      resetFiles();
      setSaveStatus("success");
    } catch (error) {
      console.error("Error uploading cropped image:", error);
      setSaveStatus("error");
    }
  };

  const handleModalDismiss = () => {
    modalStore.setIsModalReadyWithDelay(false, 0);
    // Drop any crop that wasn't saved so it can't resurface and get
    // uploaded the next time a different image is cropped and saved.
    fileStore.resetCrop();
    resetFiles();
    setSaveStatus("idle");
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

            {saveStatus === "success" && (
              <div className="alert alert-success mx-3" role="alert">
                {t("editPage.cropImages.saveSuccess")}
              </div>
            )}
            {saveStatus === "error" && (
              <div className="alert alert-danger mx-3" role="alert">
                {t("editPage.cropImages.saveError")}
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
                className="btn btn-success d-flex align-items-center gap-2"
                id="save-button"
                onClick={handleSaveClick}
                disabled={!fileStore.croppedImg || saveStatus === "saving"}
              >
                {saveStatus === "saving" && (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
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
