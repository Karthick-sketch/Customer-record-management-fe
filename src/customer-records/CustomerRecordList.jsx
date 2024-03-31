import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Search from "../search/Search";
import SideBar from "../side-bar/SideBar";
import "./CustomerRecordList.css";

function CustomerRecordList() {
  const api = axios.create({ baseURL: "http://localhost:8080" });

  const { accountId } = useParams();
  const [customerRecords, setCustomerRecords] = useState([]);

  useEffect(() => {
    fetchCustomerRecords();
  }, []);

  function fetchCustomerRecords() {
    api
      .get(`/customer-records/account/${accountId}?pageNumber=1&pageSize=30`)
      .then((response) => setCustomerRecords(response.data))
      .catch((error) => {
        console.error("Error fetching JSON data", error);
      });
  }

  function searchCustomerRecords(search) {
    api
      .get(`/customer-records/account/${accountId}/search?q=${search}`)
      .then((response) => setCustomerRecords(response.data))
      .catch((error) => {
        console.error("Error fetching JSON data", error);
      });
  }

  return (
    <div className="container">
      <SideBar />

      <section className="content">
        <div className="header">
          <h2>Customer Records</h2>
          <Link
            to={`/customer-record/account/${accountId}/new`}
            className="contact-create-btn"
          >
            Create
          </Link>
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
          {customerRecords.map((cr) => (
            <li key={cr.customerRecord.id}>
              <Link
                to={`/customer-record/account/${cr.customerRecord.accountId}/id/${cr.customerRecord.id}`}
              >
                <div className="contact-item">
                  <span className="contact-name">
                    {cr.customerRecord.firstName} {cr.customerRecord.lastName}
                  </span>
                  <span className="contact-email">
                    {cr.customerRecord.email}
                  </span>
                  <span className="contact-mobile">
                    {cr.customerRecord.phoneNumber}
                  </span>
                  <span className="contact-address">
                    {cr.customerRecord.address}
                  </span>
                  <span className="contact-city">{cr.customerRecord.city}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default CustomerRecordList;
