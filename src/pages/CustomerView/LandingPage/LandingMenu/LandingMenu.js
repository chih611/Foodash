import React from "react";
import LandingNavBar from "../LandingNavBar/LandingNavBar";
import { Container, Row, Col, Button } from "react-bootstrap";

const LandingMenu = () => {
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
          <Col xs={12} md={9} className="text-left mb-4">
            <h1 className="display-4">
              Welcome to today's delicious catering menu
            </h1>
            <p className="lead">WWC freshest ingredients for your event</p>
            <Button variant="primary" className="mt-3">
              <i className="bi bi-basket-fill"></i> Order now
            </Button>
          </Col>
          {/* Image Placeholder Section */}
          <Col xs={12} md={3} className="d-flex justify-content-center">
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
        </Row>
      </Container>
    </div>
  );
};

export default LandingMenu;
