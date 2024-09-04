// components/LandingGallery.js
import React from "react";
import LandingNavBar from "../LandingNavBar/LandingNavBar";
import { Container, Row, Col, Button } from "react-bootstrap";
const LandingGallery = () => {
  return (
    <div className="landing-gallery">
      <LandingNavBar />

      <section className="gallery-section py-5">
        <Container className="gallery-container">
          <h1 className="gallery-title text-center mb-4">Gallery</h1>
          <Row className="gy-4">
            <Col xs={12} md={6} lg={8}>
              <div className="gallery-box"></div>
            </Col>
            <Col xs={12} md={6} lg={2}>
              <div className="gallery-box"></div>
            </Col>
            <Col xs={12} md={6} lg={2}>
              <div className="gallery-box"></div>
            </Col>
            <Col xs={12} md={6} lg={2}>
              <div className="gallery-box"></div>
            </Col>
            <Col xs={12} md={6} lg={2}>
              <div className="gallery-box"></div>
            </Col>
            <Col xs={12} md={6} lg={8}>
              <div className="gallery-box"></div>
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

export default LandingGallery;
