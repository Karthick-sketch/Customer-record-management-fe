import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import SideBar from "../side-bar/SideBar";
import "./CustomField.css";
import { convertToNormalText } from "../utils/StringUtils";
import CustomFieldForm from "./CustomFieldForm";
import CustomFieldEditForm from "./CustomFieldEditForm";

function CustomFieldList() {
  const api = axios.create({ baseURL: "http://localhost:8080" });

  const { accountId } = useParams();
  const [customFields, setCustomFields] = useState([]);
  const [isSideWindowEnabledForCreate, setIsSideWindowEnabledForCreate] =
    useState(false);
  const [isSideWindowEnabledForEdit, setIsSideWindowEnabledForEdit] =
    useState(false);
  const [customFieldForEdit, setCustomFieldForEdit] = useState(0);

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

  function enableEditForm(field) {
    setCustomFieldForEdit(field);
    setIsSideWindowEnabledForEdit(true);
  }

  return (
    <>
      {isSideWindowEnabledForCreate && (
        <CustomFieldForm
          accountId={accountId}
          toast={toast}
          fetchCustomFields={fetchCustomFields}
          setEnable={setIsSideWindowEnabledForCreate}
        />
      )}

      {isSideWindowEnabledForEdit && (
        <CustomFieldEditForm
          toast={toast}
          customFieldData={{ ...customFieldForEdit }}
          fetchCustomFields={fetchCustomFields}
          setEnable={setIsSideWindowEnabledForEdit}
        />
      )}

      <div
        className={`container custom-field-container ${
          isSideWindowEnabledForCreate || isSideWindowEnabledForEdit
            ? "dim-page"
            : ""
        }`}
      >
        <SideBar accountId={accountId} />
        <ToastContainer position="bottom-left" />

        <section className="content">
          <div className="header">
            <h2>Custom fields</h2>
            <button
              className="contact-create-btn"
              onClick={() => setIsSideWindowEnabledForCreate(true)}
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
                <button
                  className="row-btn"
                  onClick={() => enableEditForm(field)}
                >
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
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

export default CustomFieldList;
