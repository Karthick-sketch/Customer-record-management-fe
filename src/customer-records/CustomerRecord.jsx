import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { convertToNormalText } from "../utils/StringUtils";
import "./CustomerRecord.css";

function CustomerRecord() {
  const api = axios.create({ baseURL: "http://localhost:8080" });

  const { id, accountId } = useParams();
  const [customerRecord, setCustomerRecord] = useState({});

  useEffect(() => {
    getCustomerRecord();
  }, []);

  async function getCustomerRecord() {
    return await api
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
    <div
      className="customer-record-item"
      id={`customer-record-${customerRecord.id}`}
    >
      <h2 className="customer-record-name">{`${customerRecord.firstName} ${customerRecord.lastName}`}</h2>
      <div className="customer-record-fields">{customerRecordFields()}</div>
    </div>
  );
}

export default CustomerRecord;
