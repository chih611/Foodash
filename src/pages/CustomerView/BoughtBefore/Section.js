import React from 'react';
import Item from './Item';
import { Row, Col } from "react-bootstrap";
;

const Section = ({ title }) => {
  return (
    <section className="deals-section">
      <h2 className="section-title">{title}</h2>
      <Row>
        <Col md={4}>
          <Item />
        </Col>
        <Col md={4}>
          <Item />
        </Col>
        <Col md={4}>
          <Item />
        </Col>
      </Row>
    </section>
  );
};

export default Section;