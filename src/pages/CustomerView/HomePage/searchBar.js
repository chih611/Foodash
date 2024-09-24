import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchItemsByName,
  clearSearchResults,
} from "../../../../store/slices/itemsSlice";
import SearchRounded from "@mui/icons-material/SearchRounded";
import ClearRounded from "@mui/icons-material/ClearRounded";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Access the search results, status, and error from Redux store
  const { searchResults, status, error } = useSelector((state) => state.items);

  // Handle search submission
  const handleSearch = () => {
    if (search.trim()) {
      dispatch(searchItemsByName(search)); // Dispatch the thunk action
      setShowResults(true); // Show the results section when a search is performed
    } else {
      clearSearch(); // Clear search results when the search is empty
    }
  };

  // Handle clearing the search
  const clearSearch = () => {
    setSearch("");
    dispatch(clearSearchResults());
    setShowResults(false); // Hide results when cleared
  };

  // Handle the 'Enter' key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="searchContainer">
      <SearchRounded
        className="me-2"
        sx={{ color: "#025373", cursor: "pointer" }}
        onClick={handleSearch} // Trigger search when the icon is clicked
      />
      <input
        className="search_bar"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={handleKeyPress} // Trigger search when 'Enter' is pressed
        placeholder="Search anything on Foodash"
      />
      {search && (
        <ClearRounded
          className="me-2"
          sx={{ color: "#025373", cursor: "pointer" }}
          onClick={clearSearch} // Clear the search input and results
        />
      )}
      {/* Display search results or error only if showResults is true */}
    </div>
  );
};

export default SearchBar;
