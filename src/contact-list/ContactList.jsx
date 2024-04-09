import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Search from "../search/Search";
import SideBar from "../side-bar/SideBar";
import ListForm from "./ListForm";

function ContactList() {
  const api = axios.create({ baseURL: "http://localhost:8080" });

  const { accountId } = useParams();
  const [list, setList] = useState([]);
  const [isSideWindowEnabled, setIsSideWindowEnabled] = useState(false);

  useEffect(() => {
    fetchLists();
  }, []);

  function fetchLists() {
    api
      .get(`/lists/account/${accountId}`)
      .then((response) => setList(response.data))
      .catch((error) => {
        console.error("Error fetching JSON data", error);
      });
  }

  function searchList(search) {
    api
      .get(`/lists/account/${accountId}/search?q=${search}`)
      .then((response) => setList(response.data))
      .catch((error) => {
        console.error("Error fetching JSON data", error);
      });
  }

  return (
    <>
      {isSideWindowEnabled && (
        <ListForm toast={toast} disable={setIsSideWindowEnabled} />
      )}

      <div className={`container ${isSideWindowEnabled ? "dim-page" : ""}`}>
        <SideBar accountId={accountId} />
        <ToastContainer position="bottom-left" />

        <section className="content">
          <div className="header">
            <h2>Lists</h2>
            <button
              className="contact-create-btn"
              onClick={() => setIsSideWindowEnabled(true)}
            >
              Create
            </button>
          </div>

          <Search accountId={accountId} handleSearch={searchList} />

          <div className="contact-header">
            <span className="header-name">Name</span>
          </div>

          <ul className="contact-list">
            {list.map((list) => (
              <li key={list.id}>
                <Link to={`/lists/account/${list.accountId}/id/${list.id}`}>
                  <div className="contact-item">
                    <span className="contact-name">{list.listName}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

export default ContactList;
