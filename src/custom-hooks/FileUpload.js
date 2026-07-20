import React from "react";
import useFileUpload from "./useFileUpload";
import { API_URL } from "../config/api";

const FileUpload = () => {
  const { handleFileChange, handleUpload } = useFileUpload();

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={() => handleUpload(`${API_URL}/upload`)}>
        Uploadd
      </button>
    </div>
  );
};

export default FileUpload;
