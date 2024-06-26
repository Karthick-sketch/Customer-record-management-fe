import { useState } from "react";
import axios from "axios";
import "./CustomField.css";

function CustomFieldForm({ accountId, toast, fetchCustomFields, setEnable }) {
  const api = axios.create({ baseURL: "http://localhost:8080" });
  const [customField, setCustomField] = useState({});
  const [requiredField, setRequiredField] = useState(false);

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    if (value !== "none") {
      setCustomField((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  }

  function handleRequiredFieldChange(e) {
    setRequiredField(e.target.checked);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let requestBody = { ...customField, required: requiredField };
    api
      .post(`/custom-fields/account/${accountId}`, requestBody)
      .then((response) => {
        toast.success("Custom field created");
        disableFormWindow();
        fetchCustomFields();
      })
      .catch((error) => console.error(error));
  }

  function disableFormWindow() {
    setEnable(false);
  }

  return (
    <div className="right-side-window">
      <div className="right-side-window-header">
        <h2>Add custom fields</h2>
        <button className="close-btn" onClick={disableFormWindow}>
          <img src="/src/assets/close.svg" alt="close" />
        </button>
      </div>

      <form className="right-side-window-form" onSubmit={handleSubmit}>
        <div className="input-field-container">
          <label className="input-field-label">Field name</label>
          <input
            type="text"
            name="customFieldName"
            className="input-field"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-field-container">
          <label className="input-field-label">Field type</label>
          <select
            name="dataType"
            className="input-field"
            onChange={handleChange}
            required
          >
            <option value="none">Select type</option>
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
          </select>
        </div>
        <div className="input-field-container">
          <label className="input-field-label">
            <input
              type="checkbox"
              name="required"
              onChange={handleRequiredFieldChange}
            />
            Mandatory field
          </label>
        </div>
        <footer>
          <input type="submit" value="Create" className="create-btn" />
        </footer>
      </form>
    </div>
  );
}

export default CustomFieldForm;
