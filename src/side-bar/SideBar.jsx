import { Link } from "react-router-dom";
import "./SideBar.css";

function SideBar() {
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
          <Link to={"/contacts/account/1"} className="navbar-link">
            Contacts
          </Link>
        </li>
        <li>
          <img
            src="/src/assets/list.svg"
            alt="list-icon"
            className="sidebar-icon"
          />
          <Link to={"/lists/account/1"} className="navbar-link">
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
            to={"/customer-records/account/1/segments"}
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
            to={"/customer-records/account/1/whatsapp"}
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
            to={"/customer-records/account/1/workflow"}
            className="navbar-link"
          >
            Workflow
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default SideBar;
