import React from "react";
import Link from "next/link";
import { Container, Row, Col, Navbar, Nav, Button } from "react-bootstrap";
import Image from "next/image";

const LandingNavBar = () => {
  return (
    <Navbar bg="white" expand="lg" className="border-bottom">
      <Container>
        <Row className="w-100">
          <Col xs={12} md={3} className="d-flex align-items-center">
            {/* Logo Section */}
            <Link href="/" passHref>
              <Image
                src="/logo.png"
                alt="Logo"
                width={120}
                height={50}
                className="navbar-brand"
              />
            </Link>
          </Col>

          <Col xs={12} md={6} className="d-flex justify-content-center">
            {/* Navigation Links */}
            <Nav className="me-auto">
              <Link href="/CustomerView/LandingPage/LandingMenu" passHref>
                <div className="nav-link">Menu</div>
              </Link>
              <Link href="/CustomerView/LandingPage/LandingSpecial" passHref>
                <div className="nav-link">Special</div>
              </Link>
              <Link href="/CustomerView/LandingPage/LandingContact" passHref>
                <div className="nav-link">Contact Us</div>
              </Link>
              <Link href="/CustomerView/LandingPage/LandingGallery" passHref>
                <div className="nav-link">Gallery</div>
              </Link>
              <Link href="/CustomerView/LandingPage/LandingAbout" passHref>
                <div className="nav-link">About Us</div>
              </Link>
            </Nav>
          </Col>

          <Col
            xs={12}
            md={3}
            className="d-flex justify-content-end align-items-center"
          >
            {/* Cart and Login Buttons */}
            <Link href="/CustomerView/ViewCart" passHref>
              <div>
                <Button variant="outline-primary" className="me-2">
                  <i className="bi bi-cart"></i>
                </Button>
              </div>
            </Link>
            <Link href="/CustomerView/SignIn" passHref>
              <div>
                <Button variant="primary">Log In</Button>
              </div>
            </Link>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default LandingNavBar;
