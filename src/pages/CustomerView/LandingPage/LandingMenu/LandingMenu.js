import React from "react";
import LandingNavBar from "../LandingNavBar/LandingNavBar";
import { Container, Row, Col, Button } from "react-bootstrap";

const LandingMenu = () => {
  return (
    <div className="landing-menu">
      <LandingNavBar />
      <Container
        fluid
        className="px-3 px-md-5 py-4" // Responsive padding for mobile and desktop
      >
        <Row className="justify-content-between">
          {/* Text Section */}
          <Col
            xs={12}
            md={8}
            style={{ paddingLeft: "8px", paddingRight: "8px" }}
          >
            <h1 className="display-4">
              Welcome to today's delicious catering menu
            </h1>
            <p className="lead">WWC freshest ingredients for your event</p>
            <Button variant="primary" className="mt-3">
              <i className="bi bi-basket-fill"></i> Order now
            </Button>
          </Col>

          {/* Image Placeholder */}
          <Col xs={12} md={4} className="d-flex justify-content-center">
            <div
              style={{
                width: "342px",
                height: "342px",
                backgroundColor: "#e0e0e0",
              }}
            >
              {/* Image placeholder or replace with actual Image component */}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingMenu;
