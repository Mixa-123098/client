import React, { useState, createRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./Crop.css";
import fileStore from "../../store/cropImgStore";
import { useTranslation } from "react-i18next";

const CropImg = ({ fileDataUrl, handleFileChange }) => {
  const { t } = useTranslation();

  const image = fileDataUrl;

  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef();

  const getCropData = () => {
    if (cropperRef.current?.cropper) {
      const croppedImg = cropperRef.current.cropper
        .getCroppedCanvas()
        .toDataURL();
      setCropData(croppedImg);
      fileStore.setCroppedImg(croppedImg);

      handleFileChange(fileStore.croppedImg, fileStore.fileName);
    }
  };

  return (
    <div>
      <div className="container-fluid d-flex justify-content-between">
        <div className="col-6">
          <h5>{t("editPage.cropImages.preview")}</h5>
          <Cropper
            ref={cropperRef}
            style={{ height: "350px" }}
            zoomTo={0.5}
            initialAspectRatio={4 / 3}
            src={image}
            viewMode={1}
            minCropBoxHeight={100}
            minCropBoxWidth={75}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            guides={true}
          />
        </div>

        <div className="col-6 d-flex flex-column align-items-center ">
          <h5>{t("editPage.cropImages.croppedImage")}</h5>
          <div>
            {cropData === "#" ? (
              <div>{t("editPage.cropImages.noCroppedImage")}</div>
            ) : (
              <img style={{ maxWidth: "100%" }} src={cropData} alt="cropped" />
            )}
          </div>
        </div>
      </div>

      <div className="container d-flex justify-content-center mt-5 mb-5">
        <button onClick={getCropData} className="col-5 btn btn-dark p-1">
          <h3>{t("editPage.cropImages.cropImage")}</h3>
        </button>
      </div>
    </div>
  );
};

export default CropImg;
