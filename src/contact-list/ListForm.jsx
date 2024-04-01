import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ListForm({ disable }) {
  const api = axios.create({ baseURL: "http://localhost:8080" });

  const navigateTo = useNavigate();
  const { accountId } = useParams();
  const [listName, setListName] = useState("");

  function handleChange(e) {
    setListName(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let obj = { accountId: accountId, listName: listName };
    console.log(obj);
    await api
      .post("/lists", obj)
      .then((response) => {
        if (response.status === 201) {
          let id = response.data.customerRecord.id;
          navigateTo(`/customer-record/account/${accountId}/id/${id}`);
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="right-side-window">
      <div className="right-side-window-header">
        <h2>Create list</h2>
        <button className="close-btn" onClick={() => disable(false)}>
          <img src="/src/assets/close.svg" alt="close" />
        </button>
      </div>
      <form className="right-side-window-form" onSubmit={handleSubmit}>
        <div className="input-field-container">
          <label className="input-field-label">List name</label>
          <input
            type="text"
            value={listName}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <input type="submit" value="Create" className="create-btn" />
      </form>
    </div>
  );
}

export default ListForm;
