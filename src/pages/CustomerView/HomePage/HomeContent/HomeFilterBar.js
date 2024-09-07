import React from "react";
import { ButtonGroup, Dropdown, Button } from "react-bootstrap";

const HomeFilterBar = () => {
  return (
    <div className="filters-section my-3">
      <ButtonGroup>
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle variant="outline-primary">
            Categories
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#action/3.1">All</Dropdown.Item>
            <Dropdown.Item href="#action/3.2">Platters</Dropdown.Item>
            <Dropdown.Item href="#action/3.3">Ham</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle variant="outline-primary">
            Price Range
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#action/3.1">Low to High</Dropdown.Item>
            <Dropdown.Item href="#action/3.2">High to Low</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle variant="outline-primary">
            Name (A-Z)
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#action/3.1">A-Z</Dropdown.Item>
            <Dropdown.Item href="#action/3.2">Z-A</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Button variant="outline-primary">Platters</Button>
        <Button variant="outline-primary">Ham</Button>
      </ButtonGroup>
    </div>
  );
};

export default HomeFilterBar;
