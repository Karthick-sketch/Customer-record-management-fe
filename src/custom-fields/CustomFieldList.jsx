import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import SideBar from "../side-bar/SideBar";
import "./CustomField.css";
import { convertToNormalText } from "../utils/StringUtils";
import CustomFieldForm from "./CustomFieldForm";

function CustomFieldList() {
  const api = axios.create({ baseURL: "http://localhost:8080" });

  const { accountId } = useParams();
  const [customFields, setCustomFields] = useState([]);
  const [isSideWindowEnabled, setIsSideWindowEnabled] = useState(false);

  useEffect(() => {
    fetchCustomFields();
  }, []);

  function fetchCustomFields() {
    api
      .get(`/custom-fields/account/${accountId}`)
      .then(({ data }) => setCustomFields(data))
      .catch((error) => {
        console.error("Error fetching JSON data", error);
      });
  }

  return (
    <>
      {isSideWindowEnabled && (
        <CustomFieldForm
          accountId={accountId}
          toast={toast}
          fetchCustomFields={fetchCustomFields}
          setEnable={setIsSideWindowEnabled}
        />
      )}

      <div className="container">
        <SideBar accountId={accountId} />
        <ToastContainer position="bottom-left" />

        <section className="content">
          <div className="header">
            <h2>Custom fields</h2>
            <button
              className="contact-create-btn"
              onClick={() => setIsSideWindowEnabled(true)}
            >
              Add
            </button>
          </div>

          <div className="contact-header">
            <span className="header-name">Name</span>
            <span className="header-mobile">Type</span>
            <span className="header-city">Required</span>
          </div>

          <ul className="contact-list">
            {customFields.map((field) => (
              <li key={field.id}>
                <div className="contact-item">
                  <span className="contact-name">
                    {convertToNormalText(field.customFieldName)}
                  </span>
                  <span className="contact-mobile">
                    {convertToNormalText(field.dataType)}
                  </span>
                  <span className="contact-city">
                    {field.required ? "Yes" : "No"}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

export default CustomFieldList;
