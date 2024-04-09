import { useState, useEffect } from "react";
import axios from "axios";
import "./List.css";

function ListAddContactForm({
  accountId,
  list,
  toast,
  fetchContactList,
  setEnable,
}) {
  const api = axios.create({ baseURL: "http://localhost:8080" });

  const [contacts, setContacts] = useState([]);
  const [customerRecords, setCustomerRecords] = useState([]);

  useEffect(() => {
    fetchCustomerRecords();
  }, []);

  function fetchCustomerRecords() {
    api
      .get(`/lists/account/${accountId}/id/${list.id}/contacts`)
      .then(({ data }) => {
        setCustomerRecords(data);
      })
      .catch((error) => {
        console.error("Error fetching JSON data", error);
      });
  }

  function findById(id, arr) {
    for (let cr of arr) {
      if (cr.id == id) {
        return cr;
      }
    }
    return {};
  }

  function disableFormWindow() {
    setEnable(false);
  }

  function clearContact(id) {
    let contact = findById(id, contacts);
    setContacts((prevState) => prevState.filter((cr) => cr !== contact));
    setCustomerRecords((prevState) => [contact, ...prevState]);
  }

  function handleChange(e) {
    let id = e.target.value;
    if (id !== "none") {
      let contact = findById(id, customerRecords);
      setContacts((prevState) => [contact, ...prevState]);
      setCustomerRecords((prevState) =>
        prevState.filter((cr) => cr !== contact)
      );
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    let requestBody = {
      accountId: accountId,
      listId: list.id,
      customerRecordIds: contacts.map(({ id }) => id),
    };
    api
      .post("/lists/add", requestBody)
      .then((response) => {
        toast.success("Contacts added to List");
        fetchContactList();
        disableFormWindow();
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="right-side-window">
      <div className="right-side-window-header">
        <h2>Add contacts</h2>
        <button className="close-btn" onClick={disableFormWindow}>
          <img src="/src/assets/close.svg" alt="close" />
        </button>
      </div>
      <form className="right-side-window-form" onSubmit={handleSubmit}>
        <div className="input-field-container">
          <label className="input-field-label">Select contacts</label>
          <select
            name="contacts"
            className="contact-dropdown"
            onChange={handleChange}
          >
            <option value="none">Select contact</option>
            {customerRecords.map(({ id, email }) => (
              <option key={id} value={id}>
                {email}
              </option>
            ))}
          </select>
          <div>
            {contacts.map(({ id, email }) => (
              <p key={id} className="selected-contact">
                {email}
                <button onClick={() => clearContact(id)}>
                  <img src="/src/assets/close.svg" alt="close" />
                </button>
              </p>
            ))}
          </div>
        </div>
        <footer>
          <input type="submit" value="Create" className="create-btn" />
        </footer>
      </form>
    </div>
  );
}

export default ListAddContactForm;
