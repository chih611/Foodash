import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import NavBarCheckOut from "./_NavBarCheckOut";
import HomeDirectionLink from "../HomePage/HomeDirectionLink/HomeDirectionLink";
import OrderSummary from "./_itemSummary";
import AddPayment from "./_calculateFees";
import DetailForm from "./_recipientForm";

const Checkout = () => {
  const [pickup, setPickup] = useState(false);

  return (
    <div>
      <NavBarCheckOut />
      <HomeDirectionLink />
      <div>
        <Container
          fluid
          className="px-3 px-md-5 py-5"
          style={{ marginTop: "24px" }}
        >
          <div
            className="navBar text-center mb-5"
            style={{ marginBottom: "150px" }}
          >
            <h1>Shipping Information</h1>
          </div>

          {/* Mobie View */}

          <div className="d-flex justify-content-center d-lg-none">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12624.53948738401!2d145.03831394999997!3d-37.71651195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sau!4v1726732205221!5m2!1sen!2sau"
              width="400"
              height="300"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ borderRadius: "50px", border: "0" }}
            ></iframe>
          </div>

          <div className="d-flex justify-content-center d-lg-none my-5 mx-4">
            <DetailForm pickup={pickup} setPickup={setPickup} />
          </div>

          {/* Order Summary Section */}
          <div
            className="d-flex align-items-center d-lg-none my-5 mx-4"
            style={{ borderTop: "1px solid #03588C " }}
          >
            <OrderSummary />
          </div>

          {/* Paymment Method Section */}
          <div
            className="d-flex justify-content-center d-lg-none my-4 mx-4"
            style={{ borderTop: "1px solid #90B4CE " }}
          >
            <AddPayment pickup={pickup} />
          </div>

          {/* Desktop View */}

          <Row className="justify-content-center d-none d-lg-flex">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12624.53948738401!2d145.03831394999997!3d-37.71651195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sau!4v1726732205221!5m2!1sen!2sau"
              width="600"
              height="300"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ borderRadius: "50px", border: "0" }}
            ></iframe>
          </Row>

          <Row className="d-none justify-content-begin d-lg-flex my-5 mx-4">
            <DetailForm pickup={pickup} setPickup={setPickup} />
          </Row>

          {/* Order Summary Section */}
          <Row
            className="d-none align-items-center d-lg-flex mx-4"
            style={{ borderTop: "1px solid #03588C " }}
          >
            <OrderSummary />
          </Row>

          {/* Paymment Method Section */}
          <Row
            className="d-none justify-content-begin d-lg-flex my-4 mx-4"
            style={{ borderTop: "1px solid #90B4CE " }}
          >
            <AddPayment pickup={pickup} />
          </Row>

          {/* Paynow  Button */}
          <Row
            className="w-100 justify-content-center"
            style={{ marginTop: "24px" }}
          >
            <Col xs={12}>
              <Link href="/CustomerView/Payment" legacyBehavior passHref>
                <a className="w-100">
                  <Button variant="primary" className="w-100">
                    Pay Now
                  </Button>
                </a>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Checkout;
