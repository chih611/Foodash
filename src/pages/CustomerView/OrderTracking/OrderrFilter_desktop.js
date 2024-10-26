import React from "react";
import { Dropdown, Row, Col } from "react-bootstrap";

const OrderFilter_desktop = () => {
  return (
    <div className="filters-section my-3">
      <Row
        className="w-100 align-items-center d-none d-lg-flex"
        style={{ marginTop: "24px" }}
      >
        {/* Time Filter */}
        <Col xs={12} md={3} className="mb-2">
          <Dropdown className="filter-dropdown w-100">
            <Dropdown.Toggle
              variant="outline-primary"
              className="filter-button w-100"
            >
              Delivery Time
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#action/3.1">This month</Dropdown.Item>
              <Dropdown.Item href="#action/3.2">This week</Dropdown.Item>
              <Dropdown.Item href="#action/3.3">Today</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        {/* OrderID Filter */}
        <Col xs={12} md={3} className="mb-2">
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

        {/* Status Filter */}
        <Col xs={12} md={3} className="mb-2">
          <Dropdown className="filter-dropdown w-100">
            <Dropdown.Toggle
              variant="outline-primary"
              className="filter-button w-100"
            >
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
        </Col>
      </Row>
    </div>
  );
};

export default OrderFilter_desktop;
