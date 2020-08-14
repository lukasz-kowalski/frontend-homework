export const parseEmails = async (files) => {
  const blob = new Blob(files);
  const emailsBlob = await blob.text();
  const emailsArray = emailsBlob.trim().split("\n");

  return emailsArray;
};

export const mapFilesName = async (files) => {
  const emailsArray = [];

  for (const file of files) {
    const parsedEmail = await parseEmails([file]);
    const numberOfEmails = parsedEmail.length;

    emailsArray.push(`${file.name} - [${numberOfEmails}]`);
  }

  return emailsArray;
};
