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
import ArrowRightRounded from "@mui/icons-material/ArrowRightRounded";
import CreditCardRounded from "@mui/icons-material/CreditCardRounded";

const PaymentMethod = () => {
   
    const [promo, setPromo] = useState('');
  
    return(
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

            {/* List of cost, use fetch after */}

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

            {/* Add payment method */}
                        
            <div className="w-100 d-flex">
                <CreditCardRounded className="subtitle mt-3 mb-1"/>
                <button className="d-flex mx-5 mt-3 mb-1">
                    <p className ="subtitle mx-4">Add payment method</p>
                    <ArrowRightRounded sx={{ color: "#025373" }} className="ms-5"/>
                </button> 
            </div>

            {/* Summary the total */}

            <div className="w-100 d-flex">
                <p className="h4 mt-3 mb-1">Total</p>
            </div>

        </div>
    );

};
export default PaymentMethod;