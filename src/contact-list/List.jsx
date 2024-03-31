import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Search from "../search/Search";
import SideBar from "../side-bar/SideBar";

function List() {
  const api = axios.create({ baseURL: "http://localhost:8080" });

  const { id, accountId } = useParams();
  const [list, setList] = useState([]);
  const [customerRecords, setCustomerRecords] = useState([]);

  useEffect(() => {
    fetchCustomerRecords();
  }, []);

  function fetchCustomerRecords() {
    api
      .get(`/lists/account/${accountId}/id/${id}`)
      .then(({ data }) => {
        setList(data);
        setCustomerRecords(data.customerRecords);
      })
      .catch((error) => {
        console.error("Error fetching JSON data", error);
      });
  }

  function searchLists(search) {
    api
      .get(`/lists/account/${accountId}/search?q=${search}`)
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
          <h2>Lists &gt; {list.listName}</h2>
          <Link
            to={`/customer-record/account/${accountId}/new`}
            className="contact-create-btn"
          >
            Create
          </Link>
        </div>

        <Search accountId={accountId} handleSearch={searchLists} />

        <div className="contact-header">
          <span className="header-name">Name</span>
          <span className="header-email">Email</span>
          <span className="header-mobile">Mobile</span>
          <span className="header-address">Address</span>
          <span className="header-city">City</span>
        </div>

        <ul className="contact-list">
          {customerRecords.map((cr) => (
            <li key={cr.id}>
              <Link to={`/customer-record/account/${cr.accountId}/id/${cr.id}`}>
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
  );
}

export default List;
