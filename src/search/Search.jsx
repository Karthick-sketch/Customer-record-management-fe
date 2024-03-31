import { useState } from "react";
import axios from "axios";
import "./Search.css";

function Search({ accountId, handleSearch }) {
  const api = axios.create({ baseURL: "http://localhost:8080" });

  const [search, setSearch] = useState("");

  function handleChange(e) {
    setSearch(e.target.value);
    e.preventDefault();
  }

  return (
    <div className="search-container">
      <input
        type="text"
        id="search-box"
        placeholder="Search contacts..."
        onChange={handleChange}
      />
      <button id="search-btn" onClick={() => handleSearch(search)}>
        Search
      </button>
    </div>
  );
}

export default Search;
