import React, { useRef } from "react";

const FileInput = ({
  name,
  acceptedFileTypes,
  handleFileChange,
  isMultiple,
}) => {
  const fileInputRef = useRef(null);

  return (
    <input
      type="file"
      name={name}
      accept={acceptedFileTypes}
      ref={fileInputRef}
      onChange={handleFileChange}
      multiple={isMultiple}
    />
  );
};

export default FileInput;
