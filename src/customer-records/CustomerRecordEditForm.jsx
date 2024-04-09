import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ContactForm from "./ContactForm";

function CustomerRecordEditForm({
  customerRecord,
  setCustomerRecord,
  toast,
  setEnable,
}) {
  const api = axios.create({ baseURL: "http://localhost:8080" });
  const { id, accountId } = customerRecord;

  function disableSideWindow() {
    setEnable(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let obj = { ...customerRecord };
    delete obj.id;
    delete obj.accountId;
    console.log("body");
    console.log(obj);
    api
      .patch(`/customer-records/account/${accountId}/id/${id}`, obj)
      .then((response) => {
        console.log(response.data);
        toast.success("Contact updated successfully");
        disableSideWindow();
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data.error[0]);
      });
  }

  return (
    <div className="right-side-window">
      <div className="right-side-window-header">
        <h2>Edit contact</h2>
        <button className="close-btn" onClick={disableSideWindow}>
          <img src="/src/assets/close.svg" alt="close" />
        </button>
      </div>
      <form className="right-side-window-form" onSubmit={handleSubmit}>
        <ContactForm
          customerRecord={customerRecord}
          setCustomerRecord={setCustomerRecord}
        />
        <footer>
          <input type="submit" value="Edit" className="create-btn" />
        </footer>
      </form>
    </div>
  );
}

export default CustomerRecordEditForm;
