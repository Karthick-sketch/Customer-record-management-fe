import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import SideBar from "../side-bar/SideBar";
import CustomerRecordEditForm from "./CustomerRecordEditForm";
import { convertToNormalText } from "../utils/StringUtils";
import "./CustomerRecord.css";

function CustomerRecord() {
  const api = axios.create({ baseURL: "http://localhost:8080" });

  const { id, accountId } = useParams();
  const [customerRecord, setCustomerRecord] = useState({});
  const [isSideWindowEnabled, setIsSideWindowEnabled] = useState(false);

  useEffect(() => {
    getCustomerRecord();
  }, []);

  function getCustomerRecord() {
    api
      .get(`/customer-records/account/${accountId}/id/${id}`)
      .then((response) => {
        let data = response.data;
        setCustomerRecord({ ...data.customerRecord, ...data.customFields });
      })
      .catch((error) => {
        console.error("Error fetching JSON data", error);
      });
  }

  const customerRecordFields = () => {
    const nonFields = ["id", "accountId", "firstName", "lastName"];
    return Object.keys(customerRecord)
      .filter((field) => !nonFields.includes(field))
      .map((field, i) => (
        <div key={i}>
          <p className="customer-record-field-name">
            {convertToNormalText(field)}
          </p>
          <p className="customer-record-field-value">{customerRecord[field]}</p>
        </div>
      ));
  };

  return (
    <>
      {isSideWindowEnabled && (
        <CustomerRecordEditForm
          customerRecord={customerRecord}
          setCustomerRecord={setCustomerRecord}
          toast={toast}
          setEnable={setIsSideWindowEnabled}
        />
      )}
      <div className={`container ${isSideWindowEnabled ? "dim-page" : ""}`}>
        <SideBar accountId={accountId} />
        <ToastContainer position="bottom-left" />

        <section className="content">
          <div className="header">
            <h2>Contacts</h2>
            <button
              className="contact-create-btn"
              onClick={() => setIsSideWindowEnabled(true)}
            >
              Edit
            </button>
          </div>
          <div className="customer-record-item">
            <h3 className="customer-record-name">
              {`${customerRecord.firstName} ${customerRecord.lastName}`}
            </h3>
            <div className="customer-record-fields">
              {customerRecordFields()}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default CustomerRecord;
