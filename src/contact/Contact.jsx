import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { convertToNormalText } from "../utils/StringUtils";
import "./Contact.css";

function Contact() {
  const { id } = useParams();
  const [contact, setContact] = useState({});

  useEffect(() => {
    fetch(`../contact-${id}.json`)
      .then((response) => response.json())
      .then((data) => {
        setContact({ ...data.defaultFields, ...data.customFields });
      })
      .catch((error) => {
        console.error("Error fetching JSON data", error);
      });
  }, []);

  const contactFields = () =>
    Object.keys(contact)
      .filter((field) => !["id", "firstName", "lastName"].includes(field))
      .map((field, i) => (
        <div key={i}>
          <p className="contact-field-name">{convertToNormalText(field)}</p>
          <p className="contact-field-value">{contact[field]}</p>
        </div>
      ));

  return (
    <div className="contact-item" id={`contact-${contact.id}`}>
      <h2 className="contact-name">{`${contact.firstName} ${contact.lastName}`}</h2>
      <div className="contact-fields">{contactFields()}</div>
    </div>
  );
}

export default Contact;
