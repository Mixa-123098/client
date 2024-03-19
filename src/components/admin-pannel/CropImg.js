import React, { useState, createRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./Crop.css";
import fileStore from "../../store/cropImgStore";

const CropImg = ({ fileDataUrl, handleFileChange }) => {
  const image = fileDataUrl;

  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef();

  const getCropData = () => {
    if (cropperRef.current?.cropper !== "undefined") {
      const croppedImg = cropperRef.current.cropper
        .getCroppedCanvas()
        .toDataURL();
      setCropData(croppedImg);
      fileStore.setCroppedImg(croppedImg);
      // handleFileChange({
      //   target: {
      //     name: fileStore.fileName && fileStore.fileName,
      //     files: [fileStore.croppedImg],
      //   },
      // });
      console.log(fileStore.fileName);
      handleFileChange(fileStore.croppedImg, fileStore.fileName);
      // handleFileChange(
      //   fileStore.croppedImg && fileStore.croppedImg,
      //   fileStore.fileName && fileStore.fileName
      // );
    }
  };

  return (
    <div>
      <div className="container-fluid d-flex justify-content-between">
        <div className="col-6">
          <h5>Прев'ю</h5>

          {fileDataUrl && (
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

              // autoCrop={true}
            />
          )}
        </div>

        <div className="col-6 d-flex flex-column align-items-center ">
          <h5>Обрізане фото</h5>
          <div>
            {cropData === "#" ? (
              <div>Ви ще не обрізали фотографію</div>
            ) : (
              <img style={{ maxWidth: "100%" }} src={cropData} alt="cropped" />
            )}
          </div>
        </div>
      </div>

      <div className="container d-flex justify-content-center mt-5 mb-5">
        <button onClick={getCropData} className="col-5 btn btn-dark p-1">
          <h3>Обрізати фотографію</h3>
        </button>
      </div>
    </div>
  );
};

export default CropImg;

// import React, { useState, createRef, useEffect } from "react";
// import Cropper from "react-cropper";
// import "cropperjs/dist/cropper.css";
// import "./Crop.css";
// import $ from "jquery"

// const CropImg = () => {
//   const [fileDataUrl, setFileDataUrl] = useState(null);

//   useEffect(() => {
//     const fetchFile = async () => {
//       const fileName = "photo_2023-12-28_15-19-25.jpg";
//       const url = `http://localhost:3001/get-file/${fileName}`;

//       try {
//         const response = await fetch(url);
//         const blob = await response.blob();

//         const reader = new FileReader();
//         reader.onload = () => {
//           const dataUrl = reader.result;
//           setFileDataUrl(dataUrl);
//         };
//         reader.readAsDataURL(blob);
//       } catch (error) {
//         console.error("Error fetching file:", error);
//       }
//     };

//     fetchFile();
//   }, []);

//   const image = fileDataUrl;

//   const [cropData, setCropData] = useState("#");
//   const cropperRef = createRef();

//   const getCropData = () => {
//     if (cropperRef.current?.cropper !== "undefined") {
//       setCropData(cropperRef.current.cropper.getCroppedCanvas().toDataURL());
//     }
//   };

//   return (
//     <div>
//       <div className="container">
//         <div className="d-flex justify-content-between">
//           <div className="col-6">
//             <h2>Прев'ю</h2>
//             <Cropper
//               ref={cropperRef}
//               style={{ height: "350px" }}
//               zoomTo={0.5}
//               initialAspectRatio={1}
//               src={image}
//               viewMode={1}
//               minCropBoxHeight={10}
//               minCropBoxWidth={10}
//               background={false}
//               responsive={true}
//               autoCropArea={1}
//               checkOrientation={false}
//               guides={true}
//             />
//           </div>

//           <div className="col-6 d-flex flex-column align-items-center">
//             <h2>Обрізане фото</h2>
//             <div>
//               <img
//                 style={{ maxWidth: "100%", height: "350px" }}
//                 src={cropData}
//                 alt="cropped"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container d-flex justify-content-center mt-5 mb-5">
//         <button onClick={getCropData} className="col-5 btn btn-dark p-1">
//           <h3>Обрізати фотографію</h3>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CropImg;
