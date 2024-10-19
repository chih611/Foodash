import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import NavBarCheckOut from "./_NavBarCheckOut";
import HomeDirectionLink from "../HomePage/HomeDirectionLink/HomeDirectionLink";
import OrderSummary from "./_itemSummary";
import AddPayment from "./_calculateFees";
import DetailForm from "./_recipientForm";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../../../../store/actions/orderAction";
import { createOrderDetail } from "../../../../store/actions/orderDetailAction";
import {
  checkIfCustomerExists,
  createCustomer,
} from "../../../../store/slices/customerSlice";
import { clearCart } from "../../../../store/slices/cartSlice";
import PaymentIcon from "@mui/icons-material/Payment";
import PrimaryButton from "../ViewCart/_PrimaryButton";

const Checkout = () => {
  const [pickup, setPickup] = useState(false);
  const [promoValue, setPromoValue] = useState(0);
  const [scheduledDate, setScheduledDate] = useState(""); // New state for scheduled date
  const [recipientDetails, setRecipientDetails] = useState({
    name: "",
    address: "",
    contact: "",
    email: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();

  // Fetch customer profile and cart items from Redux store
  const cartItems = useSelector((state) => state.cart.cartItems);
  const customerProfile = useSelector((state) => state.customer.profile);
  const customerId = customerProfile?.CUSTOMER_ID || null;

  // Prefill recipient details with customer profile if logged in
  useEffect(() => {
    if (customerProfile) {
      setRecipientDetails({
        name: `${customerProfile.FIRST_NAME || ""} ${
          customerProfile.LAST_NAME || ""
        }`,
        address: customerProfile.ADDRESS || "",
        contact: customerProfile.PHONE_NUMBER || "",
        email: customerProfile.EMAIL || "",
      });
    }
  }, [customerProfile]);

  const fees = [
    { id: 1, name: "Delivery Fee", price: 6.99 },
    { id: 2, name: "Service Fee", price: 2.99 },
    { id: 3, name: "Utensil", price: 1.99 },
    { id: 4, name: "Gift Wrap", price: 5.5 },
  ];
  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryFee = fees.find((fee) => fee.id === 1)?.price || 0;
  const serviceFee = fees.find((fee) => fee.id === 2)?.price || 0;
  const utensil = fees.find((fee) => fee.id === 3)?.price || 0;
  const giftWrap = fees.find((fee) => fee.id === 4)?.price || 0;
  const cartTotal =
    cartSubtotal + fees.reduce((acc, fee) => acc + fee.price, 0) - promoValue;

  const checkCustomerId = async (recipientDetails) => {
    try {
      let finalCustomerId = customerId; // Use logged-in customer ID if available

      if (!finalCustomerId) {
        let existingCustomer = null;

        try {
          if (recipientDetails.email) {
            existingCustomer = await checkIfCustomerExists(
              "user",
              recipientDetails.email,
              null
            );
          }

          if (!existingCustomer?.data && recipientDetails.contact) {
            existingCustomer = await checkIfCustomerExists(
              "user",
              null,
              recipientDetails.contact
            );
          }

          if (existingCustomer?.data) {
            finalCustomerId = existingCustomer.data.CUSTOMER_ID;
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
            const guestCustomerData = {
              firstName: recipientDetails.name.split(" ")[0],
              lastName: recipientDetails.name.split(" ")[1] || "",
              email: recipientDetails.email || null,
              phoneNumber: recipientDetails.contact || null,
              address: recipientDetails.address || null,
              customerType: "guest",
            };

            const newCustomerResponse = await dispatch(
              createCustomer(guestCustomerData)
            ).unwrap();
            finalCustomerId = newCustomerResponse.customerId;
          } else {
            throw error;
          }
        }
      }

      return finalCustomerId;
    } catch (error) {
      console.error("Error in checkCustomerId:", error);
      throw error;
    }
  };

  const createOrderHandler = async (
    finalCustomerId,
    cartSubtotal,
    cartTotal,
    deliveryFee,
    serviceFee,
    utensil,
    giftWrap,
    recipientDetails,
    pickup,
    promoValue,
    scheduledDate // Added to payload
  ) => {
    try {
      const orderPayload = {
        CUSTOMER_ID: finalCustomerId,
        DUEDATE: scheduledDate || new Date().toISOString().split("T")[0], // Use scheduled date if available
        RECIPIENT: recipientDetails.name,
        ADDRESS: recipientDetails.address,
        PHONE: recipientDetails.contact,
        EMAIL: recipientDetails.email,
        DELIVER: pickup ? 0 : 1,
        PAYMENT: "Credit",
        TAXES: 10,
        DELIVERY_FEE: deliveryFee,
        SERVICE_FEE: serviceFee,
        UTENSIL: utensil,
        GIFTWRAP: giftWrap,
        PROMO: promoValue,
        SUBTOTAL: cartSubtotal,
        ORDER_ITEM_ID: null,
        CREATED_DATE: new Date().toISOString().split("T")[0],
        TOTAL: cartTotal,
        NOTES: "Please deliver ASAP",
        STATUS: "Pending",
      };

      const orderResponse = await dispatch(
        createOrder({ orderData: orderPayload })
      ).unwrap();
      const orderId = orderResponse.ORDER_ID;

      if (!orderId) {
        throw new Error("Failed to create order: ORDER_ID not returned");
      }

      return orderId;
    } catch (error) {
      throw error;
    }
  };

  const createOrderItemsHandler = async (orderId, cartItems) => {
    try {
      const orderDetailPromises = cartItems.map(async (item) => {
        const orderDetailPayload = {
          ORDER_ID: orderId,
          UNIT_PRICE: item.price,
          TOTAL: item.price * item.quantity,
          QUANTITY: item.quantity,
          LABEL_ID: item.labelId, // <-- LABEL_ID is passed here
          NOTES: item.notes,
          ITEM_ID: item.itemId,
          MODIFICATION: item.extras,
        };

        return dispatch(createOrderDetail(orderDetailPayload)).unwrap();
      });

      await Promise.all(orderDetailPromises);
    } catch (error) {
      throw error;
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const finalCustomerId = await checkCustomerId(recipientDetails);
      const orderId = await createOrderHandler(
        finalCustomerId,
        cartSubtotal,
        cartTotal,
        deliveryFee,
        serviceFee,
        utensil,
        giftWrap,
        recipientDetails,
        pickup,
        promoValue,
        scheduledDate // Pass scheduled date
      );

      await createOrderItemsHandler(orderId, cartItems);
      await dispatch(clearCart());
      router.push(`/CustomerView/CheckOut/Confirm?orderId=${orderId}`);
    } catch (error) {
      alert("An error occurred while placing the order. Please try again.");
    }
  };

  return (
    <div>
      <NavBarCheckOut />
      <HomeDirectionLink />
      <Container
        fluid
        className="px-3 px-md-5 py-5"
        style={{ marginTop: "24px" }}
      >
        <div className="navBar text-center mb-5">
          <h1>Shipping Information</h1>
        </div>
        <Row>
          <DetailForm
            pickup={pickup}
            setPickup={setPickup}
            setRecipientDetails={setRecipientDetails}
            customerProfile={customerProfile}
            recipientDetails={recipientDetails}
            setScheduledDate={setScheduledDate} // Pass setScheduledDate to form
          />
        </Row>
        <Row className="w-100 justify-content-center">
          <div style={{ borderTop: "1px solid #03588C " }}>
            <OrderSummary />
          </div>
        </Row>
        <Row className="w-100 justify-content-center">
          <div style={{ borderTop: "1px solid #90B4CE " }}>
            <AddPayment
              pickup={pickup}
              fees={fees}
              setPromoValue={setPromoValue}
            />
          </div>
        </Row>
        <Row
          className="w-100 justify-content-center"
          style={{ marginTop: "24px" }}
        >
          <PrimaryButton
            icon={PaymentIcon}
            onClick={handlePlaceOrder}
            disabled={cartItems.length === 0}
            text="Pay Now"
          />
        </Row>
      </Container>
    </div>
  );
};

export default Checkout;
