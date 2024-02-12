import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Contact.css";

function Contact({ data }) {
  const { id } = useParams();
  const [contact, setContact] = useState({});

  useEffect(() => {
    try {
      const fetchedContact = data.find((c) => c.id == id);
      if (fetchedContact) {
        setContact(fetchedContact);
      }
    } catch (error) {
      console.error("Error fetching contact ", error);
    }
  }, [data, id]);

  return (
    <div className="contact-item" id={`contact-${contact.id}`}>
      <p>{`${contact.firstName} ${contact.lastName}`}</p>
      <p>{contact.email}</p>
    </div>
  );
}

export default Contact;
