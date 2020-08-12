import React, { useState } from "react";
import FileInput from "../../shared/FileInput";
import UnorderedList from "../../shared/UnorderedList";
import { mapFilesName } from "./utils";
import httpService from "../../services/http";
import Button from "../../shared/Button";

const acceptedFileTypes = ".txt";
const sendEndpoint = "https://frontend-homework.togglhire.vercel.app/api/send";

const EmailService = () => {
  const [filesName, setFilesName] = useState([]);
  const [emails, setEmails] = useState([]);

  const handleFileChange = async (event) => {
    const files = [...event.target.files];

    setFilesName(mapFilesName(files));

    const blob = new Blob(files);
    const emailsBlob = await blob.text();
    const emailsArray = emailsBlob.trim().split("\n");
    setEmails(emailsArray);
  };

  const handleClick = async () => {
    const response = await httpService.post(sendEndpoint, { emails });
  };

  return (
    <div>
      <form>
        <FileInput
          name="email-files"
          acceptedFileTypes={acceptedFileTypes}
          handleFileChange={handleFileChange}
          isMultiple={true}
        />
      </form>
      <UnorderedList data={filesName} />

      <Button handleClick={handleClick}>Send emails</Button>
    </div>
  );
};

export default EmailService;
