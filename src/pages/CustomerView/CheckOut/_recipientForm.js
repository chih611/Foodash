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

import AccountCircleRounded from "@mui/icons-material/AccountCircleRounded";
import ArrowRightRounded from "@mui/icons-material/ArrowRightRounded";
import LocalPhoneOutlined from "@mui/icons-material/LocalPhoneOutlined";
import AccessTimeOutlined from "@mui/icons-material/AccessTimeOutlined"; //clock
import ArrowDropDownOutlined from "@mui/icons-material/ArrowDropDownOutlined"; //dropdown arrow

import AddLocationAltRounded from "@mui/icons-material/AddLocationAltRounded";

const DetailForm = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const [receiver, setReceiverName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  

  const handleToggle = () => setShowOffcanvas(!showOffcanvas);

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
            <LocalPhoneOutlined sclassName="standard-icon"/>
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
                        
        <div className="w-100 d-flex my-2">
        {/* option 1: */}
            <button>
                <div className="button-3" style={{width:"120px"}}>
                    <p className="button-title-text my-1">Standard</p>
                    <p className="my-2">within 24 hours</p>
                </div>
            </button>
                
        {/* option 2 */}
            <button>
                <div className="button-3" style={{width:"120px"}}>
                    <p className="button-title-text my-1">Priority</p>
                    <p className="my-1">3-4 hours</p>
                    <p>+ $5.99</p>

                 </div>
            </button>
                    
        {/* option 3: select time in drop down section */}
            <button>
                <div className="button-3 " style={{width:"140px"}}>
                    <p className="button-title-text my-1">Schedule</p>
                    <div className="d-flex item-align-center ms-3">
                        <p>Choose your time</p>
                        <button>
                            <ArrowRightRounded className="standard-icon"/>
                         </button>
                     </div>
                </div>
            </button>
        </div>


    </div>
  );
};

export default DetailForm;