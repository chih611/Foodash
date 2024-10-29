import React, { useState, useEffect } from "react";
import { Container, Row, Form } from "react-bootstrap";
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
import { clearCartItems } from "../../../../store/slices/cartSlice";
import PaymentIcon from "@mui/icons-material/Payment";
import PrimaryButton from "../ViewCart/_PrimaryButton";
import Swal from "sweetalert2";

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

  console.log("Cart Items: " + cartItems);

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

  const retryWithBackoff = async (fn, retries = 3, delay = 500) => {
    try {
      return await fn();
    } catch (error) {
      if (retries > 0 && error.code === "ER_LOCK_DEADLOCK") {
        console.warn(`Deadlock detected, retrying in ${delay}ms...`);
        await new Promise((res) => setTimeout(res, delay));
        return retryWithBackoff(fn, retries - 1, delay * 2); // Exponential backoff
      }
      throw error; // Throw if max retries reached or other error
    }
  };

  const serializeExtras = (extras) => {
    return JSON.stringify(
      Object.keys(extras)
        .sort()
        .reduce((result, key) => {
          result[key] = extras[key];
          return result;
        }, {})
    );
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
    status = "Pending" // default status for normal orders
  ) => {
    try {
      const orderPayload = {
        CUSTOMER_ID: finalCustomerId,
        DUEDATE: scheduledDate || new Date().toISOString().split("T")[0], // Use scheduled date or today's date
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
        NOTES: orderNote,
        STATUS: status,
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
      // Iterate over each cart item sequentially
      for (const item of cartItems) {
        const orderDetailPayload = {
          ORDER_ID: orderId,
          UNIT_PRICE: item.price,
          TOTAL: item.price * item.quantity,
          QUANTITY: item.quantity,
          LABEL_ID: item.labelId,
          NOTES: item.notes,
          ITEM_ID: item.itemId,
          MODIFICATION: serializeExtras(item.extras),
        };

        // Await each retryWithBackoff call before moving to the next item
        await retryWithBackoff(() =>
          dispatch(createOrderDetail(orderDetailPayload)).unwrap()
        );
      }
    } catch (error) {
      throw error;
    }
  };

  const handlePlaceOrder = async () => {
    console.log("Cart Subtotal:", cartSubtotal); // Log for debugging

    if (cartSubtotal < 200) {
      Swal.fire({
        icon: "warning",
        title: "Minimum Order Requirement",
        text: "Order must be at least $200 to proceed.",
        confirmButtonText: "OK",
      });
      return; // Stop further execution
    }

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
        promoValue
      );

      await createOrderItemsHandler(orderId, cartItems);

      // Navigate to the Payment page with orderId and order details
      router.push({
        pathname: "/CustomerView/Payment",
        query: {
          orderId,
          cartSubtotal,
          cartTotal,
          deliveryFee,
          serviceFee,
          recipientDetails: JSON.stringify(recipientDetails),
          pickup,
          promoValue,
          orderNote,
          cartItems: JSON.stringify(cartItems),
        },
      });
    } catch (error) {
      Swal.fire(
        "Error",
        "An error occurred while creating the order. Please try again.",
        "error"
      );
    }
  };

  const handleCreateQuoteOrder = async () => {
    try {
      console.log("Creating quote order with the following details:");
      console.log("Cart Subtotal:", cartSubtotal);
      console.log("Recipient Details:", recipientDetails);
      console.log("Pickup:", pickup);

      if (cartSubtotal < 200) {
        Swal.fire({
          icon: "warning",
          title: "Minimum Order Requirement",
          text: "Order must be at least $200 to proceed.",
          confirmButtonText: "OK",
        });
        return; // Stop further execution
      }

      const finalCustomerId = await checkCustomerId(recipientDetails);
      console.log("Final Customer ID:", finalCustomerId); // Log Customer ID

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
        "Quote" // Status set to "Quote"
      );

      await createOrderItemsHandler(orderId, cartItems);

      await dispatch(clearCartItems({ customerId: finalCustomerId, cartId }));

      router.push(`/CustomerView/CheckOut/Confirm?orderId=${orderId}`);
    } catch (error) {
      console.error("Error creating quote order:", error); // Log the error
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
            setScheduledDate={setScheduledDate} // Pass down setScheduledDate
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
