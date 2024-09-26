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
import ArrowDropDownOutlined from "@mui/icons-material/ArrowDropDownOutlined"; //dropdown arrow
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined"; //add item +
import RemoveCircleOutlineOutlined from "@mui/icons-material/RemoveCircleOutlineOutlined"; //remove item -
import CloseOutlined from "@mui/icons-material/CloseOutlined"; // delete item x

import AddLocationAltRounded from "@mui/icons-material/AddLocationAltRounded";
import CreditCardRounded from "@mui/icons-material/CreditCardRounded";

const OrderSummary = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleToggle = () => setShowOffcanvas(!showOffcanvas);

  return (
    <div>
        <div></div>
        <h4 className="my-3">Order Summary</h4>
        <div className="d-flex mx-3">
            <p className="subtitle mx-3">3 items</p>    
            <ArrowDropDownOutlined />                
        </div>

        {/* List of items, fetch real data later */}
        <div className="w-100 d-flex my-3 align-items-center">
            <p className="subtitle me-5 mt-3">Mini Croissants</p>
                <button>
                    <RemoveCircleOutlineOutlined  className="ms-5" />
                </button>
                    
            <p className="subtitle mx-4 mt-3">2</p>

            <button>
                <AddCircleOutlineOutlined className="subtitle me-5"/>
            </button>

            <button>
                <CloseOutlined className=" ms-5"/>
            </button>
        </div>
                
        {/* dummy dupplicates, delete after fetch api sucessfully */}
        <div className="d-flex my-3 align-items-center">
            <p className="subtitle me-5 mt-3">Mini Croissants</p>
                <button>
                    <RemoveCircleOutlineOutlined  className="ms-5" />
                </button>
                    
            <p className="subtitle mx-4 mt-3">2</p>

            <button>
                <AddCircleOutlineOutlined className="subtitle me-5"/>
            </button>

            <button>
                <CloseOutlined className=" ms-5"/>
            </button>
        </div>
    </div>

  );
};

export default OrderSummary;