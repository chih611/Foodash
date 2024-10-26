import axios from "axios";
import React from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  createOrder,
  createOrderDetail,
} from "../../../../store/actions/orderAction";
import Swal from "sweetalert2";
import {
  CreditCard,
  PaymentForm,
  ApplePay,
  GiftCard,
} from "react-square-web-payments-sdk";

const Payment = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const appId = "sq0idp-pvlfeZknc_UL_SWRO_w8BA";
  const locationId = "L739M75RNCW12";

  const {
    cartSubtotal,
    cartTotal,
    deliveryFee,
    serviceFee,
    recipientDetails,
    pickup,
    promoValue,
    orderNote,
    cartItems,
  } = router.query;

  const handlePayment = async (token) => {
    console.log("Payment token:", token);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_ADDRESS}/payment/create`,
        {
          sourceId: token.token,
        }
      );
      console.log("thaichihao", response);
      if (response.status === 200) {
        const finalOrderData = {
          CUSTOMER_ID: recipientDetails.customerId,
          RECIPIENT: recipientDetails.name,
          ADDRESS: recipientDetails.address,
          PHONE: recipientDetails.contact,
          EMAIL: recipientDetails.email,
          SUBTOTAL: cartSubtotal,
          TOTAL: cartTotal,
          DELIVERY_FEE: deliveryFee,
          SERVICE_FEE: serviceFee,
          PROMO: promoValue,
          NOTES: orderNote,
          STATUS: "Paid",
        };

        console.log(finalOrderData);

        const orderResponse = await dispatch(
          createOrder(finalOrderData)
        ).unwrap();
        const orderId = orderResponse.ORDER_ID;

        await Promise.all(
          cartItems.map(async (item) => {
            const orderDetailPayload = {
              ORDER_ID: orderId,
              UNIT_PRICE: item.price,
              TOTAL: item.price * item.quantity,
              QUANTITY: item.quantity,
              ITEM_ID: item.itemId,
            };
            return dispatch(createOrderDetail(orderDetailPayload)).unwrap();
          })
        );

        Swal.fire(
          "Payment Successful",
          "Your order has been placed!",
          "success"
        );
        router.push(`/CustomerView/CheckOut/Confirm?orderId=${orderId}`);
      } else {
        throw new Error("Payment failed");
      }
    } catch (error) {
      Swal.fire(
        "Payment Error",
        "An error occurred during payment. Please try again.",
        "error"
      );
    }
  };

  return (
    <div>
      <h1>Payment Method</h1>
      <PaymentForm
        applicationId={appId}
        locationId={locationId}
        cardTokenizeResponseReceived={handlePayment}
      >
        <CreditCard />
        <GiftCard />
      </PaymentForm>
    </div>
  );
};

export default Payment;
