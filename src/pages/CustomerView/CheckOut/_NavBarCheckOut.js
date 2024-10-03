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
import HomeDirectionLink from "../HomePage/HomeDirectionLink/HomeDirectionLink";
import SearchBar from "../HomePage/searchBar";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import PermIdentityOutlined from "@mui/icons-material/PermIdentityOutlined";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";


const NavBarCheckOut = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleToggle = () => setShowOffcanvas(!showOffcanvas);

  return (
    <div
      className="navBar"
      style={{
        marginBottom: "150px",
      }}
    >
      <Navbar bg="white" expand="lg" className="border-bottom" fixed="top">
        <Container fluid className="px-md-5 py-md-4">
          {/* Mobile Layout */}

          
          <Row className="w-100 align-items-center d-lg-none">
            {/* Return Button, Edit After */}
            <Col xs={1} className="d-flex justify-content-start">
              <Link href="/CustomerView/ViewCart" legacyBehavior passHref>
                <a>
                  <div className="me-2">
                    <ArrowBackRounded sx={{ color: "#90B4CE" }} />
                  </div>
                </a>
              </Link>    
            </Col>

            {/* Logo (6 columns) */}
            <Col xs={6} className="d-flex justify-content-center">
              <Image
                    src="/Foodash_logo.png"
                    alt="Logo"
                    width={150} // Adjust width as needed
                    height={50} // Adjust height as needed
                    className="navbar-brand"
                  />
            </Col>

            <Col xs={1}></Col>
            
            {/* Account button */}
            <Col xs={4} className="d-flex justify-content-end align-items-center">
            <Link
                href="/CustomerView/CustomerProfile/CustomerProfile"
                legacyBehavior
                passHref>
              
                <a>
                  <div className="account-button me-2">
                    <PermIdentityOutlined sx={{ color: "#025373" }} />
                  </div>
                </a>
              </Link>              
            </Col>
          </Row>

          

          {/* Desktop Layout */}
          
          <Row className="w-100 d-none d-lg-flex">

            <Col xs ={12} md = {1} className="d-flex align-items-center">
              <Link href="/CustomerView/HomePage" legacyBehavior passHref>
                <a className="me-2">
                    <ArrowBackRounded sx={{ color: "#90B4CE" }} />
                </a>
              </Link> 
            </Col>
           
            <Col xs={12} md={3} className="d-flex align-items-begin">
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

            <Col xs={12} md={5} className="d-flex align-items-center">
              {/* Flex container for icon and search bar */}
                {/* Search bar section */}
                <SearchBar />
            </Col>

            <Col xs={12} md={3}
              className="d-flex justify-content-end align-items-center">
            
              {/* Account Button */}
              <Link
                href="/CustomerView/ViewCart/ViewCart"
                legacyBehavior
                passHref>
                <a className="cart-button me-2">
                    <PermIdentityOutlined sx={{ color: "#025373" }} />
                </a>
              </Link>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBarCheckOut;
