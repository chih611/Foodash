import React from "react";
import { Button, Row, Col } from "react-bootstrap"; // Bootstrap imports
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import CancelIcon from '@mui/icons-material/Cancel';

const Filters = () => {
  return (
    <Row className="filters-container align-items-center">
      {/* Categories with an icon */}
      <Col xs="auto">
        <Button variant="outline-primary" className="filter-btn d-flex align-items-center">
          <FilterAltIcon /> <span className="ml-2">Categories</span>
        </Button>
      </Col>

      {/* Name (A-Z) with an icon */}
      <Col xs="auto">
        <Button variant="outline-primary" className="filter-btn d-flex align-items-center">
          <SortIcon /> <span className="ml-2">Name (A-Z)</span>
        </Button>
      </Col>

      {/* Container for Platters, Seafoods, and Asian with an 'x' button */}
      <Col>
        <div className="filter-group d-flex align-items-center">
          <span className="filter-item d-flex align-items-center mr-3">Platters <CancelIcon className="ml-1" /></span>
          <span className="filter-item d-flex align-items-center mr-3">Seafoods <CancelIcon className="ml-1" /></span>
          <span className="filter-item d-flex align-items-center">Asian <CancelIcon className="ml-1" /></span>
        </div>
      </Col>
    </Row>
  );
};

export default Filters;
