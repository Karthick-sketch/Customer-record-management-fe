import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideBar from "../side-bar/SideBar";
import "./FileUploadStatus.css";

function FileUploadStatus() {
  const { accountId } = useParams();
  const [fileUploadStatus, setFileUploadStatus] = useState([]);

  useEffect(() => {
    fetch("/file-upload-status.json")
      .then((response) => response.json())
      .then((data) => setFileUploadStatus(data.fileUploadStatus))
      .catch((error) => console.error(error));
  }, []);

  function handleSubmit(e) {
    let { name, value } = e.target;
    console.log(name, value);
  }

  return (
    <div className="container">
      <SideBar accountId={accountId} />

      <section className="content">
        <div className="header">
          <h2>File Uploads</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <p>Upload CSV file</p>
          <input type="file" name="csvFile" />
          <input type="submit" value="Upload" />
        </form>

        <div className="contact-header">
          <span className="header-name">File name</span>
          <span className="header-email">Total records</span>
          <span className="header-mobile">Uploaded records</span>
          <span className="header-address">Duplicate records</span>
          <span className="header-city">Invalid records</span>
        </div>

        <ul className="contact-list">
          {fileUploadStatus.map((status, i) => (
            <li key={i}>
              <div className="contact-item">
                <span className="contact-name">{status.fileName}</span>
                <span className="contact-email">{status.totalRecords}</span>
                <span className="contact-mobile">{status.uploadedRecords}</span>
                <span className="contact-address">
                  {status.duplicateRecords}
                </span>
                <span className="contact-city">{status.invalidRecords}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default FileUploadStatus;
