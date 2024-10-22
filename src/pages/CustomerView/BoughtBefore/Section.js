import React from "react";
import { Row } from "react-bootstrap";
import HomeItemContainer from "../HomePage/HomeItemContainer/HomeItemContainer";

const Section = ({ title, items }) => {
  return (
    <section className="deals-section">
      <h2 className="section-title">{title}</h2>
      <Row>
        {items &&
          items.map((item, index) => (
            <HomeItemContainer key={index} item={item} />
          ))}
      </Row>
    </section>
  );
};

export default Section;
