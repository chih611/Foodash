import React, { useState } from "react";
import { Dropdown, Row, Col } from "react-bootstrap";

const OrderFilter_desktop = ({ onSortByDate, onFilterByStatus }) => {
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleSortByDate = (order) => {
    if (order === "asc" || order === "desc") {
      onSortByDate(order); // Trigger the parent handler to sort orders
    }
  };

  const handleFilterByStatus = (status) => {
    setSelectedStatus(status);
    onFilterByStatus(status); // Trigger the parent handler to filter orders
  };

  return (
    <div className="filters-section my-3">
      <Row
        className="w-100 align-items-center d-none d-lg-flex"
        style={{ marginTop: "24px" }}
      >
        {/* Sort by Delivery Date */}
        <Col xs={12} md={3} className="mb-2">
          <Dropdown className="filter-dropdown w-100">
            <Dropdown.Toggle
              variant="outline-primary"
              className="filter-button w-100"
            >
              Delivery Time
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleSortByDate("asc")}>
                Ascending
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortByDate("desc")}>
                Descending
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        {/* OrderID Filter (For demonstration purposes, this can be customized further) */}
        <Col xs={12} md={2} className="mb-2">
          <Dropdown className="filter-dropdown w-100">
            <Dropdown.Toggle
              variant="outline-primary"
              className="filter-button w-100"
            >
              OrderID
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#action/3.1">#1111111</Dropdown.Item>
              <Dropdown.Item href="#action/3.2">#1245678</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        {/* Amount Filter */}
        <Col xs={12} md={3} className="mb-2">
          <Dropdown className="filter-dropdown w-100">
            <Dropdown.Toggle
              variant="outline-primary"
              className="filter-button w-100"
            >
              Amount
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#action/3.1">Lowest</Dropdown.Item>
              <Dropdown.Item href="#action/3.2">Highest</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        {/* Filter by Status */}
        <Col xs={12} md={4} className="mb-2">
          <Dropdown className="filter-dropdown w-100">
            <Dropdown.Toggle
              variant="outline-primary"
              className="filter-button w-100"
            >
              Status: {selectedStatus || "All"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleFilterByStatus("")}>
                All
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterByStatus("Delivering")}>
                Delivering
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterByStatus("Preparing")}>
                Preparing
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterByStatus("Completed")}>
                Completed
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterByStatus("Paid")}>
                Paid
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterByStatus("Pending")}>
                Pending
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterByStatus("Quote")}>
                Quote
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterByStatus("Unpaid")}>
                Unpaid
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </div>
  );
};

export default OrderFilter_desktop;
