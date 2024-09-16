import React from "react";
import { Row, Col } from "react-bootstrap"; // Import Bootstrap components

const Advertisement = () => {
  return (
    <div className="advertisement-container">
      {/* Scrollable Advertisement Row */}
      <div className="advertisement-scroller">
        <Row noGutters className="d-flex flex-nowrap">
          <Col xs={4} className="advertisement-item">
            <div className="placeholder">Ad 1</div>
          </Col>
          <Col xs={4} className="advertisement-item">
            <div className="placeholder">Ad 2</div>
          </Col>
          <Col xs={4} className="advertisement-item">
            <div className="placeholder">Ad 3</div>
          </Col>
          <Col xs={4} className="advertisement-item">
            <div className="placeholder">Ad 4</div>
          </Col>
          <Col xs={4} className="advertisement-item">
            <div className="placeholder">Ad 5</div>
          </Col>
          <Col xs={4} className="advertisement-item">
            <div className="placeholder">Ad 6</div>
          </Col>
          <Col xs={4} className="advertisement-item">
            <div className="placeholder">Ad 7</div>
          </Col>
          <Col xs={4} className="advertisement-item">
            <div className="placeholder">Ad 8</div>
          </Col>
          <Col xs={4} className="advertisement-item">
            <div className="placeholder">Ad 9</div>
          </Col>
          <Col xs={4} className="advertisement-item">
            <div className="placeholder">Ad 10</div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Advertisement;
