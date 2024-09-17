import React from "react";
import { Dropdown } from "react-bootstrap";

const OrderFilter = () => {
  return (
    <div className="filters-section my-3">
      <div className="d-flex flex-wrap justify-content-start">
        {/* Time Filter */}
        <Dropdown className="filter-dropdown me-4 mb-2">
          <Dropdown.Toggle variant="outline-primary" className="filter-button">
            Time
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#action/3.1">This month</Dropdown.Item>
            <Dropdown.Item href="#action/3.2">This week</Dropdown.Item>
            <Dropdown.Item href="#action/3.3">Today</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* OrderID Filter */}
        <Dropdown className="filter-dropdown me-4 mb-2">
          <Dropdown.Toggle variant="outline-primary" className="filter-button">
            OrderID
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#action/3.1">#1111111</Dropdown.Item>
            <Dropdown.Item href="#action/3.2">#1245678</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* Amount Filter */}
        <Dropdown className="filter-dropdown me-4 mb-2">
          <Dropdown.Toggle variant="outline-primary" className="filter-button">
            Amount
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#action/3.1">Lowest</Dropdown.Item>
            <Dropdown.Item href="#action/3.2">Highest</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* Status Filter */}
        <Dropdown className="filter-dropdown me-4 mb-2">
          <Dropdown.Toggle variant="outline-primary" className="filter-button">
            Status
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#action/3.1">Delivering</Dropdown.Item>
            <Dropdown.Item href="#action/3.2">Preparing</Dropdown.Item>
            <Dropdown.Item href="#action/3.3">Completed</Dropdown.Item>
            <Dropdown.Item href="#action/3.4">Paid</Dropdown.Item>
            <Dropdown.Item href="#action/3.5">Unpaid</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default OrderFilter;