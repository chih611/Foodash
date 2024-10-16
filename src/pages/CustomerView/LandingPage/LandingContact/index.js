// components/LandingContact.js

import React from "react";
import Link from "next/link";
import { Container, Row, Col, Button } from "react-bootstrap";
import LandingNavBar from "../LandingNavBar/LandingNavBar";
import LandingMenu from "../LandingMenu/LandingMenu";
import Image from "next/image";
import PrimaryButton from "../../ViewCart/_PrimaryButton";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

const LandingContact = () => {
  return (
    <div className="landing-contact-container">
      <LandingNavBar />
      <LandingMenu />
      <footer className="landing-contact py-4">
        <Container>
          <Row className="align-items-center">
            {/* Logo and Order/Subscribe Buttons */}
            <Col
              xs={12}
              md={6}
              className="d-flex align-items-center justify-content-center justify-content-md-start"
            >
              <Image
                src="/logo.png"
                alt="Foodash Logo"
                width={100}
                height={50}
              />

              <PrimaryButton
                icon={Inventory2OutlinedIcon}
                text="Order now"
                className="me-3"
              />
              <PrimaryButton
                icon={NotificationsNoneIcon}
                text="Subscribe Us"
                variant="inverted"
              />
            </Col>

            {/* Contact Information */}
            <Col xs={12} md={3} className="contact-info mt-4 mt-md-0">
              <p className="subtitle">
                <i className="bi bi-telephone"></i> 03 9401 6666
              </p>
              <p className="subtitle">Monday and Friday, 9 am to 5 pm</p>
              <p className="subtitle">
                Shop 11 Pacific Epping, Epping, Victoria, 3076
              </p>
            </Col>

            {/* Navigation Links */}
            <Col
              xs={12}
              md={3}
              className="footer-links text-center text-md-end mt-4 mt-md-0"
            >
              <Row>
                <p className="subtitle">
                  {" "}
                  <Link
                    href="/CustomerView/LandingPage/LandingSpecial/LandingSpecial"
                    className="subtitle"
                  >
                    {" "}
                    Menu
                  </Link>
                </p>
              </Row>
              <Row>
                <p className="subtitle">
                  {" "}
                  <Link
                    href="/CustomerView/LandingPage/LandingSpecial/LandingSpecial"
                    className="subtitle"
                  >
                    Recipe
                  </Link>
                </p>
              </Row>
              <Row>
                <p className="subtitle">
                  {" "}
                  <Link
                    href="/CustomerView/LandingPage/LandingSpecial/LandingSpecial"
                    className="subtitle"
                  >
                    Location
                  </Link>
                </p>
              </Row>
              <Row>
                <p className="subtitle">
                  {" "}
                  <Link
                    href="/CustomerView/LandingPage/LandingSpecial/LandingSpecial"
                    className="subtitle"
                  >
                    About Us
                  </Link>
                </p>
              </Row>
              <Row>
                <p className="subtitle">
                  {" "}
                  <Link
                    href="/CustomerView/LandingPage/LandingSpecial/LandingSpecial"
                    className="subtitle"
                  >
                    Contact Us
                  </Link>
                </p>
              </Row>
            </Col>
          </Row>

          {/* Copyright Section */}
          <Row className="mt-4">
            <Col className="text-center">
              <p>&copy; 2024 Whittlesea Community Connections.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default LandingContact;
