import React, { useEffect } from 'react';
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk"
require('dotenv').config()

const Payment = () => {
    const appId = 'sandbox-sq0idb-J_Bld9paUEQuNmSg2taitQ';
    const locationId = 'LF8HA6PMDGSFJ';
    return (
        <PaymentForm
            applicationId={ appId }
            locationId={ locationId }
            cardTokenizeResponseReceived={ async (token) => {
                console.log('token', token);
            } }
        >
            <CreditCard />
        </PaymentForm>
    );
};

export default Payment;
