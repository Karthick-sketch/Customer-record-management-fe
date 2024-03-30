import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { convertToNormalText } from "../utils/StringUtils";
import SideBar from "../side-bar/SideBar";

function CustomerRecordForm() {
  const api = axios.create({ baseURL: "http://localhost:8080" });

  const navigateTo = useNavigate();
  const { accountId } = useParams();
  const [defaultFieldDetails, setDefaultFieldDetails] = useState([]);
  const [customFieldDetails, setCustomFieldDetails] = useState([]);
  const [customerRecords, setCustomerRecords] = useState({});

  useEffect(() => {
    fetchDefaultFieldDetails();
    fetchCustomFieldDetails();
  }, []);

  async function fetchDefaultFieldDetails() {
    await fetch("/default-fields.json")
      .then((response) => response.json())
      .then((data) => setDefaultFieldDetails(data.defaultFields))
      .catch((error) => console.error("Error fetching JSON data", error));
  }

  async function fetchCustomFieldDetails() {
    await api
      .get(`/custom-fields/account/${accountId}`)
      .then((response) => setCustomFieldDetails(response.data))
      .catch((error) => console.error("Error fetching JSON data", error));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setCustomerRecords((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let obj = customerRecords;
    obj["accountId"] = accountId;
    console.log(obj);
    await api
      .post("/customer-records", obj, {
        headers: { Authorization: "MQ==" },
      })
      .then((response) => {
        if (response.status === 201) {
          let id = response.data.customerRecord.id;
          navigateTo(`/customer-record/account/${accountId}/id/${id}`);
        }
      })
      .catch((error) => console.error(error));
  }

  function generateInputFields(key, name, type) {
    return (
      <div key={key}>
        <p>{convertToNormalText(name)}</p>
        <input
          type={type}
          name={name}
          value={customerRecords[name]}
          onChange={handleChange}
        />
      </div>
    );
  }

  return (
    <div className="container">
      <SideBar />

      <section className="content">
        <h2>Customer Records</h2>

        <form onSubmit={handleSubmit}>
          {defaultFieldDetails.map((df, i) =>
            generateInputFields(i, df.name, df.type)
          )}
          {customFieldDetails.map((cf) =>
            generateInputFields(cf.id, cf.customFieldName, cf.dataType)
          )}
          <input type="submit" value="Create" />
        </form>
      </section>
    </div>
  );
}

export default CustomerRecordForm;
