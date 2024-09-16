import { useState, useEffect } from "react";
import SearchRounded from "@mui/icons-material/SearchRounded";
import { BorderBottom, BorderColorOutlined } from "@mui/icons-material";

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('your-api-url');
      const data = await response.json();
      setList(data);
    }

    fetchData();
  }, []);

  const filteredList = list.filter(item => 
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="searchContainer">
      <SearchRounded className="me-2" sx={{ color: "#025373" }} />
      <input
        className = "search_bar"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search anything on Foodash"
        
      />
      {filteredList.length > 0 ? (
        filteredList.map((item, index) => (
          <div key={index} className="result_item">
            {item}
          </div>
        ))
      ) : (
        <div> </div>
      )}
    </div>
  );
};

export default SearchBar;
