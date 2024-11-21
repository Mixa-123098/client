import React from "react";
import useFileUpload from "./useFileUpload";

const FileUpload = () => {
  const { handleFileChange, handleUpload } = useFileUpload();

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={() => handleUpload("https://server-2gn8.onrender.com/upload")}
      >
        Uploadd
      </button>
    </div>
  );
};

export default FileUpload;
