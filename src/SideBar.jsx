import { Link } from "react-router-dom";
import "./SideBar.css";

function SideBar() {
  return (
    <section className="side-bar">
      <div>
        <Link to="/contacts" className="side-bar-options">
          Contacts
        </Link>
      </div>
      <div>
        <Link to="/upload-status" className="side-bar-options">
          Uploads
        </Link>
      </div>
      <div>
        <Link to="/custom-fields" className="side-bar-options">
          Custom Fields
        </Link>
      </div>
    </section>
  );
}

export default SideBar;
