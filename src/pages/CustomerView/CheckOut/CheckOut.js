import React, { useState } from "react";
import Link from "next/link";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Button,
  Offcanvas,
} from "react-bootstrap";
import NavBarCheckOut from "./NavBarCheckOut";
import HomeDirectionLink from "../HomePage/HomeDirectionLink/HomeDirectionLink";
import CheckOutDetail from "./CheckOutDetail";

const Checkout = () => {
  return (
    <div>
      <NavBarCheckOut/>
      <HomeDirectionLink />
      <CheckOutDetail />
      
    </div>
  );
};

export default Checkout;
