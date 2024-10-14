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
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import SortByAlphaOutlinedIcon from "@mui/icons-material/SortByAlphaOutlined";

const HomeDirectionLink = () => {
  const router = useRouter();
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleOffcanvasToggle = () => setShowOffcanvas(!showOffcanvas);
  const handleOffcanvasClose = () => setShowOffcanvas(false);

  return (
    <div className="container">
      {/* Offcanvas button for small screens */}
      <Button
        className="d-md-none"
        variant="primary"
        onClick={handleOffcanvasToggle}
      >
        <MenuRoundedIcon />{" "}
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
            <Col
              className={`text-center ${
                router.pathname === "/" ? "active" : ""
              }`}
            >
              <Link href="/" passHref legacyBehavior>
                <a className="nav-link">
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
            <Col
              className={`text-center ${
                router.pathname === "/special" ? "active" : ""
              }`}
            >
              <Link
                href="/CustomerView/Special/Special"
                passHref
                legacyBehavior
              >
                <a className="nav-link">
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
            <Col
              className={`text-center ${
                router.pathname === "/favorites" ? "active" : ""
              }`}
            >
              <Link href="/favorites" passHref legacyBehavior>
                <a className="nav-link">
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
            <Col
              className={`text-center ${
                router.pathname === "/bought-before" ? "active" : ""
              }`}
            >
              <Link
                href="/CustomerView/BoughtBefore/BoughtBefore"
                passHref
                legacyBehavior
              >
                <a className="nav-link">
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
            <Col
              className={`text-center ${
                router.pathname === "/orders" ? "active" : ""
              }`}
            >
              <Link href="/CustomerView/OrderTracking/" passHref legacyBehavior>
                <a className="nav-link">
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
            <Col
              className={`text-center ${
                router.pathname === "/menu-planning" ? "active" : ""
              }`}
            >
              <Link href="/CustomerView/Menu" passHref legacyBehavior>
                <a className="nav-link">
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
          <Col
            md={2}
            className={`text-center ${router.pathname === "/" ? "active" : ""}`}
          >
            <Link href="/" passHref legacyBehavior>
              <a className="nav-link">
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

          <Col
            md={2}
            className={`text-center ${
              router.pathname === "/special" ? "active" : ""
            }`}
          >
            <Link href="/CustomerView/Special/Special" passHref legacyBehavior>
              <a className="nav-link">
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

          <Col
            md={2}
            className={`text-center ${
              router.pathname === "/favorites" ? "active" : ""
            }`}
          >
            <Link href="/favorites" passHref legacyBehavior>
              <a className="nav-link">
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

          <Col
            md={2}
            className={`text-center ${
              router.pathname === "/CustomerView/BoughtBefore/BoughtBefore"
                ? "active"
                : ""
            }`}
          >
            <Link
              href="/CustomerView/BoughtBefore/BoughtBefore"
              passHref
              legacyBehavior
            >
              <a className="nav-link">
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

          <Col
            md={2}
            className={`text-center ${
              router.pathname === "/orders" ? "active" : ""
            }`}
          >
            <Link href="/CustomerView/OrderTracking" passHref legacyBehavior>
              <a className="nav-link">
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

          <Col
            md={2}
            className={`text-center ${
              router.pathname === "/menu-planning" ? "active" : ""
            }`}
          >
            <Link href="/CustomerView/Menu" passHref legacyBehavior>
              <a className="nav-link">
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
