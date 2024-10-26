import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
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

const Payment = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // const appId = "sq0idp-pvlfeZknc_UL_SWRO_w8BA";
  // const locationId = "L739M75RNCW12";

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
          // Keep unchanged fields from existing order
          CUSTOMER_ID: existingOrder.CUSTOMER_ID,
          RECIPIENT: existingOrder.RECIPIENT || recipientDetails.name, // Take from existing order if available
          ADDRESS: existingOrder.ADDRESS || recipientDetails.address,
          PHONE: existingOrder.PHONE || recipientDetails.contact,
          EMAIL: existingOrder.EMAIL || recipientDetails.email,
          DUEDATE:
            existingOrder.DUEDATE || new Date().toISOString().split("T")[0], // Preserving due date
          DELIVER: existingOrder.DELIVER, // Keep the existing delivery status
          TAXES: existingOrder.TAXES || 10, // Preserve existing taxes
          DELIVERY_FEE: existingOrder.DELIVERY_FEE || deliveryFee, // Keep existing delivery fee if available
          SERVICE_FEE: existingOrder.SERVICE_FEE || serviceFee, // Same for service fee
          UTENSIL: existingOrder.UTENSIL, // Preserve existing utensil option
          GIFTWRAP: existingOrder.GIFTWRAP, // Preserve gift wrap choice
          PROMO: existingOrder.PROMO || promoValue, // Keep existing promo value if any
          SUBTOTAL: existingOrder.SUBTOTAL || cartSubtotal, // Keep existing subtotal or use new one
          ORDER_ITEM_ID: existingOrder.ORDER_ITEM_ID, // Preserve order item ID
          CREATED_DATE: existingOrder.CREATED_DATE, // Preserve creation date
          TOTAL: existingOrder.TOTAL || cartTotal, // Preserve existing total
          NOTES: existingOrder.NOTES || orderNote, // Preserve notes or add new
          RECURRING: existingOrder.RECURRING, // Preserve recurring status
          FEEDBACK: existingOrder.FEEDBACK, // Keep existing feedback

          // Update only the fields that need changing
          PAYMENT: "Credit", // Updated payment method
          STATUS: "Paid", // Update the status to Paid
          UPDATED: new Date().toISOString(), // Add update timestamp
        };

        console.log("Updated order data:", updatedData);

        // Dispatch update order action with the updated fields
        await dispatch(updateOrder({ orderId, updatedData })).unwrap();

        Swal.fire(
          "Payment Successful",
          "Your order has been placed!",
          "success"
        );

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
