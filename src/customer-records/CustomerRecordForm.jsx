import { useEffect, useState } from "react";
import { convertToNormalText } from "../utils/StringUtils";

function CustomerRecordForm() {
  const [contactFields, setContactFields] = useState([]);

  useEffect(() => {
    fetch("../contact-fields.json")
      .then((response) => response.json())
      .then((data) =>
        setContactFields(data.defaultFields.concat(data.customFields))
      )
      .catch((error) => console.error(error));
  }, []);

  const formFields = contactFields.map((contactField, i) => {
    return (
      <div key={i}>
        <p>{convertToNormalText(contactField.fieldName)}</p>
        <input type={contactField.dataType} name={contactField.fieldName} />
      </div>
    );
  });

  return (
    <section>
      {formFields}
      <input type="submit" value="Create" />
    </section>
  );
}

export default CustomerRecordForm;
