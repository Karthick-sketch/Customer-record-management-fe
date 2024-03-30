import { Link } from "react-router-dom";
import "./SideBar.css";

function SideBar() {
  return (
    <section className="navbar">
      <p className="logo">LOGO</p>
      <ul>
        <li>
          <Link
            to={"/customer-records/account/1/contacts"}
            className="navbar-link"
          >
            Contacts
          </Link>
        </li>
        <li>
          <Link
            to={"/customer-records/account/1/lists"}
            className="navbar-link"
          >
            Lists
          </Link>
        </li>
        <li>
          <Link
            to={"/customer-records/account/1/segments"}
            className="navbar-link"
          >
            Segments
          </Link>
        </li>
        <li>
          <Link
            to={"/customer-records/account/1/whatsapp"}
            className="navbar-link"
          >
            Whatsapp
          </Link>
        </li>
        <li>
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
