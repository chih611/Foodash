import React from "react";
import HomeDirectionLink from "./HomeDirectionLink/HomeDirectionLink";
import HomeContent from "./HomeContent/HomeContent";
import { Container, Row, Col, Button } from "react-bootstrap";
import ChatBot from "../ChatBot/ChatBot";
import HomePageNavBar from "./HomePageNavBar";
import { useSelector } from "react-redux";
import { Chat } from "@mui/icons-material";

const HomePage = () => {
  const customerProfile = useSelector((state) => state.customer.profile);

  return (
    <div>
      {customerProfile &&
      customerProfile.CUSTOMER_TYPE?.toLowerCase() === "user" ? (
        <>
          <HomePageNavBar />
          <HomeDirectionLink />
          <HomeContent />
          <ChatBot />
        </>
      ) : (
        <>
          <HomePageNavBar />
          <HomeContent />
          <ChatBot />
        </>
      )}
    </div>
  );
};

export default HomePage;
