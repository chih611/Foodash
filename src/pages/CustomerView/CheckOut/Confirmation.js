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
import Image from "next/image";
import HomeDirectionLink from "../HomePage/HomeDirectionLink/HomeDirectionLink";
import SearchBar from "../HomePage/searchBar";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import PermIdentityOutlined from "@mui/icons-material/PermIdentityOutlined";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";


const Confirmation = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleToggle = () => setShowOffcanvas(!showOffcanvas);

  return (
    <p>Confirmation Page and Print Invoice</p>
  );
};

export default Confirmation;