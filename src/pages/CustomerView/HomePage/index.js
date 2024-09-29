import React from "react";
import HomeDirectionLink from "./HomeDirectionLink/HomeDirectionLink";
import HomeContent from "./HomeContent/HomeContent";
import { Container, Row, Col, Button } from "react-bootstrap";
import HomePageNavBar from "./HomePageNavBar";
import { useSelector } from "react-redux";

const HomePage = () => {
  const customerProfile = useSelector((state) => state.customer.profile);

  return (
    <div>
      {/* {customerProfile &&
      customerProfile.CUSTOMER_TYPE.toLowerCase() === "user" ? (
        <>
          <HomePageNavBar />
          <HomeDirectionLink />
          <HomeContent />
        </>
      ) : (
        <>
          <HomePageNavBar />
          <HomeContent />
        </>
      )} */}

      <HomePageNavBar />
      <HomeDirectionLink />
      <HomeContent />
    </div>
  );
};

export default HomePage;
