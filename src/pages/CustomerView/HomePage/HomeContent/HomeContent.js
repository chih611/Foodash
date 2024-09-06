import React from "react";
import { Col, Row } from "react-bootstrap";
import HomeSideBar from "../HomeSideBar/HomeSideBar";
const HomeContent = () => {
  return (
    <div className="container">
      <Row>
        <Col md={3} lg={3}>
          <div className="home-sidebar">
            <HomeSideBar />
          </div>
        </Col>
        <Col md={9} lg={9}>
          <div className="home-content">
            <h1>Home Content</h1>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HomeContent;
