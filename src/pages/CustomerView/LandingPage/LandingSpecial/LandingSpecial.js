import React from "react";
import LandingNavBar from "../LandingNavBar/LandingNavBar";
import { Container, Row, Col, Button } from "react-bootstrap";

const LandingSpecial = () => {
  return (
    <div className="landing-menu">
      <div
        className="navBar"
        style={{
          marginBottom: "48px",
        }}
      >
        <LandingNavBar />
      </div>
      <Container
        fluid
        className="px-3 px-md-5 py-5" // Adjusted padding for mobile and desktop
        style={{ marginTop: "24px" }}
      >
        <Row className="align-items-center">
          {/* Text and Button Section */}

          {/* Image Placeholder Section */}
          <Col xs={12} md={5} className="d-flex justify-content-center">
            <div
              style={{
                width: "100%",
                maxWidth: "342px",
                height: "342px",
                backgroundColor: "#e0e0e0",
                marginTop: "24px",
              }}
            >
              {/* Image Placeholder */}
            </div>
          </Col>

          <Col xs={12} md={7} className="text-left mb-4">
            <h1 className="display-4">Special of the day</h1>
            <h3 className="lead">Vietnamese Banh Mi</h3>
            <h2>$12.99</h2>
            <p className="lead">
              A Sandwich consists of one or more meats, accompanying vegetables,
              and condiments such as fresh cucumber slices, corianders, pickled
              carrot and daikon in shredded form
            </p>

            <Button variant="primary" className="mt-3">
              <i className="bi bi-basket-fill"></i> Order now
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingSpecial;
