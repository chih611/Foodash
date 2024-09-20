import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Section from './Section';


function BoughtBefore() {
  return (
    <Container className="bought-before-container color-head-line">
      <main>
        <h1 className="title">Bought Before</h1>
        {/* Repeat the section for different categories */}
        <Section className="title" title="Deli and Fresh Meats" />
        <Section className="title" title="Party Platters" />
        <Section className="title" title="Flowers and Extras" />
      </main>
    </Container>
  );
}

export default BoughtBefore;
