import React from "react";
import LandingNavBar from "../LandingNavBar/LandingNavBar";
import { Container, Row, Col, Button } from "react-bootstrap";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../../ViewCart/_PrimaryButton";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

import { fetchItems } from "../../../../../store/slices/itemsSlice";
const LandingSpecial = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const items = useSelector((state) => state.items.items);
  const displayItem = items.filter((item) => item.SPECIAL_STATUS !== 0)[0];

  return (
    <div className="landing-menu">
      <div
        className="navBar"
        style={{
          marginBottom: "48px",
        }}
      >
        <LandingNavBar />
      </div>
      <Container
        fluid
        className="px-3 px-md-5 py-5" // Adjusted padding for mobile and desktop
        style={{ marginTop: "24px" }}
      >
        <Row className="align-items-center">
          {/* Text and Button Section */}

          {/* Image Placeholder Section */}
          <Col xs={12} md={5} className="d-flex justify-content-center">
            <div
              style={{
                width: "100%",
                maxWidth: "342px",
                height: "342px",
                backgroundColor: "#e0e0e0",
                marginTop: "24px",
              }}
            >
              {/* Image Placeholder */}
            </div>
          </Col>

          <Col xs={12} md={7} className="text-left mb-4">
            <h1 className="display-4">{displayItem.ITEM_NAME}</h1>
            <h2>${displayItem.UNIT_PRICE}</h2>
            <p className="lead">{displayItem.DESCRIPTION}</p>
            <Link href="/CustomerView/HomePage" legacyBehavior passHref>
              <PrimaryButton icon={Inventory2OutlinedIcon} text="Order Now" />
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingSpecial;
