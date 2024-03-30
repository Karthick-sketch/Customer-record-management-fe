import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import SideBar from "../side-bar/SideBar";
import "./CustomerRecord.css";

function CustomerRecords() {
  const api = axios.create({ baseURL: "http://localhost:8080" });

  const { accountId } = useParams();
  const [customerRecords, setCustomerRecords] = useState([]);

  useEffect(() => {
    getCustomerRecords();
  }, []);

  async function getCustomerRecords() {
    return await api
      .get(`/customer-records/all/account/${accountId}`)
      .then((response) => setCustomerRecords(response.data))
      .catch((error) => {
        console.error("Error fetching JSON data", error);
      });
  }

  const customerRecordList = customerRecords.map((customerRecord, i) => (
    <li key={i}>
      <div className="customer-record-item">
        <Link
          to={`/customer-record/account/${customerRecord.accountId}/id/${customerRecord.id}`}
          className="customer-record"
        >
          {`${customerRecord.firstName} ${customerRecord.lastName}`}
        </Link>
      </div>
    </li>
  ));

  return (
    <div className="customer-record-list-page">
      <SideBar />
      <section className="customer-record-list">
        <div>
          <h3>Contacts</h3>
          <Link to={`/customer-record/account/${accountId}/new`}>Create</Link>
        </div>
        <ul>{customerRecordList}</ul>
      </section>
    </div>
  );
}

export default CustomerRecords;
