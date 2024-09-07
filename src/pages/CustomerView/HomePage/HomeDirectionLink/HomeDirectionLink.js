import React from "react";
import { Nav, Col, Row } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
const HomeDirectionLink = () => {
  const router = useRouter();

  return (
    <div className="container">
      <div className="home-direction-link">
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
            <Link href="/" passHref legacyBehavior>
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
            <Link href="/" passHref legacyBehavior>
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
              router.pathname === "/bought-before" ? "active" : ""
            }`}
          >
            <Link href="/" passHref legacyBehavior>
              <a className="nav-link">
                <div className="indicator-button">
                  <Row className="align-items-center">
                    <Col xs={2} sm={2} md={2} lg={2}>
                      <SendOutlinedIcon sx={{ rotate: "-30deg" }} />
                    </Col>
                    <Col xs={10} sm={10} md={10} lg={10}>
                      Bought Before
                    </Col>
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
            <Link href="/" passHref legacyBehavior>
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
            className={`text-center   ${
              router.pathname === "/menu-planning" ? "active" : ""
            }`}
          >
            <Link href="/" passHref legacyBehavior>
              <a className="nav-link">
                <div className="indicator-button">
                  <Row className="align-items-center">
                    <Col xs={2} md={2} lg={2}>
                      <ContentPasteOutlinedIcon />
                    </Col>
                    <Col xs={10} md={10} lg={10}>
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
