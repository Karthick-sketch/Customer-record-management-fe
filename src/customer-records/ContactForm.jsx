import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { convertToNormalText } from "../utils/StringUtils";
import "./CustomerRecordForm.css";

function ContactForm({ customerRecord, setCustomerRecord }) {
  const api = axios.create({ baseURL: "http://localhost:8080" });

  const { accountId } = useParams();
  const [defaultFieldDetails, setDefaultFieldDetails] = useState([]);
  const [customFieldDetails, setCustomFieldDetails] = useState([]);

  useEffect(() => {
    fetchDefaultFieldDetails();
    fetchCustomFieldDetails();
    console.log(customerRecord);
  }, []);

  function fetchDefaultFieldDetails() {
    fetch("/default-fields.json")
      .then((response) => response.json())
      .then(({ defaultFields }) => setDefaultFieldDetails(defaultFields))
      .catch((error) => console.error("Error fetching JSON data", error));
  }

  function fetchCustomFieldDetails() {
    api
      .get(`/custom-fields/account/${accountId}`)
      .then(({ data }) => setCustomFieldDetails(data))
      .catch((error) => console.error("Error fetching JSON data", error));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setCustomerRecord((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function generateInputFields(key, name, type, required) {
    return (
      <div key={key} className="input-field-container">
        <label className="input-field-label">{convertToNormalText(name)}</label>
        <input
          type={type}
          name={name}
          value={customerRecord[name]}
          onChange={handleChange}
          className="input-field"
          required={required}
        />
      </div>
    );
  }

  return (
    <>
      {defaultFieldDetails.map((df, i) =>
        generateInputFields(i, df.name, df.type, df.required)
      )}
      {customFieldDetails.map((cf) =>
        generateInputFields(cf.id, cf.customFieldName, cf.dataType, cf.required)
      )}
    </>
  );
}

export default ContactForm;
