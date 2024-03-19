import React, { useState, useEffect } from "react";
import EditHeaderAndPrewImg from "./EditHeaderAndPrewImg";

const DragAndDropImges = ({ project_id, setOrder, handleFileChange }) => {
  const [imges, setImges] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/project_imges")
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
        Картинки всередині проєкту
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
              }}
            >
              <img
                src={`/img/main_imges_folder/${element.img}`}
                alt=""
                style={{ maxWidth: "100%" }}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default DragAndDropImges;
