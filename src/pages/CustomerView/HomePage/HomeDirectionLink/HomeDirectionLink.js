import React, { useState } from "react";
import { Nav, Col, Row, Offcanvas, Button } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

const HomeDirectionLink = () => {
  const router = useRouter();
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleOffcanvasToggle = () => setShowOffcanvas(!showOffcanvas);
  const handleOffcanvasClose = () => setShowOffcanvas(false);

  const getLinkStyle = (path) => {
    return router.pathname === path
      ? { color: "#ef4565", fontWeight: "bold" }
      : { color: "#025373" };
  };

  return (
    <div className="container">
      {/* Offcanvas button for small screens */}
      <Button
        className="toggle-direction-link d-md-none"
        variant="primary"
        onClick={handleOffcanvasToggle}
      >
        <MenuRoundedIcon />
      </Button>

      {/* Offcanvas for smaller screen navigation */}
      <Offcanvas
        show={showOffcanvas}
        onHide={handleOffcanvasClose}
        style={{ width: "50%" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Col className="text-center">
              <Link href="/CustomerView/HomePage/" passHref legacyBehavior>
                <a
                  className="nav-link"
                  style={getLinkStyle("/CustomerView/HomePage/")}
                >
                  <div className="indicator-button">
                    <Row className="align-items-center">
                      <Col xs={3}>
                        <HomeOutlinedIcon />
                      </Col>
                      <Col xs={9}>
                        <span>Home</span>
                      </Col>
                    </Row>
                  </div>
                </a>
              </Link>
            </Col>
            <Col className="text-center">
              <Link href="/CustomerView/Special/" passHref legacyBehavior>
                <a
                  className="nav-link"
                  style={getLinkStyle("/CustomerView/Special/")}
                >
                  <div className="indicator-button">
                    <Row className="align-items-center">
                      <Col xs={3}>
                        <StarBorderOutlinedIcon />
                      </Col>
                      <Col xs={9}>
                        <span>Special</span>
                      </Col>
                    </Row>
                  </div>
                </a>
              </Link>
            </Col>
            <Col className="text-center">
              <Link href="/favorites" passHref legacyBehavior>
                <a className="nav-link" style={getLinkStyle("/favorites")}>
                  <div className="indicator-button">
                    <Row className="align-items-center">
                      <Col xs={3}>
                        <FavoriteBorderOutlinedIcon />
                      </Col>
                      <Col xs={9}>
                        <span>Favorites</span>
                      </Col>
                    </Row>
                  </div>
                </a>
              </Link>
            </Col>
            <Col className="text-center">
              <Link href="/CustomerView/BoughtBefore" passHref legacyBehavior>
                <a
                  className="nav-link"
                  style={getLinkStyle("/CustomerView/BoughtBefore")}
                >
                  <div className="indicator-button">
                    <Row className="align-items-center">
                      <Col xs={2}>
                        <SendOutlinedIcon sx={{ rotate: "-30deg" }} />
                      </Col>
                      <Col xs={10}>Bought Before</Col>
                    </Row>
                  </div>
                </a>
              </Link>
            </Col>
            <Col className="text-center">
              <Link href="/CustomerView/OrderTracking" passHref legacyBehavior>
                <a
                  className="nav-link"
                  style={getLinkStyle("/CustomerView/OrderTracking")}
                >
                  <div className="indicator-button">
                    <Row className="align-items-center">
                      <Col xs={3}>
                        <Inventory2OutlinedIcon />
                      </Col>
                      <Col xs={9}>
                        <span>Orders</span>
                      </Col>
                    </Row>
                  </div>
                </a>
              </Link>
            </Col>
            <Col className="text-center">
              <Link href="/CustomerView/Menu" passHref legacyBehavior>
                <a
                  className="nav-link"
                  style={getLinkStyle("/CustomerView/Menu")}
                >
                  <div className="indicator-button">
                    <Row className="align-items-center">
                      <Col xs={2}>
                        <ContentPasteOutlinedIcon />
                      </Col>
                      <Col xs={10}>
                        <span>Menu Planning</span>
                      </Col>
                    </Row>
                  </div>
                </a>
              </Link>
            </Col>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Regular navigation for larger screens */}
      <div className="home-direction-link d-none d-md-block">
        <Nav className="row justify-content-center custom-nav">
          <Col md={2} className="text-center">
            <Link href="/CustomerView/HomePage/" passHref legacyBehavior>
              <a
                className="nav-link"
                style={getLinkStyle("/CustomerView/HomePage/")}
              >
                <div className="indicator-button">
                  <Row className="align-items-center">
                    <Col xs={3}>
                      <HomeOutlinedIcon />
                    </Col>
                    <Col xs={9}>
                      <span>Home</span>
                    </Col>
                  </Row>
                </div>
              </a>
            </Link>
          </Col>

          <Col md={2} className="text-center">
            <Link href="/CustomerView/Special/" passHref legacyBehavior>
              <a
                className="nav-link"
                style={getLinkStyle("/CustomerView/Special/")}
              >
                <div className="indicator-button">
                  <Row className="align-items-center">
                    <Col xs={3}>
                      <StarBorderOutlinedIcon />
                    </Col>
                    <Col xs={9}>
                      <span>Special</span>
                    </Col>
                  </Row>
                </div>
              </a>
            </Link>
          </Col>

          <Col md={2} className="text-center">
            <Link href="/favorites" passHref legacyBehavior>
              <a className="nav-link" style={getLinkStyle("/favorites")}>
                <div className="indicator-button">
                  <Row className="align-items-center">
                    <Col xs={3}>
                      <FavoriteBorderOutlinedIcon />
                    </Col>
                    <Col xs={9}>
                      <span>Favorites</span>
                    </Col>
                  </Row>
                </div>
              </a>
            </Link>
          </Col>

          <Col md={2} className="text-center">
            <Link href="/CustomerView/BoughtBefore" passHref legacyBehavior>
              <a
                className="nav-link"
                style={getLinkStyle("/CustomerView/BoughtBefore")}
              >
                <div className="indicator-button">
                  <Row className="align-items-center">
                    <Col xs={2}>
                      <SendOutlinedIcon sx={{ rotate: "-30deg" }} />
                    </Col>
                    <Col xs={10}>Bought Before</Col>
                  </Row>
                </div>
              </a>
            </Link>
          </Col>

          <Col md={2} className="text-center">
            <Link href="/CustomerView/OrderTracking" passHref legacyBehavior>
              <a
                className="nav-link"
                style={getLinkStyle("/CustomerView/OrderTracking")}
              >
                <div className="indicator-button">
                  <Row className="align-items-center">
                    <Col xs={3}>
                      <Inventory2OutlinedIcon />
                    </Col>
                    <Col xs={9}>
                      <span>Orders</span>
                    </Col>
                  </Row>
                </div>
              </a>
            </Link>
          </Col>

          <Col md={2} className="text-center">
            <Link href="/CustomerView/Menu" passHref legacyBehavior>
              <a
                className="nav-link"
                style={getLinkStyle("/CustomerView/Menu")}
              >
                <div className="indicator-button">
                  <Row className="align-items-center">
                    <Col xs={2}>
                      <ContentPasteOutlinedIcon />
                    </Col>
                    <Col xs={10}>
                      <span>Menu Planning</span>
                    </Col>
                  </Row>
                </div>
              </a>
            </Link>
          </Col>
        </Nav>
      </div>
    </div>
  );
};

export default HomeDirectionLink;
