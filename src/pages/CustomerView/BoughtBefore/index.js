import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { ArrowBackRounded } from "@mui/icons-material";
import Link from "next/link";
import Section from "./Section";
import HomeItemContainer from "../HomePage/HomeItemContainer/HomeItemContainer";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { fetchOrderByCustomerId } from "../../../../store/actions/orderAction";
import { fetchBoughtBeforeByCustomerId } from "../../../../store/actions/orderDetailAction";
import HomeDirectionLink from "../HomePage/HomeDirectionLink/HomeDirectionLink";
import HomePageNavBar from "../HomePage/HomePageNavBar";
import Home from "@/pages";

const BoughtBefore = () => {
  const customerId = useSelector(
    (state) => state.customer.profile?.CUSTOMER_ID
  );
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (customerId) {
      dispatch(fetchOrderByCustomerId(customerId));
      dispatch(fetchBoughtBeforeByCustomerId(customerId));
    }
  }, [customerId, dispatch]);

  const orderByCustomer = useSelector(
    (state) => state.order.orderListByCustomerId
  );
  const uniqueItems = useSelector((state) => state.orderDetail.uniqueItems);
  console.log("Customer ID :" + customerId);

  console.log("Customer bought before :" + uniqueItems);

  if (!orderByCustomer || orderByCustomer.length === 0) {
    return (
      <div>
        You have not purchased any item
        <Link href="/CustomerView/HomePage/" passHref>
          Make your first order
        </Link>
      </div>
    );
  }

  return (
    <Container className="bought-before-container">
      <Row>
        <HomePageNavBar />
      </Row>
      <Row>
        <HomeDirectionLink />
      </Row>
      <main>
        <Row className="d-none justify-content-center d-lg-flex">
          <div className="col-md-1">
            <Link href="/CustomerView/HomePage/" legacyBehavior passHref>
              <a className="d-flex align-items-center text-decoration-none">
                <div className="account-button me-2">
                  <ArrowBackRounded sx={{ color: "#025373" }} />
                </div>
              </a>
            </Link>
          </div>
          <div className="col-md-4"></div>
          <div className="col-md-7">
            <h1>Bought Before</h1>
          </div>
        </Row>{" "}
        <Section className="title" title="Deli and Fresh Meats" />
        <Section className="title" title="Party Platters" />
        <Section className="title" title="Flowers and Extras" />
      </main>
    </Container>
  );
};

export default BoughtBefore;
