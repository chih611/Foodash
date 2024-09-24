import React, { useState } from "react";
import Link from "next/link";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Button,
  Offcanvas,
} from "react-bootstrap";
import Image from "next/image";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
const LandingNavBar = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleToggle = () => setShowOffcanvas(!showOffcanvas);

  return (
    <div
      className="navBar"
      style={{
        marginBottom: "48px",
      }}
    >
      <Navbar bg="white" expand="lg" className="border-bottom" fixed="top">
        <Container fluid className="px-md-5 py-md-4">
          {/* Mobile Layout */}
          <Row className="w-100 align-items-center d-lg-none">
            {/* Menu Button (2 columns) */}
            <Col xs={2} className="d-flex justify-content-start">
              <Button variant="outline-primary" onClick={handleToggle}>
                <MenuRoundedIcon />
              </Button>
            </Col>

            {/* Logo (6 columns) */}
            <Col xs={6} className="d-flex justify-content-center">
              <Link href="/" legacyBehavior passHref>
                <a>
                  <Image
                    src="/Foodash_logo.png"
                    alt="Logo"
                    width={150} // Adjust width as needed
                    height={50} // Adjust height as needed
                    className="navbar-brand"
                  />
                </a>
              </Link>
            </Col>

            {/* Cart and Login buttons (4 columns, aligned right) */}
            <Col
              xs={4}
              className="d-flex justify-content-end align-items-center"
            >
              {/* Cart Button */}
              <Link
                href="/CustomerView/ViewCart/ViewCart"
                legacyBehavior
                passHref
              >
                <a>
                  <div className="cart-button me-3">
                    <ShoppingCartOutlinedIcon sx={{ color: "#025373" }} />
                  </div>
                </a>
              </Link>

              {/* Login Button */}
              <Link
                href="/CustomerView/HomePage/HomePage"
                legacyBehavior
                passHref
              >
                <a>
                  <Button variant="primary" className="login-button">
                    Log In
                  </Button>
                </a>
              </Link>
            </Col>
          </Row>

          {/* Desktop Layout */}
          <Row className="w-100 align-items-center d-none d-lg-flex">
            <Col xs={12} md={3} className="d-flex align-items-center">
              {/* Logo Section */}
              <Link href="/" legacyBehavior passHref>
                <a>
                  <Image
                    src="/Foodash_logo.png"
                    alt="Logo"
                    width={200} // Adjust width as needed
                    height={50} // Adjust height as needed
                    className="navbar-brand"
                  />
                </a>
              </Link>
            </Col>

            <Col xs={12} md={6}>
              {/* Navigation Links */}
              <Nav className="w-100 justify-content-between">
                <Col className="d-flex justify-content-center">
                  <Link
                    href="/CustomerView/LandingPage/LandingPage"
                    legacyBehavior
                    passHref
                  >
                    <a className="nav-link">Menu</a>
                  </Link>
                </Col>
                <Col className="d-flex justify-content-center">
                  <Link
                    href="/CustomerView/LandingPage/LandingSpecial/LandingSpecial"
                    legacyBehavior
                    passHref
                  >
                    <a className="nav-link">Special</a>
                  </Link>
                </Col>
                <Col className="d-flex justify-content-center">
                  <Link
                    href="/CustomerView/LandingPage/LandingContact/LandingContact"
                    legacyBehavior
                    passHref
                  >
                    <a className="nav-link">Contact Us</a>
                  </Link>
                </Col>
                <Col className="d-flex justify-content-center">
                  <Link
                    href="/CustomerView/LandingPage/LandingGallery/LandingGallery"
                    legacyBehavior
                    passHref
                  >
                    <a className="nav-link">Gallery</a>
                  </Link>
                </Col>
                <Col className="d-flex justify-content-center">
                  <Link
                    href="/CustomerView/LandingPage/LandingAbout/LandingAbout"
                    legacyBehavior
                    passHref
                  >
                    <a className="nav-link">About Us</a>
                  </Link>
                </Col>
                <Col className="d-flex justify-content-center"></Col>
              </Nav>
            </Col>

            <Col
              xs={12}
              md={3}
              className="d-flex justify-content-end align-items-center"
            >
              {/* Cart and Login Buttons */}
              <Link
                href="/CustomerView/ViewCart/ViewCart"
                legacyBehavior
                passHref
              >
                <a>
                  <div className="cart-button me-2">
                    <ShoppingCartOutlinedIcon sx={{ color: "#025373" }} />
                  </div>
                </a>
              </Link>
              <Col
                xs={3}
                className="d-flex justify-content-end align-items-center"
              >
                <Link
                  href="/CustomerView/HomePage/HomePage"
                  legacyBehavior
                  passHref
                >
                  <a>
                    <Button variant="primary">Log In</Button>
                  </a>
                </Link>
              </Col>
            </Col>
          </Row>
        </Container>
      </Navbar>

      {/* Offcanvas Sidebar for Mobile Menu */}
      <Offcanvas show={showOffcanvas} onHide={handleToggle} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} href="/CustomerView/LandingPage/LandingPage">
              Menu
            </Nav.Link>
            <Nav.Link
              as={Link}
              href="/CustomerView/LandingPage/LandingSpecial/LandingSpecial"
            >
              Special
            </Nav.Link>
            <Nav.Link
              as={Link}
              href="/CustomerView/LandingPage/LandingContact/LandingContact"
            >
              Contact Us
            </Nav.Link>
            <Nav.Link
              as={Link}
              href="/CustomerView/LandingPage/LandingGallery/LandingGallery"
            >
              Gallery
            </Nav.Link>
            <Nav.Link
              as={Link}
              href="/CustomerView/LandingPage/LandingAbout/LandingAbout"
            >
              About Us
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default LandingNavBar;
