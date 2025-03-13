import React from "react";
import useFileUpload from "./useFileUpload";

const FileUpload = () => {
  const { handleFileChange, handleUpload } = useFileUpload();

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={() => handleUpload("http://localhost:3001/upload")}>
        Uploadd
      </button>
    </div>
  );
};

export default FileUpload;
