import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SideBar from "../side-bar/SideBar";
import "./CustomField.css";
import { convertToNormalText } from "../utils/StringUtils";
import CustomFieldForm from "./CustomFieldForm";

function CustomFieldList() {
  const api = axios.create({ baseURL: "http://localhost:8080" });

  const { accountId } = useParams();
  const [customerRecordFields, setCustomerRecordFields] = useState([]);
  const [isSideWindowEnabled, setIsSideWindowEnabled] = useState(false);

  useEffect(() => {
    getCustomerRecordFields();
  }, []);

  async function getCustomerRecordFields() {
    return await api
      .get(`/customer-records/fields/account/${accountId}`)
      .then((response) => {
        let fields = response.data;
        setCustomerRecordFields(fields);
      })
      .catch((error) => {
        console.error("Error fetching JSON data", error);
      });
  }

  return (
    <>
      {isSideWindowEnabled && (
        <CustomFieldForm
          accountId={accountId}
          fetchCustomerRecordFields={getCustomerRecordFields}
          setEnable={setIsSideWindowEnabled}
        />
      )}

      <div className="container">
        <SideBar accountId={accountId} />

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

          <ul className="custom-fields">
            {customerRecordFields.map((field, i) => (
              <li key={i}>{convertToNormalText(field)}</li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

export default CustomFieldList;
