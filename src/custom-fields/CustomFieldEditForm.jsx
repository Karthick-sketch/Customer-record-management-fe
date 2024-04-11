import { useState } from "react";
import axios from "axios";
import "./CustomField.css";

function CustomFieldEditForm({
  toast,
  customFieldData,
  fetchCustomFields,
  setEnable,
}) {
  const api = axios.create({ baseURL: "http://localhost:8080" });
  const [customField, setCustomField] = useState({
    customFieldName: customFieldData.customFieldName,
    dataType: customFieldData.dataType,
  });
  const [requiredField, setRequiredField] = useState(customFieldData.required);

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
      .patch(
        `/custom-fields/account/${customFieldData.accountId}/id/${customFieldData.id}`,
        requestBody
      )
      .then((response) => {
        toast.success("Custom field updated");
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
        <h2>Edit custom fields</h2>
        <button className="close-btn" onClick={disableFormWindow}>
          <img src="/src/assets/close.svg" alt="close" />
        </button>
      </div>

      <form className="right-side-window-form" onSubmit={handleSubmit}>
        <div className="input-field-container">
          <label className="input-field-label">Field name</label>
          <input
            type="text"
            value={customField.customFieldName}
            name="customFieldName"
            className="input-field"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-field-container">
          <label className="input-field-label">Field type</label>
          <select
            value={customField.dataType}
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
              checked={requiredField}
            />
            Mandatory field
          </label>
        </div>
        <footer>
          <input type="submit" value="Edit" className="create-btn" />
        </footer>
      </form>
    </div>
  );
}

export default CustomFieldEditForm;
