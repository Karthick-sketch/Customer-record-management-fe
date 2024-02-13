import { useEffect, useState } from "react";
import { capitalize } from "./StringUtils";

function ContactForm() {
  const [customFields, setCustomFields] = useState([]);

  useEffect(() => {
    fetch("../custom-fields.json")
      .then((response) => response.json())
      .then((data) => setCustomFields(data.customFields))
      .catch((error) => console.error(error));
  }, []);

  const generateCustomFields = customFields.map((customField, i) => {
    return (
      <div key={i}>
        <label htmlFor="">{capitalize(customField.fieldName)}</label>
        <input
          type={customField.dataType}
          id={`customField-${customField.id}`}
        />
      </div>
    );
  });

  return (
    <form action="/contact/1" method="get">
      <div>
        <label htmlFor="">First name</label>
        <input type="text" id="firstName" />
      </div>
      <div>
        <label htmlFor="">Last name</label>
        <input type="text" id="lastName" />
      </div>
      <div>
        <label htmlFor="">Email</label>
        <input type="text" id="email" />
      </div>
      <div>
        <label htmlFor="">Phone number</label>
        <input type="text" id="phoneNumber" />
      </div>
      {generateCustomFields}
      <input type="submit" value="Create" />
    </form>
  );
}

export default ContactForm;
