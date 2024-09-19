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

const Checkout = () => {
  return (
    <div>
      <NavBarCheckOut/>
    </div>
  );
};

export default Checkout;
