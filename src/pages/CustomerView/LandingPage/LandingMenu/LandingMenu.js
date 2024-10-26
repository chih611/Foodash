import React from "react";
import LandingNavBar from "../LandingNavBar/LandingNavBar";
import Link from "next/link";
import { Container, Row, Col, Button } from "react-bootstrap";
import PrimaryButton from "../../ViewCart/_PrimaryButton";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

const LandingMenu = () => {
  return (
    <div className="landing-menu">
      <Container
        fluid
        className="px-3 px-md-5 py-5" // Adjusted padding for mobile and desktop
      >
        <Row className="align-items-center">
          {/* Text and Button Section */}
          <Col xs={12} md={9} className="text-left mb-4">
            <h1 className="display-4">
              Welcome to today's delicious catering menu
            </h1>
            <p className="lead">WWC freshest ingredients for your event</p>
            <Link href="/CustomerView/HomePage" legacyBehavior passHref>
              <PrimaryButton icon={Inventory2OutlinedIcon} text="Order Now" />
            </Link>
          </Col>
          {/* Image Placeholder Section */}
          <Col xs={12} md={3} className="d-flex justify-content-center">
            <div className="landing-menu--image">{/* Image Placeholder */}</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingMenu;
