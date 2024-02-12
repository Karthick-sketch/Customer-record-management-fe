import { Link } from "react-router-dom";
import "./Contact.css";

function ContactList({ data }) {
  const contactList = (contacts) =>
    contacts.map((contact, i) => (
      <li key={i}>
        <div className="contact-item">
          <Link to={`/${contact.id}`} className="contact">
            {`${contact.firstName} ${contact.lastName}`}
          </Link>
        </div>
      </li>
    ));

  return <ul>{contactList(data)}</ul>;
}

export default ContactList;
