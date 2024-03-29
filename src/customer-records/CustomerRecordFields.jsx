import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SideBar from "../side-bar/SideBar";
import "./CustomField.css";
import { convertToNormalText } from "../utils/StringUtils";

function CustomerRecordFields() {
  const api = axios.create({ baseURL: "http://localhost:8080" });

  const { accountId } = useParams();
  const [customerRecordFields, setCustomerRecordFields] = useState([]);

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
    <div className="customer-record-list-page">
      <SideBar />
      <ul className="custom-fields">
        {customerRecordFields.map((field, i) => (
          <li key={i}>{convertToNormalText(field)}</li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerRecordFields;
