import React from "react";

const DragAndDropZone = ({ dropHandler, text }) => {
  const handleDragMove = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.stopPropagation();
    event.preventDefault();
    dropHandler(event.dataTransfer.files);
  };

  return (
    <div
      className="drag-and-drop"
      onDragEnter={handleDragMove}
      onDragLeave={handleDragMove}
      onDragOver={handleDragMove}
      onDrop={handleDrop}
    >
      {text}
    </div>
  );
};

export default DragAndDropZone;
