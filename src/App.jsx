import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import ContactList from "./ContactList";
import Contact from "./Contact";

function App() {
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

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ContactList data={contacts} />} />
          <Route path="/:id" element={<Contact data={contacts} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
