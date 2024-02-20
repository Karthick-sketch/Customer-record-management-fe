import SideBar from "./SideBar";
import "./CustomField.css";

function CustomField() {
  const customFields = [
    {
      fieldName: "Age",
      dataType: "number",
    },
    {
      fieldName: "Gender",
      dataType: "text",
    },
    {
      fieldName: "Points",
      dataType: "number",
    },
  ];

  return (
    <div className="contact-list-page">
      <SideBar />
      <ul className="custom-fields">
        {customFields.map((field, i) => (
          <li key={i}>{field.fieldName}</li>
        ))}
      </ul>
    </div>
  );
}

export default CustomField;
