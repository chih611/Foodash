import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Filters from './Filters';
import Section from './Section';
import Advertisement from "./Advertisement";
// import './special.scss';


function Special() {
  return (
    <Container className="special-container">
      <main>
        <h1 className="title">Special Deals</h1>
        <Advertisement />
        {/* Filters Section */}
        <Filters />
        {/* Repeat the section for different categories */}
        <Section className="title" title="Deli and Fresh Meats" />
        <Section className="title" title="Party Platters" />
        <Section className="title" title="Flowers and Extras" />
      </main>
    </Container>
  );
}

export default Special;

