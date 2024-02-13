import { useEffect, useState } from "react";

function FileUploadStatus() {
  const [fileUploadStatus, setFileUploadStatus] = useState([]);

  useEffect(() => {
    fetch("./file-upload-status.json")
      .then((response) => response.json())
      .then((data) => setFileUploadStatus(data.fileUploadStatus))
      .catch((error) => console.error(error));
  }, []);

  const uploadedFileStatus = fileUploadStatus.map((status, i) => {
    return (
      <tr key={i}>
        <td>{status.fileName}</td>
        <td>{status.totalRecords}</td>
        <td>{status.uploadedRecords}</td>
        <td>{status.duplicateRecords}</td>
        <td>{status.invalidRecords}</td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <td>File name</td>
          <td>Total records</td>
          <td>Uploaded records</td>
          <td>Duplicate records</td>
          <td>Invalid records</td>
        </tr>
      </thead>
      <tbody>{uploadedFileStatus}</tbody>
    </table>
  );
}

export default FileUploadStatus;
