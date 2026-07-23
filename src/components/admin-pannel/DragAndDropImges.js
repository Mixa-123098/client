import React, { useState, useEffect } from "react";
import EditHeaderAndPrewImg from "./EditHeaderAndPrewImg";
import { useTranslation } from "react-i18next";
import { API_URL } from "../../config/api";

const DragAndDropImges = ({ project_id, setOrder, handleFileChange }) => {
  const { t } = useTranslation();
  const [imges, setImges] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/project_imges`)
      .then((response) => response.json())
      .then((data) => {
        setImges(
          data
            .filter((img) => img.project_id === project_id)
            .sort((a, b) => a.order - b.order)
        );
      })
      .catch((error) => {
        console.error("Error fetching img data:", error);
      });
  }, [project_id]);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newIndex) => {
    e.preventDefault();
    const draggedIndex = e.dataTransfer.getData("text/plain");
    const newImges = [...imges];
    const [draggedImage] = newImges.splice(draggedIndex, 1);
    newImges.splice(newIndex, 0, draggedImage);
    setImges(newImges);

    const newOrder = newImges.map((img, index) => ({
      id: img.id,
      order: index,
    }));
    setOrder(newOrder);
  };

  const handleNewImagesChange = (e) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setNewImagePreviews(Array.from(files).map((file) => URL.createObjectURL(file)));
    }
    handleFileChange(e);
  };

  const handleRemoveImage = async (imgId) => {
    if (!window.confirm(t("editPage.editProject.removeImageConfirm"))) {
      return;
    }
    try {
      const response = await fetch(`${API_URL}/project_imges/${imgId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) throw new Error("delete_failed");
      const remaining = imges.filter((img) => img.id !== imgId);
      setImges(remaining);
      setOrder(remaining.map((img, index) => ({ id: img.id, order: index })));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div>
      <EditHeaderAndPrewImg
        data={{ imges, project_id }}
        handleFileChange={handleFileChange}
      />
      <div
        style={{
          width: "25vw",
          height: "auto",
          padding: "10px",
          margin: "0 5px 0 5px",
        }}
      >
        {t("editPage.editProject.imagesInsideTheProject")}
      </div>

      <div className="d-flex flex-wrap" style={{ maxWidth: "75vw" }}>
        {imges &&
          imges.map((element, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              style={{
                width: "25vw",
                height: "auto",
                padding: "10px",
                margin: "5px",
                cursor: "grab",
                position: "relative",
              }}
            >
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => handleRemoveImage(element.id)}
                style={{ position: "absolute", top: 15, right: 15, zIndex: 1 }}
              >
                ×
              </button>
              <img
                src={`/img/main_imges_folder/${element.img}`}
                alt=""
                style={{ maxWidth: "100%" }}
              />
            </div>
          ))}
      </div>

      <div className="mt-3" style={{ maxWidth: "75vw" }}>
        <label className="form-label">
          {t("editPage.editProject.addNewImages")}
        </label>
        <input
          type="file"
          name="new_images"
          className="form-control"
          multiple
          onChange={handleNewImagesChange}
        />
        {newImagePreviews.length > 0 && (
          <div className="d-flex flex-wrap gap-2 mt-2">
            {newImagePreviews.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="rounded border"
                style={{ height: 90, width: 90, objectFit: "cover" }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DragAndDropImges;
