import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomerRecord from "./customer-records/CustomerRecord";
import CustomerRecordForm from "./customer-records/CustomerRecordForm";
import FileUploadStatus from "./file-upload-status/FileUploadStatus";
import CsvFileUpload from "./file-upload-status/CsvFileUpload";
import CustomField from "./customer-records/CustomerRecordFields";
import CustomerRecordList from "./customer-records/CustomerRecordList";
import NotFound from "./utils/NotFound";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/customer-records/account/:accountId/contacts"
          element={<CustomerRecordList />}
        />
        <Route
          path="/customer-record/account/:accountId/id/:id"
          element={<CustomerRecord />}
        />
        <Route
          path="/customer-record/account/:accountId/new"
          element={<CustomerRecordForm />}
        />
        <Route path="/upload-status" element={<FileUploadStatus />} />
        <Route path="/upload-csv" element={<CsvFileUpload />} />
        <Route
          path="/custom-fields/account/:accountId"
          element={<CustomField />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
