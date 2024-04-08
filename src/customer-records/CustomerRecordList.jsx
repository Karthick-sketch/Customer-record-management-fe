import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import CustomerRecordCreateForm from "./CustomerRecordCreateForm";
import Search from "../search/Search";
import SideBar from "../side-bar/SideBar";
import "./CustomerRecordList.css";

function CustomerRecordList() {
  const api = axios.create({ baseURL: "http://localhost:8080" });

  const { accountId } = useParams();
  const [isSideWindowEnabled, setIsSideWindowEnabled] = useState(false);
  const [customerRecords, setCustomerRecords] = useState([]);

  useEffect(() => {
    fetchCustomerRecords();
  }, []);

  function fetchCustomerRecords() {
    api
      .get(`/customer-records/account/${accountId}?pageNumber=1&pageSize=30`)
      .then(({ data }) => setCustomerRecords(data))
      .catch((error) => {
        console.error("Error fetching JSON data", error);
      });
  }

  function searchCustomerRecords(search) {
    api
      .get(`/customer-records/account/${accountId}/search?q=${search}`)
      .then(({ data }) => setCustomerRecords(data))
      .catch((error) => {
        console.error("Error fetching JSON data", error);
      });
  }

  return (
    <>
      {isSideWindowEnabled && (
        <CustomerRecordCreateForm
          accountId={accountId}
          setEnable={setIsSideWindowEnabled}
        />
      )}
      <div className={`container ${isSideWindowEnabled ? "dim-page" : ""}`}>
        <SideBar accountId={accountId} />

        <section className="content">
          <div className="header">
            <h2>Contacts</h2>
            <div className="btn">
              <a
                className="export-btn"
                href={`http://localhost:8080/upload-status/account/${accountId}/export-csv`}
              >
                Export
              </a>
              <button
                className="contact-create-btn"
                onClick={() => setIsSideWindowEnabled(true)}
              >
                Create
              </button>
            </div>
          </div>

          <Search accountId={accountId} handleSearch={searchCustomerRecords} />

          <div className="contact-header">
            <span className="header-name">Name</span>
            <span className="header-email">Email</span>
            <span className="header-mobile">Mobile</span>
            <span className="header-address">Address</span>
            <span className="header-city">City</span>
          </div>

          <ul className="contact-list">
            {customerRecords.map(({ customerRecord: cr }) => (
              <li key={cr.id}>
                <Link to={`/contacts/account/${cr.accountId}/id/${cr.id}`}>
                  <div className="contact-item">
                    <span className="contact-name">
                      {cr.firstName} {cr.lastName}
                    </span>
                    <span className="contact-email">{cr.email}</span>
                    <span className="contact-mobile">{cr.phoneNumber}</span>
                    <span className="contact-address">{cr.address}</span>
                    <span className="contact-city">{cr.city}</span>
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

export default CustomerRecordList;
