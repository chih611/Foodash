import React from "react";
import { Row, Col } from "react-bootstrap";
import HomeItemContainer from "../HomePage/HomeItemContainer/HomeItemContainer";

const SpecialSection = ({ title, items }) => {
  return (
    <section className="deals-section">
      <div className="section-content">
        <div className="items-container">
          <Row>
            <Col xs={1} className="d-flex align-items-stretch">
              <h2 className=" rotated-title">{title}</h2>
            </Col>
            <Col xs={11}>
              <Row>
                {items &&
                  items.map((item, index) => (
                    <HomeItemContainer key={index} item={item} />
                  ))}
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};

export default SpecialSection;
