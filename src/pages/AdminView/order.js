import { useState } from "react";
import { Tab, Pagination } from "react-bootstrap"; // Import Pagination from react-bootstrap
import TableContent from "./_Components/table";

const Order = (props) => {
  const headers = ["ID", "NAME", "ADDRESS", "PHONE_NUMBER", "ORDER_DETAILS", "STATUS"];
  const tableData = [
    { ID: 1, NAME: 'John Doe', ADDRESS: '123 Main St', PHONE_NUMBER: '1234567890', ORDER_DETAILS: '2 x T-Shirts, 1 x Jeans', STATUS: 'COMPLETED' },
    { ID: 2, NAME: 'Jane Smith', ADDRESS: '456 Elm St', PHONE_NUMBER: '9876543210', ORDER_DETAILS: '1 x Laptop', STATUS: 'IN PROGRESS' },
    { ID: 3, NAME: 'Alice Johnson', ADDRESS: '789 Maple Ave', PHONE_NUMBER: '5551234567', ORDER_DETAILS: '3 x Books', STATUS: 'COMPLETED' },
    { ID: 4, NAME: 'Bob Brown', ADDRESS: '321 Oak St', PHONE_NUMBER: '4449876543', ORDER_DETAILS: '1 x Phone, 1 x Charger', STATUS: 'IN PROGRESS' },
    { ID: 5, NAME: 'Charlie Wilson', ADDRESS: '652 Pine St', PHONE_NUMBER: '3216549870', ORDER_DETAILS: '5 x Notebooks', STATUS: 'COMPLETED' },
    { ID: 6, NAME: 'Diana Ross', ADDRESS: '78 Birch Ave', PHONE_NUMBER: '6549873210', ORDER_DETAILS: '2 x Headphones', STATUS: 'IN PROGRESS' },
    { ID: 7, NAME: 'Eve Turner', ADDRESS: '91 Cedar St', PHONE_NUMBER: '7896541230', ORDER_DETAILS: '1 x Coffee Machine', STATUS: 'COMPLETED' },
    { ID: 8, NAME: 'Frank Howard', ADDRESS: '22 Walnut Blvd', PHONE_NUMBER: '2134567890', ORDER_DETAILS: '4 x Mugs, 2 x Plates', STATUS: 'IN PROGRESS' },
    { ID: 9, NAME: 'Grace Lee', ADDRESS: '15 Spruce Dr', PHONE_NUMBER: '9873216540', ORDER_DETAILS: '3 x Shoes', STATUS: 'COMPLETED' },
    { ID: 10, NAME: 'Hank Green', ADDRESS: '458 Aspen Ct', PHONE_NUMBER: '6543219870', ORDER_DETAILS: '2 x Jackets, 3 x Hats', STATUS: 'IN PROGRESS' },
    { ID: 11, NAME: 'Isabel Young', ADDRESS: '92 Willow Rd', PHONE_NUMBER: '3124567890', ORDER_DETAILS: '1 x Tablet', STATUS: 'COMPLETED' },
    { ID: 12, NAME: 'Jack White', ADDRESS: '37 Elmwood Ln', PHONE_NUMBER: '5649873210', ORDER_DETAILS: '1 x Gaming Console', STATUS: 'IN PROGRESS' },
    { ID: 13, NAME: 'Karen Black', ADDRESS: '18 Sycamore St', PHONE_NUMBER: '7893216540', ORDER_DETAILS: '3 x Dresses', STATUS: 'COMPLETED' },
    { ID: 14, NAME: 'Leon Brown', ADDRESS: '64 Pineview Dr', PHONE_NUMBER: '9876543210', ORDER_DETAILS: '5 x Bottles of Water', STATUS: 'IN PROGRESS' },
    { ID: 15, NAME: 'Mona Wilson', ADDRESS: '25 Highland Ave', PHONE_NUMBER: '1236549870', ORDER_DETAILS: '2 x Laptops, 1 x Mouse', STATUS: 'COMPLETED' },
    { ID: 16, NAME: 'Nathan King', ADDRESS: '78 Forest Way', PHONE_NUMBER: '4567891230', ORDER_DETAILS: '4 x Pillows', STATUS: 'IN PROGRESS' },
    { ID: 17, NAME: 'Olivia Scott', ADDRESS: '42 River Rd', PHONE_NUMBER: '3219876540', ORDER_DETAILS: '2 x Curtains, 1 x Rug', STATUS: 'COMPLETED' },
    { ID: 18, NAME: 'Paul Walker', ADDRESS: '59 Oakridge Dr', PHONE_NUMBER: '7891234560', ORDER_DETAILS: '1 x Desk Lamp', STATUS: 'IN PROGRESS' },
    { ID: 19, NAME: 'Quincy Adams', ADDRESS: '88 Maple St', PHONE_NUMBER: '6547893210', ORDER_DETAILS: '2 x Office Chairs', STATUS: 'COMPLETED' },
    { ID: 20, NAME: 'Rachel Green', ADDRESS: '102 Pine Hill Ln', PHONE_NUMBER: '9871236540', ORDER_DETAILS: '1 x Smart TV', STATUS: 'IN PROGRESS' }
  ];

  const [currentPage, setCurrentPage] = useState(1); // State to track the current page
  const rowsPerPage = 12; // Number of rows to display per page

  // Calculate total number of pages
  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  // Calculate the data to display for the current page
  const paginatedData = tableData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Render pagination items
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
        <div className="border me-5 ">
            {/* Pass headers and paginated data to TableContent */}
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

export default Order;
