import { Link } from "react-router-dom";
import "./SideBar.css";
import { useEffect } from "react";

function SideBar({ accountId }) {
  accountId = 1;

  useEffect(() => {
    highlight();
  }, []);

  function highlight() {
    let navbarLinks = document.getElementsByClassName("navbar-link");
    let url = window.location.href;
    for (let link of navbarLinks) {
      if (url === link.href) {
        let li = link.parentElement;
        li.style.backgroundColor = "#555";
      }
    }
  }

  return (
    <section className="navbar">
      <p className="logo">LOGO</p>
      <ul>
        <li>
          <img
            src="/src/assets/contact.svg"
            alt="list-icon"
            className="sidebar-icon"
          />
          <Link to={`/contacts/account/${accountId}`} className="navbar-link">
            Contacts
          </Link>
        </li>
        <li>
          <img
            src="/src/assets/list.svg"
            alt="list-icon"
            className="sidebar-icon"
          />
          <Link to={`/lists/account/${accountId}`} className="navbar-link">
            Lists
          </Link>
        </li>
        <li>
          <img
            src="/src/assets/workflow.svg"
            alt="list-icon"
            className="sidebar-icon"
          />
          <Link
            to={`/customer-records/account/${accountId}/segments`}
            className="navbar-link"
          >
            Segments
          </Link>
        </li>
        <li>
          <img
            src="/src/assets/whatsapp.svg"
            alt="list-icon"
            className="sidebar-icon"
          />
          <Link
            to={`/customer-records/account/${accountId}/whatsapp`}
            className="navbar-link"
          >
            Whatsapp
          </Link>
        </li>
        <li>
          <img
            src="/src/assets/workflow.svg"
            alt="list-icon"
            className="sidebar-icon"
          />
          <Link
            to={`/customer-records/account/${accountId}/workflow`}
            className="navbar-link"
          >
            Workflow
          </Link>
        </li>
        <li>
          <img
            src="/src/assets/workflow.svg"
            alt="list-icon"
            className="sidebar-icon"
          />
          <Link
            to={`/upload-status/account/${accountId}`}
            className="navbar-link"
          >
            Uploads
          </Link>
        </li>
        <li>
          <img
            src="/src/assets/workflow.svg"
            alt="list-icon"
            className="sidebar-icon"
          />
          <Link
            to={`/contacts/custom-fields/account/${accountId}`}
            className="navbar-link"
          >
            Custom fields
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default SideBar;
