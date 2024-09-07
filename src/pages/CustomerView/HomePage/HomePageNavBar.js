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

const HomePageNavBar = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleToggle = () => setShowOffcanvas(!showOffcanvas);

  return (
    <div
      className="navBar"
      style={{
        marginBottom: "50px",
      }}
    >
      <Navbar bg = "white" expand="lg" className="border-bottom" fixed="top">
        <Container fluid className="px-md-5 py-md-4">
          {/* Mobile Layout */}
          <Row className="w-100 align-items-center d-lg-none">          

            {/* Logo (3 columns) */}
            <Col xs={3} className="d-flex justify-content-center">
              <Link href="/" legacyBehavior passHref>
                <a>
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width={199} // Adjust width as needed
                    height={62} // Adjust height as needed
                    className="navbar-brand"
                  />
                </a>
              </Link>
            </Col>

            {/* Spacer (2 columns) */}
            <Col xs={1}></Col>

            {/* Cart button, Show amount and Account button (4 columns total, aligned right) */}
            <Col
              xs={4}
              className="d-flex justify-content-end align-items-center"
            >
              {/* Account Profile button */}
              <Link href="/CustomerView/CustomerProfile/CustomerProfile" legacyBehavior passHref>
                <a>
                    <Button variant="primary">Account</Button>
                </a>
              </Link>

              {/* Show ammount number */}
              <h3>Amount: $125.24</h3>

              {/* View Cart button */}
              <Link href="/CustomerView/ViewCart/ViewCart" legacyBehavior passHref>
                <a>
                  <Button variant="outline-primary" className="me-2">
                    <i className="view cart"></i>
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
                    src="/logo.png"
                    alt="Logo"
                    width={199}
                    height={62}
                    className="navbar-brand"
                  />
                </a>
              </Link>
            </Col>

            <Col xs={12} md={6}>
              {/* Search Funtion */}
                
            </Col>

            <Col
              xs={12}
              md={3}
              className="d-flex justify-content-end align-items-center"
            >
              {/* ADD Account Profile, View Amount and Cart button */}
              <Link href="/CustomerView/CustomerProfile/CustomerProfile" legacyBehavior passHref>
                <a>
                    <Button variant="primary">Account</Button>
                </a>
              </Link>

              <h3>Amount: $125.24</h3>

              <Link href="/CustomerView/ViewCart/ViewCart" legacyBehavior passHref>
                <a>
                  <Button variant="outline-primary" className="me-2">
                    <i className="view cart"></i>
                  </Button>
                </a>
              </Link>   
            </Col>
          </Row>

          <Row className="w-100 align-items-center d-none d-lg-flex">
            <Col xs={12} md={3} className="d-flex align-items-center">

            <p>Add search funtion heare</p>
            
            </Col>
            
          </Row>
        </Container>
      </Navbar>

    </div>
  );
};

export default HomePageNavBar;
