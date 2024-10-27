import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderById, // Import the function to fetch existing order details
  updateOrder,
} from "../../../../store/actions/orderAction";
import Swal from "sweetalert2";
import {
  CreditCard,
  PaymentForm,
  GiftCard,
} from "react-square-web-payments-sdk";
import { clearCartItems } from "../../../../store/slices/cartSlice";
import moment from "moment";

const Payment = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartId = useSelector((state) => state.cart.cartId);
  const customerId = useSelector(
    (state) => state.customer.profile?.CUSTOMER_ID || null
  );

  const appId = "sandbox-sq0idb-J_Bld9paUEQuNmSg2taitQ";
  const locationId = "LF8HA6PMDGSFJ";
  const {
    orderId,
    cartSubtotal,
    cartTotal,
    deliveryFee,
    serviceFee,
    recipientDetails,
    promoValue,
    orderNote,
    cartItems,
  } = router.query;

  const [existingOrder, setExistingOrder] = useState(null);

  // Fetch existing order data
  useEffect(() => {
    const fetchExistingOrder = async () => {
      try {
        const existingOrderData = await dispatch(
          getOrderById(orderId)
        ).unwrap();
        setExistingOrder(existingOrderData);
      } catch (error) {
        console.error("Error fetching existing order:", error);
      }
    };

    if (orderId) {
      fetchExistingOrder();
    }
  }, [orderId, dispatch]);

  const handlePayment = async (token) => {
    console.log("Payment token:", token);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_ADDRESS}/payment/create`,
        {
          sourceId: token.token,
        }
      );

      if (response.status === 200) {
        // Fetch existing order details to preserve non-updated fields
        const existingOrderResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_ADDRESS}/order_table/${orderId}`
        );
        const existingOrder = existingOrderResponse.data[0];

        // Prepare the updated order data
        const updatedData = {
          CUSTOMER_ID: existingOrder.CUSTOMER_ID,
          RECIPIENT: existingOrder.RECIPIENT || recipientDetails.name,
          ADDRESS: existingOrder.ADDRESS || recipientDetails.address,
          PHONE: existingOrder.PHONE || recipientDetails.contact,
          EMAIL: existingOrder.EMAIL || recipientDetails.email,
          DUEDATE:
            moment(existingOrder.DUEDATE).format("YYYY-MM-DD") ||
            new Date().toISOString().split("T")[0],
          DELIVER: existingOrder.DELIVER,
          TAXES: existingOrder.TAXES || 10,
          DELIVERY_FEE: existingOrder.DELIVERY_FEE || deliveryFee,
          SERVICE_FEE: existingOrder.SERVICE_FEE || serviceFee,
          UTENSIL: existingOrder.UTENSIL,
          GIFTWRAP: existingOrder.GIFTWRAP,
          PROMO: existingOrder.PROMO || promoValue,
          SUBTOTAL: existingOrder.SUBTOTAL || cartSubtotal,
          ORDER_ITEM_ID: existingOrder.ORDER_ITEM_ID,
          CREATED_DATE: moment(existingOrder.CREATED_DATE).format("YYYY-MM-DD"),
          TOTAL: existingOrder.TOTAL || cartTotal,
          NOTES: existingOrder.NOTES || orderNote,
          RECURRING: existingOrder.RECURRING,
          FEEDBACK: existingOrder.FEEDBACK,
          PAYMENT: "Credit", // Updated payment method
          STATUS: "Paid", // Update the status to Paid
          UPDATED: new Date().toISOString(),
        };

        console.log("Updated order data:", updatedData);

        // Dispatch update order action with the updated fields
        await dispatch(updateOrder({ orderId, updatedData })).unwrap();

        Swal.fire(
          "Payment Successful",
          "Your order has been placed!",
          "success"
        );

        // Clear the cart items
        await dispatch(clearCartItems({ customerId, cartId }));

        // Redirect to confirmation page
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
