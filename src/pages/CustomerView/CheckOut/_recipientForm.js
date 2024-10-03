import React, { useState } from "react";
import Link from "next/link";

import AccountCircleRounded from "@mui/icons-material/AccountCircleRounded";
import ArrowRightRounded from "@mui/icons-material/ArrowRightRounded";
import LocalPhoneOutlined from "@mui/icons-material/LocalPhoneOutlined";
import AccessTimeOutlined from "@mui/icons-material/AccessTimeOutlined"; //clock

import AddLocationAltRounded from "@mui/icons-material/AddLocationAltRounded";

const DetailForm = () => {

  const [receiver, setReceiverName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [delivery, setDelivery] = useState('');
  const [pickup, setPickup] = useState('');

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
            <AccountCircleRounded className="standard-icon"/>

            <p className= "subtitle ms-2">Recipient Name</p>
        </div>
                
        <div className="w-100 d-flex mb-3 ">
            <input
                placeholder="your full name"
                value={receiver}
                onChange={(e) => setReceiverName(e.target.value)}
                className="form_item1"
            />
            <button>
                <ArrowRightRounded className="standard-icon"/>
            </button>
                        
        </div>   
                
        {/* Add address and check address dictionary */}
        <div className="d-flex w-100 mt-3">
            <AddLocationAltRounded className="standard-icon"/>
            <p className= "subtitle ms-2">Address</p>
        </div>

        <div className="w-100 d-flex mb-3 ">
            <input
                placeholder="Search for an address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form_item1"
            />
            <button>
                <ArrowRightRounded className="standard-icon"/>
            </button>
        </div>

        {/* Add phone and check phone dictionary */}
        <div className="d-flex w-100 mt-3">
            <LocalPhoneOutlined className="standard-icon"/>
            <p className= "subtitle ms-2">Contact</p>
        </div>
        <div className="w-100 d-flex mb-3 ">
            <input
                placeholder="+61 "
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="form_item1"
            />
            <button>
                <ArrowRightRounded className="standard-icon"/>
            </button>
        </div>

         {/* Add delivery option */}
         <div className="d-flex w-100 my-2">
            <AccessTimeOutlined className="standard-icon"/>
            <p className= "subtitle ms-2">Delivery Method</p>
        </div>
                        
        <div className="w-100 d-flex my-2" value={delivery}>
        {/* option 1: */}
            <button value={delivery} onClick={(e) => setDelivery(e.target.value)}>
                <div className="button-3" style={{width:"150px"}}>
                    <p className="button-title-text my-1">Delivery</p>
                    <p className="my-1">within 48 hours</p>
                </div>
            </button>
                
        {/* option 2: pick up in drop down section */}
            <button value={pickup} onClick={(e) => setPickup(e.target.value)}>
                <div className="button-3 text-center " style={{width:"150px"}}>
                    <p className="button-title-text my-1">Pick Up</p>
                    <div className="d-flex">
                        <p>Select available slot</p>
                    </div>
                </div>
            </button>

        </div>


    </div>
  );
};

export default DetailForm;