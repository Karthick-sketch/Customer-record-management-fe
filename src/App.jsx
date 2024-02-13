import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import ContactList from "./ContactList";
import Contact from "./Contact";
import ContactForm from "./ContactForm";
import FileUploadStatus from "./FileUploadStatus";
import CsvFileUpload from "./CsvFileUpload";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/contacts" element={<ContactList />} />
          <Route path="/contact/:id" element={<Contact />} />
          <Route path="/contact/new" element={<ContactForm />} />
          <Route path="/upload-status" element={<FileUploadStatus />} />
          <Route path="/upload-csv" element={<CsvFileUpload />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
