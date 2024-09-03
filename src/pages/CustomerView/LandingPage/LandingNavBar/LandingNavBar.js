import React from "react";
import Link from "next/link";
import { Container, Row, Col, Navbar, Nav, Button } from "react-bootstrap";
import Image from "next/image";

const LandingNavBar = () => {
  return (
    <Navbar bg="white" expand="lg" className="border-bottom">
      <Container
        fluid
        style={{
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
        className="px-md-5 py-md-4"
      >
        <Row className="w-100">
          <Col xs={12} md={3} className="d-flex align-items-center">
            {/* Logo Section */}
            <Link href="/" legacyBehavior passHref>
              <a>
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={120}
                  height={50}
                  className="navbar-brand"
                />
              </a>
            </Link>
          </Col>

          <Col xs={12} md={6} className="d-flex justify-content-center">
            {/* Navigation Links */}
            <Nav className="me-auto">
              <Link
                href="/CustomerView/LandingPage/LandingMenu/LandingMenu"
                legacyBehavior
                passHref
              >
                <a className="nav-link">Menu</a>
              </Link>
              <Link
                href="/CustomerView/LandingPage/LandingSpecial/LandingSpecial"
                legacyBehavior
                passHref
              >
                <a className="nav-link">Special</a>
              </Link>
              <Link
                href="/CustomerView/LandingPage/LandingContact/LandingContact"
                legacyBehavior
                passHref
              >
                <a className="nav-link">Contact Us</a>
              </Link>
              <Link
                href="/CustomerView/LandingPage/LandingGallery/LandingGallery"
                legacyBehavior
                passHref
              >
                <a className="nav-link">Gallery</a>
              </Link>
              <Link
                href="/CustomerView/LandingPage/LandingAbout/LandingAbout"
                legacyBehavior
                passHref
              >
                <a className="nav-link">About Us</a>
              </Link>
            </Nav>
          </Col>

          <Col
            xs={12}
            md={3}
            className="d-flex justify-content-end align-items-center"
          >
            {/* Cart and Login Buttons */}
            <Link href="/CustomerView/ViewCart" legacyBehavior passHref>
              <a>
                <Button variant="outline-primary" className="me-2">
                  <i className="bi bi-cart"></i>
                </Button>
              </a>
            </Link>
            <Link href="/CustomerView/SignIn" legacyBehavior passHref>
              <a>
                <Button variant="primary">Log In</Button>
              </a>
            </Link>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default LandingNavBar;
