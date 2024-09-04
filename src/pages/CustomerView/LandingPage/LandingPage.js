import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import LandingNavBar from "./LandingNavBar/LandingNavBar";
import LandingMenu from "./LandingMenu/LandingMenu";

const LandingPage = () => {
  return (
    <div className="landing-menu">
      <LandingNavBar />
      <LandingMenu />
    </div>
  );
};

export default LandingPage;
