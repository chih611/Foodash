import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchItemsByName,
  clearSearchResults,
} from "../../../../store/slices/itemsSlice";
import SearchRounded from "@mui/icons-material/SearchRounded";
import ClearIcon from "@mui/icons-material/Clear";
import { useRouter } from "next/router";

const SearchBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [localSearchResults, setLocalSearchResults] = useState([]);

  // Access items from Redux store
  const { items } = useSelector((state) => state.items);

  // Safe search helper function
  const safeSearchMatch = (itemName, searchValue) => {
    try {
      return itemName && typeof itemName === 'string' && 
        itemName.toLowerCase().includes(searchValue.toLowerCase());
    } catch (err) {
      console.warn('Error matching item:', err);
      return false;
    }
  };

  // Handle search input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    try {
      if (value.trim()) {
        // Make sure items is an array before filtering
        if (!Array.isArray(items)) {
          console.warn('Items is not an array:', items);
          return;
        }

        const filteredItems = items.filter((item) => {
          // Check if item exists and has ITEM_NAME
          if (!item || !item.ITEM_NAME) {
            console.warn('Invalid item found:', item);
            return false;
          }
          return safeSearchMatch(item.ITEM_NAME, value);
        });

        setLocalSearchResults(filteredItems);
      } else {
        setLocalSearchResults([]);
        dispatch(clearSearchResults());
      }
    } catch (error) {
      console.error('Search error:', error);
      setLocalSearchResults([]);
    }
  };

  // Handle search submission
  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      dispatch(searchItemsByName(searchTerm));
      router.push(`/CustomerView/HomePage?search=${searchTerm}`);
    } else {
      dispatch(clearSearchResults());
      router.push("/CustomerView/HomePage");
    }
  };

  // Handle the 'Enter' key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch(search);
    }
  };

  // Handle clearing the search input
  const handleClearSearch = () => {
    setSearch("");
    setLocalSearchResults([]);
    dispatch(clearSearchResults());
    router.push("/CustomerView/HomePage");
  };

  // Handle clicking on a search result
  const handleSearchResultClick = (itemName) => {
    setSearch(itemName);
    handleSearch(itemName);
  };

  return (
    <div className="searchContainer" style={{ position: "relative" }}>
      <SearchRounded
        className="me-2"
        sx={{ color: "#fffffe", cursor: "pointer" }}
        onClick={() => handleSearch(search)}
      />
      <input
        className="search_bar"
        type="text"
        value={search}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Search anything on Foodash"
      />
      {search && (
        <ClearIcon
          className="clear-search-icon"
          sx={{ color: "#f38b3c", cursor: "pointer" }}
          onClick={handleClearSearch} // Clear search when the clear icon is clicked
        />
      )}

      {/* Display local search results below the search bar */}
      {(localSearchResults.length > 0 || search.trim()) && (
        <div
          className="search-results-container"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            zIndex: 1000,
            border: "1px solid #ddd",
            borderRadius: "4px",
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {localSearchResults.length > 0 ? (
            localSearchResults.map((item, index) => (
              <div
                key={index}
                className="result_item"
                onClick={() => handleSearchResultClick(item.ITEM_NAME)} // Make the item clickable
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #f0f0f0",
                  cursor: "pointer",
                }}
              >
                {item.ITEM_NAME}
              </div>
            ))
          ) : (
            <div
              style={{
                padding: "10px",
                color: "#777",
                textAlign: "center",
              }}
            >
              No items match your search
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
