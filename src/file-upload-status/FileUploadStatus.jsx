import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import SideBar from "../side-bar/SideBar";
import "./FileUploadStatus.css";

function FileUploadStatus() {
  const api = axios.create({ baseURL: "http://localhost:8080" });

  const { accountId } = useParams();
  const [fileUploadStatus, setFileUploadStatus] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetch("/file-upload-status.json")
      .then((response) => response.json())
      .then((data) => setFileUploadStatus(data.fileUploadStatus))
      .catch((error) => console.error(error));
  }, []);

  function handleFile(e) {
    setFile(e.target.files[0]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    api
      .post(`/upload-status/account/${accountId}/upload-csv`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success("File upload successfully");
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="container">
      <SideBar accountId={accountId} />

      <section className="content">
        <div className="header">
          <h2>File Uploads</h2>
        </div>

        <div>
          <ToastContainer position="bottom-left" />
          <form onSubmit={handleSubmit}>
            <p>Upload CSV file</p>
            <input type="file" name="csvFile" onChange={handleFile} />
            <input type="submit" value="Upload" />
          </form>
        </div>

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
