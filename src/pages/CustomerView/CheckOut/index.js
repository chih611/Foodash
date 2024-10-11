import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container, Row, Col, Button } from "react-bootstrap";
import NavBarCheckOut from "./_NavBarCheckOut";
import HomeDirectionLink from "../HomePage/HomeDirectionLink/HomeDirectionLink";
import OrderSummary from "./_itemSummary";
import AddPayment from "./_calculateFees";
import DetailForm from "./_recipientForm";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../../../../store/actions/orderAction"; // Import actions
import { createOrderDetail } from "../../../../store/actions/orderDetailAction";
import { ContactlessOutlined } from "@mui/icons-material";
const Checkout = () => {
  const [pickup, setPickup] = useState(false);
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  // Fetch the necessary data from your Redux store or state
  const cartItems = useSelector((state) => state.cart.cartItems);
  const customerProfile = useSelector((state) => state.customer.profile);
  const customerId = customerProfile?.CUSTOMER_ID || null;

  // Example of fees and total logic
  const deliveryFee = 6.99;
  const serviceFee = 2.99;
  const utensil = 1.99;
  const giftWrap = 5.5;
  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const cartTotal =
    cartSubtotal + deliveryFee + serviceFee + utensil + giftWrap;

  const createOrderHandler = async (
    customerId,
    customerProfile,
    cartSubtotal,
    cartTotal,
    deliveryFee,
    serviceFee,
    utensil,
    giftWrap,
    pickup
  ) => {
    try {
      // Construct the order payload
      const orderPayload = {
        CUSTOMER_ID: customerId,
        DUEDATE: new Date().toISOString().split("T")[0], // You can customize the date
        RECIPIENT: `${customerProfile.FIRST_NAME} ${customerProfile.LAST_NAME}`,
        ADDRESS: customerProfile.ADDRESS,
        PHONE: customerProfile.PHONE_NUMBER,
        EMAIL: customerProfile.EMAIL,
        DELIVER: pickup ? 0 : 1, // 0 for pickup, 1 for delivery
        PAYMENT: "Credit",
        TAXES: 10, // Example taxes
        DELIVERY_FEE: deliveryFee,
        SERVICE_FEE: serviceFee,
        UTENSIL: utensil,
        GIFTWRAP: giftWrap,
        PROMO: 0, // You can handle promo logic here
        SUBTOTAL: cartSubtotal,
        ORDER_ITEM_ID: null, // This will be filled in by the order details
        CREATED_DATE: new Date().toISOString().split("T")[0],
        TOTAL: cartTotal,
        NOTES: "Please deliver ASAP", // You can customize the notes
        STATUS: "pending", // Set the order status
      };

      console.log("Order Payload:", orderPayload);

      // Step 1: Create the order and wait for it to complete
      const orderResponse = await dispatch(
        createOrder({ orderData: orderPayload })
      ).unwrap();

      // Get the returned ORDER_ID from the response
      const orderId = orderResponse.ORDER_ID; // Ensure the API returns the new ORDER_ID

      // Check if the orderId is valid
      if (!orderId) {
        throw new Error("Failed to create order: ORDER_ID not returned");
      }

      console.log("Order ID obtained:", orderId); // Debugging

      return orderId; // Return the ORDER_ID
    } catch (error) {
      console.error("Error creating the order:", error);
      throw error; // Throw the error to handle it in the main function
    }
  };

  const createOrderItemsHandler = async (orderId, cartItems) => {
    try {
      // Step 2: Create the order details
      const orderDetailPromises = cartItems.map(async (item) => {
        console.log("OrderId :" + orderId);
        const orderDetailPayload = {
          ORDER_ID: orderId,
          UNIT_PRICE: item.price,
          TOTAL: item.price * item.quantity,
          QUANTITY: item.quantity,
          LABEL_ID: item.labelId, // Assuming you have this in your items
          NOTES: item.notes, // If available
          ITEM_ID: item.itemId,
        };

        console.log("Order Detail Payload:", orderDetailPayload); // Debugging

        return dispatch(createOrderDetail(orderDetailPayload)).unwrap();
      });

      // Wait for all order details to be created
      await Promise.all(orderDetailPromises);

      console.log("Order items created successfully");
    } catch (error) {
      console.error("Error creating the order items:", error);
      throw error; // Throw the error to handle it in the main function
    }
  };

  const handlePlaceOrder = async () => {
    try {
      // Step 1: Create the order and obtain the order ID
      const orderId = await createOrderHandler(
        customerId,
        customerProfile,
        cartSubtotal,
        cartTotal,
        deliveryFee,
        serviceFee,
        utensil,
        giftWrap,
        pickup
      );

      // Step 2: Create the order items using the obtained order ID
      await createOrderItemsHandler(orderId, cartItems);

      // Step 3: Redirect to a success page or confirmation page
    } catch (error) {
      console.error("Error placing the order:", error);
      alert("An error occurred while placing the order. Please try again.");
    }
  };

  return (
    <div>
      <NavBarCheckOut />
      <HomeDirectionLink />
      <div>
        <Container
          fluid
          className="px-3 px-md-5 py-5"
          style={{ marginTop: "24px" }}
        >
          <div
            className="navBar text-center mb-5"
            style={{ marginBottom: "150px" }}
          >
            <h1>Shipping Information</h1>
          </div>

          {/* Mobile View */}
          <div className="d-flex justify-content-center ">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12624.53948738401!2d145.03831394999997!3d-37.71651195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sau!4v1726732205221!5m2!1sen!2sau"
              width="400"
              height="300"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ borderRadius: "50px", border: "0" }}
            ></iframe>
          </div>

          <div className="d-flex justify-content-center  my-5 mx-4">
            <DetailForm pickup={pickup} setPickup={setPickup} />
          </div>

          {/* Order Summary Section */}
          <div
            className="d-flex align-items-center  my-5 mx-4"
            style={{ borderTop: "1px solid #03588C " }}
          >
            <OrderSummary />
          </div>

          {/* Payment Method Section */}
          <div
            className="d-flex justify-content-center  my-4 mx-4"
            style={{ borderTop: "1px solid #90B4CE " }}
          >
            <AddPayment pickup={pickup} />
          </div>

          {/* Pay Now Button */}
          <Row
            className="w-100 justify-content-center"
            style={{ marginTop: "24px" }}
          >
            <Col xs={12}>
              <Button
                variant="primary"
                className="w-100"
                onClick={handlePlaceOrder}
              >
                Pay Now
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Checkout;
