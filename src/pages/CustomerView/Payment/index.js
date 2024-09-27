import axios from "axios";
import React, { useEffect } from "react";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";

const Payment = () => {
  // const appId = "sandbox-sq0idb-J_Bld9paUEQuNmSg2taitQ";
  // const locationId = "LF8HA6PMDGSFJ";
  const appId = "sq0idp-pvlfeZknc_UL_SWRO_w8BA";
  const locationId = "L739M75RNCW12";
  return (
    <PaymentForm
      applicationId={appId}
      locationId={locationId}
      cardTokenizeResponseReceived={async (token) => {
        console.log("token", token);
        await axios
          .post("http://localhost:8080/payment/create", {
            sourceId: token.token,
          })
          .then((response) => {
            console.log("Response:", response.data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }}
    >
      <CreditCard />
    </PaymentForm>
  );
};

export default Payment;
