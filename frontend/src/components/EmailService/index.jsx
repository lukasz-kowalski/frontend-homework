import React, { useState } from "react";
import FileInput from "../../shared/FileInput";
import UnorderedList from "../../shared/UnorderedList";
import { mapFilesName, parseEmails } from "./utils";
import httpService from "../../services/http";
import Button from "../../shared/Button";
import Notification from "../../shared/Notification";
import DragAndDropZone from "../../shared/DragAndDropZone";

const acceptedFileTypes = ".txt";
const sendEndpoint = "https://frontend-homework.togglhire.vercel.app/api/send";

const EmailService = () => {
  const [filesName, setFilesName] = useState([]);
  const [emails, setEmails] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const resetStatus = () => {
    setSuccess(false);
    setError(false);
  };

  const addEmailsToState = async (files) => {
    resetStatus();

    const mappedFilesNames = await mapFilesName(files);
    setFilesName(mappedFilesNames);

    const emailsArray = await parseEmails(files);
    setEmails(emailsArray);
  };

  const handleFileDrop = (files) => {
    const filesArray = [...files];
    const filteredFiles = filesArray.filter(
      (file) => file.type === "text/plain"
    );
    addEmailsToState(filteredFiles);
  };

  const handleFileChange = (event) => {
    const files = [...event.target.files];

    addEmailsToState(files);
  };

  const handleClick = async () => {
    resetStatus();
    setIsLoading(true);

    try {
      const response = await httpService.post(sendEndpoint, { emails });
      if (response.status === 200) {
        setSuccess(true);
      } else if (response.status === 500) {
        const { error, emails } = await response.json();
        setError({ message: error, emails });
      } else {
        setError({ message: "Something went wrong", emails: [] });
      }
    } catch (err) {
      console.log(err, "err");
    } finally {
      setIsLoading(false);
    }
  };

  const getNotificationMessage = () => {
    if (isLoading) {
      return "Loading...";
    }

    if (success) {
      return "Emails sent successfully!";
    }

    if (error) {
      return `There was an error: ${error.message}`;
    }
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

      <DragAndDropZone
        dropHandler={handleFileDrop}
        text="Drag and drop .txt file(s)"
      />

      <UnorderedList data={filesName} />

      <Button handleClick={handleClick}>Send emails</Button>
      <Notification notification={getNotificationMessage()}>
        {error.emails && error.emails.length > 0 && (
          <UnorderedList data={error.emails} />
        )}
      </Notification>
    </div>
  );
};

export default EmailService;
