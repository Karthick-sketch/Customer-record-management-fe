import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomerRecord from "./customer-records/CustomerRecord";
import FileUploadStatus from "./file-upload-status/FileUploadStatus";
import CsvFileUpload from "./file-upload-status/CsvFileUpload";
import CustomField from "./customer-records/CustomerRecordFields";
import CustomerRecordList from "./customer-records/CustomerRecordList";
import NotFound from "./utils/NotFound";
import ContactList from "./contact-list/ContactList";
import List from "./contact-list/List";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/contacts/account/:accountId"
          element={<CustomerRecordList />}
        />
        <Route
          path="/contacts/account/:accountId/id/:id"
          element={<CustomerRecord />}
        />
        <Route path="/lists/account/:accountId" element={<ContactList />} />
        <Route path="/lists/account/:accountId/id/:id" element={<List />} />
        <Route
          path="/upload-status/account/:accountId"
          element={<FileUploadStatus />}
        />
        <Route path="/upload-csv" element={<CsvFileUpload />} />
        <Route
          path="/contacts/custom-fields/account/:accountId"
          element={<CustomField />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
