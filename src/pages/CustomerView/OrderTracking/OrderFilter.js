import React from "react";
import { Row, Col } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";

const OrderFilter = () => {
  return (
    <div className="filters-section my-3">
      <div className="d-flex flex-wrap justify-content-start">
        <Row>
          <Col xs={3} md={3} className="mb-2">
            {/* Time Filter */}
            <Dropdown className="filter-dropdown me-4 mb-2">
              <Dropdown.Toggle
                variant="outline-primary"
                className="filter-button"
              >
                Time
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#action/3.1">This month</Dropdown.Item>
                <Dropdown.Item href="#action/3.2">This week</Dropdown.Item>
                <Dropdown.Item href="#action/3.3">Today</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col xs={2} md={2} className="mb-2">
            {/* OrderID Filter */}
            <Dropdown className="filter-dropdown me-4 mb-2">
              <Dropdown.Toggle
                variant="outline-primary"
                className="filter-button"
              >
                ID
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#action/3.1">#1111111</Dropdown.Item>
                <Dropdown.Item href="#action/3.2">#1245678</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          <Col xs={3} md={3} className="mb-2">
            {/* Amount Filter */}
            <Dropdown className="filter-dropdown me-4 mb-2">
              <Dropdown.Toggle
                variant="outline-primary"
                className="filter-button"
              >
                Amount
              </Dropdown.Toggle>
            </Dropdown>
          </Col>

          <Col xs={4} md={4} className="mb-2">
            {/* Status Filter */}
            <Dropdown className="filter-dropdown me-4 mb-2">
              <Dropdown.Toggle
                variant="outline-primary"
                className="filter-button"
              >
                Status
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#action/3.1">Delivering</Dropdown.Item>
                <Dropdown.Item href="#action/3.2">Preparing</Dropdown.Item>
                <Dropdown.Item href="#action/3.3">Completed</Dropdown.Item>
                <Dropdown.Item href="#action/3.4">Pending</Dropdown.Item>
                <Dropdown.Item href="#action/3.3">Quote</Dropdown.Item>
                <Dropdown.Item href="#action/3.4">Paid</Dropdown.Item>
                <Dropdown.Item href="#action/3.5">Unpaid</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OrderFilter;
