import React, { useState } from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { InputGroup, FormControl, Button } from "react-bootstrap"; // Import Bootstrap components
import SearchIcon from "@mui/icons-material/Search"; // Import Search Icon from MUI

const SearchBar = ({ onSearch, categories, statuses }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Handle status change
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  // Trigger search on icon click
  const triggerSearch = () => {
    onSearch(searchTerm, selectedCategory, selectedStatus);
  };

  return (
    <div className="d-flex align-items-center">
      {/* Search input field */}
      <InputGroup className="me-2" style={{ maxWidth: "300px" }}>
        <FormControl
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange} // Update only local state
        />
      </InputGroup>

      {/* Category dropdown */}
      <select
        className="form-select me-2"
        value={selectedCategory}
        onChange={handleCategoryChange}
        style={{ maxWidth: "150px" }}
      >
        <option value="">Category</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Status dropdown */}
      <select
        className="form-select me-2"
        value={selectedStatus}
        onChange={handleStatusChange}
        style={{ maxWidth: "100px" }}
      >
        <option value="">Status</option>
        {statuses.map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>

      {/* Search button with icon */}
      <Button variant="primary" onClick={triggerSearch}>
        <SearchIcon />
      </Button>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired, // Function to handle search input
  categories: PropTypes.arrayOf(PropTypes.string), // Array of categories
  statuses: PropTypes.arrayOf(PropTypes.string), // Array of statuses
};

// Default props to prevent undefined errors
SearchBar.defaultProps = {
  categories: [],
  statuses: [],
};

export default SearchBar;
