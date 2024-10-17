import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { CreditCard, PaymentForm, ApplePay, GiftCard } from "react-square-web-payments-sdk";

const Payment = () => {
  // const appId = "sandbox-sq0idb-J_Bld9paUEQuNmSg2taitQ";
  // const locationId = "LF8HA6PMDGSFJ";
  const appId = "sq0idp-pvlfeZknc_UL_SWRO_w8BA";
  const locationId = "L739M75RNCW12";

  const handlePayment = async (token) => {
    console.log("Payment token:", token);
    try {
      const response = await axios.post(
        `const BASE_URL = "https://${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_ADDRESS}"/payment/create`,
        {
          sourceId: token.token,
        }
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  return (    

    <Row classname = "d-flex d-lg-none justify-content-center" style={{margin: "24px"}}>
        
        <div style={{marginBottom: "24px",}}> 
          <h1>Payment Method</h1>
        </div>



        <PaymentForm
          applicationId={appId}
          locationId={locationId}
          cardTokenizeResponseReceived={handlePayment}

          >
          <CreditCard />

          <div style={{marginBottom: "24px",}}></div>         

          {/* Gift Card Payment Method */}
          <GiftCard />
          
        </PaymentForm>
             


        </Row>
  );
};

export default Payment;
