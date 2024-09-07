import React from "react";
import { Col, Row } from "react-bootstrap";
import HomeSideBar from "../HomeSideBar/HomeSideBar";
const HomeContent = () => {
  return (
    <div className="container">
      <Row>
        <Col xs={12} sm={6} md={5} lg={3}>
          <div classN ame="home-sidebar">
            <HomeSideBar />
          </div>
        </Col>
        <Col xs={12} sm={6} md={7} lg={9}>
          <div className="home-content">
            <h1>Home Content</h1>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HomeContent;
