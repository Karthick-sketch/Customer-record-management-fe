import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { convertToNormalText } from "../utils/StringUtils";
import "./CustomerRecordForm.css";

function CustomerRecordForm({ disable }) {
  const api = axios.create({ baseURL: "http://localhost:8080" });

  const navigateTo = useNavigate();
  const { accountId } = useParams();
  const [defaultFieldDetails, setDefaultFieldDetails] = useState([]);
  const [customFieldDetails, setCustomFieldDetails] = useState([]);
  const [customerRecords, setCustomerRecords] = useState({});

  useEffect(() => {
    fetchDefaultFieldDetails();
    fetchCustomFieldDetails();
  }, []);

  async function fetchDefaultFieldDetails() {
    await fetch("/default-fields.json")
      .then((response) => response.json())
      .then((data) => setDefaultFieldDetails(data.defaultFields))
      .catch((error) => console.error("Error fetching JSON data", error));
  }

  async function fetchCustomFieldDetails() {
    await api
      .get(`/custom-fields/account/${accountId}`)
      .then((response) => setCustomFieldDetails(response.data))
      .catch((error) => console.error("Error fetching JSON data", error));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setCustomerRecords((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let obj = customerRecords;
    obj["accountId"] = accountId;
    console.log(obj);
    await api
      .post("/customer-records", obj, {
        headers: { Authorization: "MQ==" },
      })
      .then((response) => {
        if (response.status === 201) {
          let id = response.data.customerRecord.id;
          navigateTo(`/customer-record/account/${accountId}/id/${id}`);
        }
      })
      .catch((error) => console.error(error));
  }

  function generateInputFields(key, name, type) {
    return (
      <div key={key} className="input-field-container">
        <label className="input-field-label">{convertToNormalText(name)}</label>
        <input
          type={type}
          name={name}
          value={customerRecords[name]}
          onChange={handleChange}
          className="input-field"
        />
      </div>
    );
  }

  return (
    <div className="right-side-window">
      <div className="right-side-window-header">
        <h2>Create contact</h2>
        <button className="close-btn" onClick={() => disable(false)}>
          <img src="/src/assets/close.svg" alt="close" />
        </button>
      </div>
      <form className="right-side-window-form" onSubmit={handleSubmit}>
        {defaultFieldDetails.map((df, i) =>
          generateInputFields(i, df.name, df.type)
        )}
        {customFieldDetails.map((cf) =>
          generateInputFields(cf.id, cf.customFieldName, cf.dataType)
        )}
        <input type="submit" value="Create" className="create-btn" />
      </form>
    </div>
  );
}

export default CustomerRecordForm;
