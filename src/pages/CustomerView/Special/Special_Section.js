import React, { useRef } from "react";
import { Row, Col } from "react-bootstrap";
import HomeItemContainer from "../HomePage/HomeItemContainer/HomeItemContainer";

const SpecialSection = ({ title, items }) => {
  const itemsContainerRef = useRef(null);

  const scrollLeft = () => {
    itemsContainerRef.current.scrollBy({ left: -500, behavior: "smooth" });
  };

  const scrollRight = () => {
    itemsContainerRef.current.scrollBy({ left: 500, behavior: "smooth" });
  };

  return (
    <section className="deals-section">
      <div className="section-content">
        <Row>
          <Col xs={1} className="d-flex align-items-stretch">
            <h2 className="rotated-title">{title}</h2>
          </Col>
          <Col xs={11} className="position-relative">
            <div className="items-wrapper">
              <button className="arrow-button arrow-left" onClick={scrollLeft}>
                {"<"}
              </button>
              <div className="items-container" ref={itemsContainerRef}>
                <Row noGutters className="d-flex flex-nowrap">
                  {items &&
                    items.map((item, index) => (
                      <HomeItemContainer key={index} item={item} />
                    ))}
                </Row>
              </div>
              <button
                className="arrow-button arrow-right"
                onClick={scrollRight}
              >
                {">"}
              </button>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default SpecialSection;
