import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ContactList from "./ContactList";
import Contact from "./Contact";
import ContactForm from "./ContactForm";
import FileUploadStatus from "./file-upload-status/FileUploadStatus";
import CsvFileUpload from "./CsvFileUpload";
import CustomField from "./custom-field/CustomField";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/contacts" />} />
        <Route path="/contacts" element={<ContactList />} />
        <Route path="/contact/:id" element={<Contact />} />
        <Route path="/contact/new" element={<ContactForm />} />
        <Route path="/upload-status" element={<FileUploadStatus />} />
        <Route path="/upload-csv" element={<CsvFileUpload />} />
        <Route path="/custom-fields" element={<CustomField />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
