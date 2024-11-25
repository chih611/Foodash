import React from "react";
import LandingNavBar from "../LandingNavBar/LandingNavBar";
import Link from "next/link";
import { Container, Row, Col, Button } from "react-bootstrap";
import PrimaryButton from "../../ViewCart/_PrimaryButton";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LandingContact from "../LandingContact";

const LandingMenu = () => {
  return (
    <div className="landing-menu --image position-relative">
    <Container fluid >
      {/* Desktop View - Hidden on screens smaller than md */}
      <Row className="align-items-center d-none d-md-block px-3 px-md-4 py-4">
        <img
          src="/landingPage_background.png"
          alt="Landing Menu Image"
          className="img-fluid vh-100"
        />
        <div className="position-absolute start-50 translate-middle-x" style={{ top: '10%' }}>
          <div className="text-center">
            <Link href="/CustomerView/HomePage" legacyBehavior passHref>
              <div className="d-inline-block">
                <PrimaryButton 
                  icon={Inventory2OutlinedIcon} 
                  text="Order Now"
                  className="btn-lg"
                />
              </div>
            </Link>
          </div>
        </div>
      </Row>
      <Row className="align-items-center d-none d-md-block">
        <LandingContact />
      </Row>

      {/* Mobile View - Visible only on screens smaller than md */}
      <div className="d-md-none">
          <Row className="position-relative g-0">
            <Col xs={12} >
              <img
                src="/landingPage_background_mobile.png"
                alt="Landing Menu Image"
                className="img-fluid w-100"
              />
              <div className="position-absolute translate-middle-x" style={{ top: '65%', left: '60%' }}>
                <div className="text-center">
                  <Link href="/CustomerView/HomePage" legacyBehavior passHref>
                    <div className="d-inline-block">
                      <PrimaryButton 
                        icon={Inventory2OutlinedIcon} 
                        text="Order Now"
                        className="btn-sm"
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
          
          <Row className="mt-2">
            <Col xs={12}>
              
            </Col>
          </Row>
        </div>
    </Container>
  </div>
  );
};

export default LandingMenu;
