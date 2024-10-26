import React, { useState, useEffect } from "react";
import { Container, Row, Form } from "react-bootstrap";
import NavBarCheckOut from "./_NavBarCheckOut";
import HomeDirectionLink from "../HomePage/HomeDirectionLink/HomeDirectionLink";
import OrderSummary from "./_itemSummary";
import AddPayment from "./_calculateFees";
import DetailForm from "./_recipientForm";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import PrimaryButton from "../ViewCart/_PrimaryButton";
import PaymentIcon from "@mui/icons-material/Payment";
import {
  checkIfCustomerExists,
  createCustomer,
  createOrder,
  createOrderDetail,
} from "../../../../store/slices/customerSlice";
import { clearCartItems } from "../../../../store/slices/cartSlice";

const Checkout = () => {
  const [pickup, setPickup] = useState(false);
  const [promoValue, setPromoValue] = useState(0);
  const [orderNote, setOrderNote] = useState(""); // State for order note
  const [scheduledDate, setScheduledDate] = useState(""); // State for scheduled delivery date
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
  const cartId = useSelector((state) => state.cart.cartId);
  const customerProfile = useSelector((state) => state.customer.profile);
  const customerId = customerProfile?.CUSTOMER_ID || null;

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

  const cartTotal =
    cartSubtotal + fees.reduce((acc, fee) => acc + fee.price, 0) - promoValue;

  const handlePlaceOrder = async () => {
    if (cartSubtotal < 200) {
      Swal.fire({
        icon: "warning",
        title: "Minimum Order Requirement",
        text: "Order must be at least $200 to proceed.",
        confirmButtonText: "OK",
      });
      return;
    }

    // Prepare the order data to be passed to the Payment page
    const orderData = {
      cartSubtotal,
      cartTotal,
      deliveryFee: 6.99,
      serviceFee: 2.99,
      recipientDetails,
      pickup,
      promoValue,
      orderNote,
      cartItems,
    };

    // Navigate to the Payment page with the order data as query params
    router.push({
      pathname: "/CustomerView/Payment",
      query: { ...orderData },
    });
  };

  const handleCreateQuoteOrder = async () => {
    try {
      // Create Quote Order without going through Payment
      const finalCustomerId = customerId; // Use existing customer ID if available

      const orderPayload = {
        CUSTOMER_ID: finalCustomerId,
        RECIPIENT: recipientDetails.name,
        ADDRESS: recipientDetails.address,
        PHONE: recipientDetails.contact,
        EMAIL: recipientDetails.email,
        SUBTOTAL: cartSubtotal,
        TOTAL: cartTotal,
        DELIVERY_FEE: 6.99,
        SERVICE_FEE: 2.99,
        PROMO: promoValue,
        NOTES: orderNote,
        STATUS: "Quote",
      };

      const orderResponse = await dispatch(createOrder(orderPayload)).unwrap();
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

      await dispatch(clearCartItems({ customerId: finalCustomerId, cartId }));
      router.push(`/CustomerView/CheckOut/Confirm?orderId=${orderId}`);
    } catch (error) {
      Swal.fire(
        "Error",
        "An error occurred while creating the quote. Please try again.",
        "error"
      );
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
            setScheduledDate={setScheduledDate}
          />
        </Row>
        <Row className="w-100 justify-content-center my-4">
          <Form.Group>
            <Form.Label>Add a Note to Your Order</Form.Label>
            <Form.Control
              as="textarea"
              className="form-control"
              rows={3}
              placeholder="Add any special instructions or notes here..."
              value={orderNote}
              style={{ border: "1px solid #ecbf9c " }}
              onChange={(e) => setOrderNote(e.target.value)}
            />
          </Form.Group>
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
        <Row
          className="w-100 justify-content-center"
          style={{ marginTop: "24px" }}
        >
          <PrimaryButton
            variant="inverted"
            onClick={handleCreateQuoteOrder}
            disabled={cartItems.length === 0}
            text="Create Quote"
          />
        </Row>
      </Container>
    </div>
  );
};

export default Checkout;
