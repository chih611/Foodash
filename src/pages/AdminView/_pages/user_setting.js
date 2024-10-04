import { useState } from "react";
import { Tab, Pagination } from "react-bootstrap";
import TableContent from "../_components/custom_table";
import SearchBar from "../_components/searchbar";
import initialData from "../_data"; // Import the data from data.js

const UserSetting = (props) => {
  const headers = [
    "ID",
    "NAME",
    "ADDRESS",
    "PHONE_NUMBER",
    "UserSetting_DETAILS",
    "STATUS",
  ];

  const [tableData, setTableData] = useState(initialData); // Use imported data
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 11;

  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  const paginatedData = tableData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSearch = (searchTerm, category, status) => {
    const filteredData = initialData.filter((item) => {
      const matchesSearch = item.NAME.toLowerCase().includes(
        searchTerm.toLowerCase()
      );
      const matchesCategory = category
        ? item.UserSetting_DETAILS.toLowerCase().includes(
            category.toLowerCase()
          )
        : true;
      const matchesStatus = status ? item.STATUS === status : true;
      return matchesSearch && matchesCategory && matchesStatus;
    });
    setTableData(filteredData);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationItems = () => {
    let items = [];
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <>
      <Tab.Pane {...props}>
        <div
          className="bUserSetting mb-2 p-1 me-5 rounded-4 d-flex justify-content-end align-items-center"
          style={{
            backgroundColor: "#EBF5FD",
            minHeight: "auto",
            padding: "0.5rem",
          }} // Adjust padding as needed
        >
          <SearchBar
            onSearch={handleSearch}
            categories={["T-Shirts", "Laptop", "Books", "Phone", "Notebooks"]}
            statuses={["COMPLETED", "IN PROGRESS"]}
          />
        </div>

        <div
          className="bUserSetting p-2 pt-2 me-5 rounded-4"
          style={{ backgroundColor: "#EBF5FD" }}
        >
          <TableContent headers={headers} data={paginatedData} />
          <Pagination className="justify-content-center mt-3">
            <Pagination.First
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {renderPaginationItems()}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      </Tab.Pane>
    </>
  );
};

export default UserSetting;
