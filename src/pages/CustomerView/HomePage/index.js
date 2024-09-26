import React from "react";
import HomeDirectionLink from "./HomeDirectionLink/HomeDirectionLink";
import HomeContent from "./HomeContent/HomeContent";
import { Container, Row, Col, Button } from "react-bootstrap";
import HomePageNavBar from "./HomePageNavBar";

const HomePage = () => {
  return (
    <div>
      <HomePageNavBar />
      <HomeDirectionLink />
      <HomeContent />
    </div>
  );
};

export default HomePage;
