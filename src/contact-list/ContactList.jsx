import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideBar from "../side-bar/SideBar";
import "./Contact.css";

function ContactList() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("./contacts.json")
      .then((response) => response.json())
      .then((data) => {
        setContacts(data.contacts);
      })
      .catch((error) => {
        console.error("Error fetching JSON data", error);
      });
  }, []);

  const contactList = contacts.map((contact, i) => (
    <li key={i}>
      <div className="contact-item">
        <Link to={`/contact/${contact.id}`} className="contact">
          {`${contact.firstName} ${contact.lastName}`}
        </Link>
      </div>
    </li>
  ));

  return (
    <div className="contact-list-page">
      <SideBar />
      <ul className="contact-list">{contactList}</ul>
    </div>
  );
}

export default ContactList;
