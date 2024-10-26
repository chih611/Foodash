import React from "react";
import LandingNavBar from "../LandingNavBar/LandingNavBar";
import { Container, Row, Col, Button } from "react-bootstrap";

const LandingAbout = () => {
  return (
    <div className="landing-about">
      <LandingNavBar />

      <section className="about-section py-5">
        <Container className="about-container">
          <h1 className="about-title text-center mb-4">About Us</h1>
          <Row className="gy-4">
            <Col xs={12} md={6} lg={3}>
              <div className="about-box"></div>
            </Col>
            <Col xs={12} md={6} lg={6}></Col>
            <Col xs={12} md={6} lg={3}>
              <div className="about-box"></div>
            </Col>
          </Row>
          <div className="text-center mt-4">
            <Button variant="primary" className="see-more-button">
              See more
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default LandingAbout;
