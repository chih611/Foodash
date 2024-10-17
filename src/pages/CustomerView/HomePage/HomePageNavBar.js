import React, { useState } from "react";
import Link from "next/link";
import { Container, Row, Col, Navbar, Button } from "react-bootstrap";
import Image from "next/image";
import PermIdentityOutlined from "@mui/icons-material/PermIdentityOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useSelector } from "react-redux";
import { getCartTotal } from "../../../../store/slices/cartSlice";
import SearchBar from "./searchBar";

// NavBar component
const HomePageNavBar = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const handleToggle = () => setShowOffcanvas(!showOffcanvas);
  const customerProfile = useSelector((state) => state.customer.profile);
  const cartTotal = useSelector(getCartTotal);
  return (
    <div
      className="navBar"
      style={{
        marginBottom: "150px",
        backgroundImage: "url(/man-is-standing-by-grill-cooking-food-pan.jpg",
        backgroundSize: "cover", // Ensure the image covers the entire div
        backgroundPosition: "center", // Center the image
        backgroundRepeat: "no-repeat",
      }}
    >
      <Navbar
        bg="white"
        expand="lg"
        className="border-bottom navBar-body"
        fixed="top"
      >
        <Container fluid className="  navBar-body  px-md-5 py-md-4">
          {/* Mobile Layout */}
          <Row className="w-100 align-items-center d-lg-none">
            {/* Logo (3 columns) */}
            <Col xs={4} className="d-flex justify-content-center">
              <Link href="/CustomerView/HomePage" legacyBehavior passHref>
                <a>
                  <Image
                    src="/WCC_LOGO.png"
                    alt="Logo"
                    width={150} // Adjust width as needed
                    height={62} // Adjust height as needed
                    className="navbar-brand"
                  />
                </a>
              </Link>
            </Col>
            <Col xs={3}></Col>

            {/* Account button */}
            <Col
              xs={1}
              className="d-flex justify-content-end align-items-center"
            >
              <Link
                href="/CustomerView/CustomerProfile/"
                legacyBehavior
                passHref
              >
                <a className="d-flex align-items-center text-decoration-none">
                  <div className="account-button me-2">
                    <PermIdentityOutlined sx={{ color: "#fffffe" }} />
                  </div>
                  <div>
                    <p className="subtitle--navBar mb-0">
                      Hi, {customerProfile ? customerProfile.LAST_NAME : "User"}
                    </p>
                  </div>
                </a>
              </Link>
            </Col>

            {/* Cart amount */}
            <Col xs={2} className="d-flex flex-row-reverse bd-highlight">
              <div className="text-end">
                <p className="subtitle--navBar mb-0">Amount:</p>
                <p className="subtitle--navBar mb-0">${cartTotal.toFixed(2)}</p>
              </div>
            </Col>

            {/* Cart button */}
            <Col xs={2} className="d-flex flex-column align-items-end">
              <Link href="/CustomerView/ViewCart/" legacyBehavior passHref>
                <a>
                  <div className="cart-button me-2">
                    <ShoppingCartOutlinedIcon sx={{ color: "#fffffe" }} />
                  </div>
                </a>
              </Link>
            </Col>
          </Row>

          {/* Mobile Search Bar */}
          <Row className="w-100 align-items-center d-lg-none">
            <Col xs={12} className="w-100 d-flex justify-content-center">
              <div>
                <SearchBar />
              </div>
            </Col>
          </Row>

          {/* Desktop Layout */}
          <Row className="w-100 align-items-center d-none d-lg-flex">
            <Col xs={12} md={3} className="d-flex align-items-center">
              {/* Logo Section */}
              <Link href="/CustomerView/HomePage" legacyBehavior passHref>
                <a>
                  <Image
                    src="/WCC_LOGO.png"
                    alt="Logo"
                    width={199}
                    height={62}
                    className="navbar-brand"
                  />
                </a>
              </Link>
            </Col>

            <Col xs={12} md={5}>
              {/* Flex container for icon and search bar */}
              <div className="d-flex align-items-center">
                {/* Search bar section */}
                <div className="w-100 align-items-center d-none d-lg-flex">
                  <SearchBar />
                </div>
              </div>
            </Col>

            <Col xs={12} md={1}></Col>

            {/* Account Section */}
            <Col
              xs={12}
              md={1}
              className="d-flex flex-row-reverse bd-highlight"
            >
              <Link
                href="/CustomerView/CustomerProfile/"
                legacyBehavior
                passHref
              >
                <a className="d-flex align-items-center text-decoration-none">
                  <div className="account-button me-2">
                    <PermIdentityOutlined sx={{ color: "#fffffe" }} />
                  </div>
                  <div>
                    <p className="subtitle--navBar mb-0">
                      Hi, {customerProfile ? customerProfile.LAST_NAME : "User"}
                    </p>{" "}
                    {/* Display the customer's first name or "User" if not signed in */}
                  </div>
                </a>
              </Link>
            </Col>

            {/* Cart amount */}
            <Col xs={12} md={1} className="d-flex flex-column align-items-end">
              <div className="text-end">
                <p className="subtitle--navBar mb-0">Amount:</p>
                <p className="subtitle--navBar mb-0">${cartTotal.toFixed(2)}</p>
              </div>
            </Col>

            {/* Cart button */}
            <Col
              xs={12}
              md={1}
              className="d-flex flex-row-reverse bd-highlight"
            >
              <Link href="/CustomerView/ViewCart/" legacyBehavior passHref>
                <a>
                  <div className="account-button me-2">
                    <ShoppingCartOutlinedIcon sx={{ color: "#fffffe" }} />
                  </div>
                </a>
              </Link>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </div>
  );
};

export default HomePageNavBar;
