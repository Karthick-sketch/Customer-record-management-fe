import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ContactForm from "./ContactForm";

function CustomerRecordCreateForm({ accountId, toast, setEnable }) {
  const api = axios.create({ baseURL: "http://localhost:8080" });

  const navigateTo = useNavigate();
  const [customerRecord, setCustomerRecord] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    api
      .post("/customer-records", customerRecord, {
        headers: { Authorization: "MQ==" },
      })
      .then(({ data }) => {
        let id = data.customerRecord.id;
        navigateTo(`/contacts/account/${accountId}/id/${id}`);
        toast.success("Contact created successfully");
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data.error[0]);
      });
  }

  return (
    <div className="right-side-window">
      <div className="right-side-window-header">
        <h2>Create contact</h2>
        <button className="close-btn" onClick={() => setEnable(false)}>
          <img src="/src/assets/close.svg" alt="close" />
        </button>
      </div>
      <form className="right-side-window-form" onSubmit={handleSubmit}>
        <ContactForm
          customerRecord={customerRecord}
          setCustomerRecord={setCustomerRecord}
        />
        <footer>
          <input type="submit" value="Create" className="create-btn" />
        </footer>
      </form>
    </div>
  );
}

export default CustomerRecordCreateForm;
