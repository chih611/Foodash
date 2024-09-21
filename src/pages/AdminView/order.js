import { Tab } from "react-bootstrap";
import { useState } from "react";
import TableContent from "./_Components/table";

const Order = (props) => {
  // Define headers and data for the table
  const headers = ["ID", "NAME", "ADDRESS", "PHONE_NUMBER", "ORDER_DETAILS", "STATUS"];
  const tableData = [
    { ID: 1, NAME: 'John Doe', ADDRESS: '123 Main St', PHONE_NUMBER: '1234567890', ORDER_DETAILS: '2 x T-Shirts, 1 x Jeans', STATUS: 'COMPLETED' },
    { ID: 2, NAME: 'Jane Smith', ADDRESS: '456 Elm St', PHONE_NUMBER: '9876543210', ORDER_DETAILS: '1 x Laptop', STATUS: 'IN PROGRESS' },
    { ID: 3, NAME: 'Alice Johnson', ADDRESS: '789 Maple Ave', PHONE_NUMBER: '5551234567', ORDER_DETAILS: '3 x Books', STATUS: 'COMPLETED' },
    { ID: 4, NAME: 'Bob Brown', ADDRESS: '321 Oak St', PHONE_NUMBER: '4449876543', ORDER_DETAILS: '1 x Phone, 1 x Charger', STATUS: 'IN PROGRESS' }
  ];

  return (
    <>
      <Tab.Pane {...props}>
        {/* Pass headers and data to TableContent */}
        <TableContent headers={headers} data={tableData} />
      </Tab.Pane>
    </>
  );
};

export default Order;
