import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import CustomerRecords from "./customer-records/CustomerRecords";
import CustomerRecord from "./customer-records/CustomerRecord";
import CustomerRecordForm from "./customer-records/CustomerRecordForm";
import FileUploadStatus from "./file-upload-status/FileUploadStatus";
import CsvFileUpload from "./file-upload-status/CsvFileUpload";
import CustomField from "./customer-records/CustomerRecordFields";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/customer-records/account/:accountId"
          element={<CustomerRecords />}
        />
        <Route
          path="/customer-record/account/:accountId/id/:id"
          element={<CustomerRecord />}
        />
        <Route path="/customer-record/new" element={<CustomerRecordForm />} />
        <Route path="/upload-status" element={<FileUploadStatus />} />
        <Route path="/upload-csv" element={<CsvFileUpload />} />
        <Route
          path="/custom-fields/account/:accountId"
          element={<CustomField />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
