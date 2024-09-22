import React, { useState } from 'react';
import { Button } from 'react-bootstrap'; // Import Bootstrap components
import TableContent from './_Components/table'; // Import TableContent component
import SearchBar from './_Components/searchbar'; // Import SearchBar component
import inventoryData from './inventoryData'; // Import the inventory data
import EditIcon from '@mui/icons-material/Edit'; // Import Edit Icon from MUI
import DeleteIcon from '@mui/icons-material/Delete'; // Import Delete Icon from MUI

const Inventory = () => {
  const headers = ["ID", "NAME", "CATEGORY", "EXP.DATE", "STATUS", "ACTIONS"];

  const [data, setData] = useState(inventoryData); // Use the imported data as initial state
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category
  const [selectedStatus, setSelectedStatus] = useState(''); // State for selected status

  const handleEdit = (item) => {
    // Handle edit functionality here
    console.log("Edit item:", item);
  };

  const handleDelete = (item) => {
    // Handle delete functionality here
    console.log("Delete item:", item);
  };

  // Function to handle search and filtering
  const handleSearch = (term, category, status) => {
    setSearchTerm(term);
    setSelectedCategory(category);
    setSelectedStatus(status);

    const filteredData = inventoryData.filter((item) => {
      const matchesTerm = item.NAME.toLowerCase().includes(term.toLowerCase());
      const matchesCategory = category ? item.CATEGORY.toLowerCase() === category.toLowerCase() : true;
      const matchesStatus = status ? (status === 'In Stock' ? item.STATUS > 0 : item.STATUS === 0) : true;
      return matchesTerm && matchesCategory && matchesStatus;
    });

    setData(filteredData);
  };

  // Render the inventory page
  return (
    <div className="container mt-4">
      <h3>Inventory List</h3>

      {/* Include the SearchBar component */}
      <SearchBar
        onSearch={handleSearch}
        categories={["Fruits", "Vegetables", "Meat", "Fish", "Dairy", "Beverages", "Grains", "Condiments", "Snacks"]}
        statuses={["In Stock", "Out of Stock"]}
      />

      {/* Include the TableContent component */}
      <TableContent
        headers={headers}
        data={data.map((item) => ({
          ...item,
          ACTIONS: (
            <>
              <Button variant="warning" size="sm" onClick={() => handleEdit(item)} className="me-2">
                <EditIcon /> {/* Edit Icon */}
              </Button>
              <Button variant="danger" size="sm" onClick={() => handleDelete(item)}>
                <DeleteIcon /> {/* Delete Icon */}
              </Button>
            </>
          )
        }))}
      />
    </div>
  );
};

export default Inventory;
