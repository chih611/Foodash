import React, { useState, useEffect } from "react";
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
import CustomInput from "../CustomerProfile/CustomInput";

import AccountCircleRounded from "@mui/icons-material/AccountCircleRounded";
import ArrowRightRounded from "@mui/icons-material/ArrowRightRounded";
import LocalPhoneOutlined from "@mui/icons-material/LocalPhoneOutlined";
import AccessTimeOutlined from "@mui/icons-material/AccessTimeOutlined"; //clock
import ArrowDropDownOutlined from "@mui/icons-material/ArrowDropDownOutlined"; //dropdown arrow
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined"; //add item +
import RemoveCircleOutlineOutlined from "@mui/icons-material/RemoveCircleOutlineOutlined"; //remove item -
import CloseOutlined from "@mui/icons-material/CloseOutlined"; // delete item x

import AddLocationAltRounded from "@mui/icons-material/AddLocationAltRounded";

const CheckOutDetail = () => {
  const [receiver, setReceiverName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [promo, setPromo] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('your-api-url');
      const data = await response.json();
      // Assuming you update `contact` with this data
      setContact(data);
    }

    fetchData();
  }, []);

  return (
    <div>
      <Container fluid className="px-3 px-md-5 py-5" style={{ marginTop: "24px" }}>
        <div className="navBar text-center mb-5" style={{ marginBottom: "150px" }}>
            <h1>Shipping Information</h1>
        </div>

        {/* Mobie View */}
        <div className="d-flex justify-content-center d-lg-none"> 
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12624.53948738401!2d145.03831394999997!3d-37.71651195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sau!4v1726732205221!5m2!1sen!2sau"
                width="400"
                height="300"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ borderRadius: "50px", border: "0" }} 
            ></iframe>
        </div>



        <Row className="d-flex justify-content-begin d-lg-none my-5 mx-4">
            <div>
                {/* Add Recipient Name */}
                <div className="d-flex w-100">
                    <AccountCircleRounded sx={{ color: "#025373" }}/>
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
                        <ArrowRightRounded sx={{ color: "#025373" }}/>
                    </button>
                </div>

                {/* Add address and check address dictionary */}
                <div className="d-flex w-100 mt-3">
                    <AddLocationAltRounded sx={{ color: "#025373" }}/>
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
                        <ArrowRightRounded sx={{ color: "#025373" }}/>
                    </button>
                </div>

                {/* Add phone and check phone dictionary */}
                <div className="d-flex w-100 mt-3">
                    <LocalPhoneOutlined sx={{ color: "#025373" }}/>
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
                        <ArrowRightRounded sx={{ color: "#025373" }}/>
                    </button>
                </div>

                 {/* Add delivery option */}
                 <div className="d-flex w-100 my-2">
                    <AccessTimeOutlined sx={{ color: "#025373" }}/>
                    <p className= "subtitle ms-2">Contact</p>
                </div>
                <div className="w-100 d-flex my-2">
                    {/* option 1: */}
                    <button>
                        <div className="button-3" style={{width:"120px"}}>
                            <p className="button-title-text my-1">Standard</p>
                            <p className=" my-2">within 24 hours</p>
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
                                    <ArrowRightRounded sx={{ color: "#025373" }}/>
                                </button>
                            </div>
                            
                        </div>
                    </button>
                </div>


            </div>
        </Row>

        {/* Order Summary Section */}
        <Row className="d-flex align-items-center d-lg-none my-5 mx-4" style={{borderTop:"1px solid #03588C "}}>
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
                        <AddCircleOutlineOutlined className="ms-5" />
                    </button>
                    
                    <p className="subtitle mx-4 mt-3">2</p>

                    <button>
                        <RemoveCircleOutlineOutlined className="subtitle me-5"/>
                    </button>

                    <button>
                        <CloseOutlined className=" ms-5"/>
                    </button>
                </div>
                {/* dummy dupplicates, delete after fetch api sucessfully */}
                <div className="d-flex my-3 align-items-center">
                    <p className="subtitle me-5 mt-3">Mini Croissants</p>
                    <button>
                        <AddCircleOutlineOutlined className="ms-5" />
                    </button>
                    
                    <p className="subtitle mx-4 mt-3">2</p>

                    <button>
                        <RemoveCircleOutlineOutlined className="subtitle me-5"/>
                    </button>

                    <button>
                        <CloseOutlined className=" ms-5"/>
                    </button>
                </div>
            </div>
        </Row>

        {/* Paymment Method Section */}
        <Row className="d-flex justify-content-begin d-lg-none my-4 mx-4" style={{borderTop:"1px solid #90B4CE "}}>
            <div>
                <p className="subtitle mt-3 mb-1">Promo Code</p>
                <div  className="w-100 d-flex">
                    <input
                        placeholder="Enter your code here"
                        value={promo}
                        onChange={(e) => setPromo(e.target.value)}
                        className="form_item1 me-3"
                    />
                    <Button variant="primary mt-3" style={{height: "40px"}}>
                        Apply
                    </Button>
                </div>
                <div className="w-100 d-flex">
                    <p className="subtitle mt-3 mb-1">Delivery Fee</p>
                </div>
                <div className="w-100 d-flex">
                    <p className="subtitle mt-3 mb-1">Service Fee</p>
                </div>
                <div className="w-100 d-flex">
                    <p className="subtitle mt-3 mb-1">Utensils</p>
                </div>
                <div className="w-100 d-flex">
                    <p className="subtitle mt-3 mb-1">Gift Wrap</p>
                </div>

                <div className="w-100 d-flex">
                    <p className="h4 mt-3 mb-1">Total</p>
                </div>



            </div>
        </Row>


        {/* Paynow  Button */}
        <Row className="w-100 d-flex justify-content-center" style={{ marginTop: "24px" }}>
              <Col xs={12}>
                <Link href="/CustomerView/HomePage/HomePage" legacyBehavior passHref>
                  <a className="w-100">
                    <Button variant="primary" className="w-100">Pay Now</Button>
                  </a>
                </Link>
              </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CheckOutDetail;