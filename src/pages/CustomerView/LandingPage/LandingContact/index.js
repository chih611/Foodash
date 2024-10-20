// components/LandingContact.js
import React, { useState } from "react";
import Link from "next/link";
import { Container, Row, Col, Button } from "react-bootstrap";
import LandingNavBar from "../LandingNavBar/LandingNavBar";
import LandingMenu from "../LandingMenu/LandingMenu";
import Image from "next/image";
import PrimaryButton from "../../ViewCart/_PrimaryButton";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PhoneForwardedRounded from "@mui/icons-material/PhoneForwardedRounded";
import NotificationsActiveRounded from "@mui/icons-material/NotificationsActiveRounded";

import MailchimpSubscribe from 'react-mailchimp-subscribe';


const LandingContact = () => {
  const MAILCHIMP_URL = process.env.NEXT_PUBLIC_MAILCHIMP_URL;
  const [email, setEmail] = useState('')
  return (
    <div className="landing-contact">
      <LandingNavBar />
      {/* <LandingMenu /> */}           
        <Container style={{marginTop: '150px'}} className="landing-contact">
          {/* Contact Information: Adress, Working Hours, Email, Phone */}
          <Row className="justify-content-between">
            <p className="heading_white mt-3">Get in touch</p>
            <Col xs={12} md={3} className="justify-content-center m-3 text-right">
              <HomeOutlined className="contact-button my-3" />
              <p>Working Hours:
              <p>We open from 9:00 to 17:00<p>Monday to Friday</p></p></p>
              <p>Deliver between 8am to 3pm<p>within 5km incur a flat rate of $25</p></p>
              <p>Pick up is available between<p>7:30am and 3pm, Monday to Friday</p></p>
            </Col>
            <Col xs={12} md={4} className="m-3 text-right">
              <PhoneForwardedRounded className="contact-button my-3" />
              <p>p: 0498 576 005</p>
              <p>e: catering@foodcollective.org.au </p> 
              <p>Building A: <p> Pacific Epping, Cooper Sts, Epping</p></p>  
              <p>Building B: <p>Melbourne Polytechnic, Cnr Dalton Rd</p> </p>        

            </Col>

            {/* Logo and Order/Subscribe Buttons */}
            <Col xs={12} md={4} className="m-2 mt-3">
              <NotificationsActiveRounded className="contact-button my-3"/>
              <MailchimpSubscribe
                url={MAILCHIMP_URL}
                render={({ subscribe, status, message }) => (
                  <div className="subscribe-form">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="form-control my-3"
                      required
                    />
                    <PrimaryButton
                      icon={NotificationsNoneIcon}
                      text="Subscribe Us"
                      inverted={true}
                      onClick={() => {
                        subscribe({ EMAIL: email });
                      }}
                    />
                    {/* Displaying status messages */}
                    {status === "sending" && <div>Sending...</div>}
                    {status === "error" && <div style={{ color: "red" }} dangerouslySetInnerHTML={{ __html: message }} />}
                    {status === "success" && <div style={{ color: "green" }}>Subscribed successfully!</div>}
                  </div>
                )}
              />
            </Col>
          </Row>

          {/* Copyright Section */}
          <Row>
            <Col className="text-center">
              <p>&copy; 2024 Whittlesea Community Connections.</p>
            </Col>
          </Row>
        </Container>
    </div>
  );
};

export default LandingContact;
