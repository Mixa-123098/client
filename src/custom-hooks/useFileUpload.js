import { useState } from "react";
import dataURLtoFile from "./dataURLtoFile";

// New uploads get a unique on-disk name so two photos with the same original
// filename (e.g. two phones both producing "IMG_0001.jpg") never silently
// overwrite each other. Crop-and-replace uploads intentionally keep their
// existing filename (see the dataURLtoFile branch below) since that flow is
// meant to overwrite the same image in place.
const makeUniqueFileName = (originalName) => {
  const dotIndex = originalName.lastIndexOf(".");
  const ext = dotIndex !== -1 ? originalName.slice(dotIndex) : "";
  const base = dotIndex !== -1 ? originalName.slice(0, dotIndex) : originalName;
  const safeBase = base.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 40) || "file";
  const unique = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  return `${safeBase}_${unique}${ext}`;
};

const useFileUpload = (updateProjectData, projectData, project_id) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e, fileDataUrlName) => {
    if (typeof e === "string") {
      const fileObject = dataURLtoFile(e, fileDataUrlName);
      setFiles((prevFiles) => [...prevFiles, fileObject]);
    } else {
      const name = e.target.name;
      const files = e.target.files;

      const renamedFiles = Array.from(files).map(
        (file) => new File([file], makeUniqueFileName(file.name), { type: file.type })
      );
      const fileNames = renamedFiles.map((file) => file.name);

      updateProjectData({
        ...projectData,
        [name]: files.length === 1 ? fileNames[0] : fileNames,
      });
      setFiles((prevFiles) => [...prevFiles, ...renamedFiles]);
    }
  };

  const handleUpload = (url) => {
    return Promise.all(
      files.map((file, index) => {
        const formData = new FormData();
        formData.append("file", file);

        return fetch(url, {
          method: "POST",
          credentials: "include",
          body: formData,
        }).then((response) => {
          if (!response.ok) {
            throw new Error(`File upload failed for file ${index + 1}`);
          }
        });
      })
    );
  };

  const resetFiles = () => setFiles([]);

  return { files, handleFileChange, handleUpload, resetFiles };
};

export default useFileUpload;
