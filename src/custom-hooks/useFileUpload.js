import { useState } from "react";
import dataURLtoFile from "./dataURLtoFile";

const useFileUpload = (updateProjectData, projectData, project_id) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e, fileDataUrlName) => {
    if (typeof e === "string") {
      const fileObject = dataURLtoFile(e, fileDataUrlName);
      setFiles((prevFiles) => [...prevFiles, fileObject]);
      console.log("blablba");
    } else {
      const name = e.target.name;
      const files = e.target.files;

      const fileNames = Array.from(files).map((file) => file.name);

      updateProjectData({
        ...projectData,
        [name]: files.length === 1 ? fileNames[0] : fileNames,
      });
      setFiles((prevFiles) => [...prevFiles, ...e.target.files]);
    }
  };

  const handleUpload = (url) => {
    files.forEach((file, index) => {
      const formData = new FormData();
      formData.append("file", file);

      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`File upload failed for file ${index + 1}`);
          }
          console.log(`File ${index + 1} uploaded!`);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

  return { files, handleFileChange, handleUpload };
};

export default useFileUpload;
