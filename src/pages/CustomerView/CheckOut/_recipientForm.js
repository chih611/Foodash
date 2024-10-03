import React, { useState } from "react";
import Link from "next/link";

import AccountCircleRounded from "@mui/icons-material/AccountCircleRounded";
import ArrowRightRounded from "@mui/icons-material/ArrowRightRounded";
import LocalPhoneOutlined from "@mui/icons-material/LocalPhoneOutlined";
import AccessTimeOutlined from "@mui/icons-material/AccessTimeOutlined"; //clock

import AddLocationAltRounded from "@mui/icons-material/AddLocationAltRounded";
import { Button } from "react-bootstrap";

const DetailForm = ({ pickup, setPickup }) => {
  const [receiver, setReceiverName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [delivery, setDelivery] = useState("");

  //   useEffect(() => {
  //     async function fetchData() {
  //       const response = await fetch('your-api-url');
  //       const data = await response.json();
  //       // Assuming to update `contact` with this data
  //       setContact(data);
  //     }

  //     fetchData();
  //   }, []);

  return (
    <div>
      {/* Add Recipient Name */}
      <div className="d-flex w-100">
        <AccountCircleRounded className="standard-icon" />

        <p className="subtitle ms-2">Recipient Name</p>
      </div>

      <div className="w-100 d-flex mb-3 ">
        <input
          placeholder="your full name"
          value={receiver}
          onChange={(e) => setReceiverName(e.target.value)}
          className="form_item1"
        />
        <button>
          <ArrowRightRounded className="standard-icon" />
        </button>
      </div>

      {/* Add address and check address dictionary */}
      <div className="d-flex w-100 mt-3">
        <AddLocationAltRounded className="standard-icon" />
        <p className="subtitle ms-2">Address</p>
      </div>

      <div className="w-100 d-flex mb-3 ">
        <input
          placeholder="Search for an address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="form_item1"
        />
        <button>
          <ArrowRightRounded className="standard-icon" />
        </button>
      </div>

      {/* Add phone and check phone dictionary */}
      <div className="d-flex w-100 mt-3">
        <LocalPhoneOutlined className="standard-icon" />
        <p className="subtitle ms-2">Contact</p>
      </div>
      <div className="w-100 d-flex mb-3 ">
        <input
          placeholder="+61 "
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="form_item1"
        />
        <button>
          <ArrowRightRounded className="standard-icon" />
        </button>
      </div>

      {/* Add delivery option */}
      <div className="d-flex w-100 my-2">
        <AccessTimeOutlined className="standard-icon" />
        <p className="subtitle ms-2">Delivery Method</p>
      </div>

      <div className="w-100 d-flex my-2" value={delivery}>
        {/* option 1: */}
        <button value={delivery} onClick={(e) => setPickup(false)}>
          <div
            className={!pickup ? "button-3 bg-headline-color" : "button-3 "}
            style={{ width: "150px" }}
          >
            <p className="button-title-text my-1 ">Delivery</p>
            <p className={pickup ? "text-headline-color" : "text-light"}>
              {" "}
              within 48 hours
            </p>
          </div>
        </button>

        {/* option 2: pick up in drop down section */}
        <button onClick={(e) => setPickup(true)}>
          <div className={pickup ? "button-3 bg-headline-color" : "button-3"}>
            <p className="button-title-text my-1">Pick Up</p>
            <div
              className={pickup ? "text-light" : "d-flex text-headline-color"}
            >
              <p>Select available slot</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default DetailForm;