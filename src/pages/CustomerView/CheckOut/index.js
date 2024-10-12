import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import NavBarCheckOut from "./_NavBarCheckOut";
import HomeDirectionLink from "../HomePage/HomeDirectionLink/HomeDirectionLink";
import OrderSummary from "./_itemSummary";
import AddPayment from "./_calculateFees";
import DetailForm from "./_recipientForm";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../../../../store/actions/orderAction"; // Import actions
import { createOrderDetail } from "../../../../store/actions/orderDetailAction";
import {
  checkIfCustomerExists,
  createCustomer,
} from "../../../../store/slices/customerSlice"; // Updated import
import PaymentIcon from "@mui/icons-material/Payment";
import PrimaryButton from "../ViewCart/PrimaryButton";

const Checkout = () => {
  const [pickup, setPickup] = useState(false);
  const [promoValue, setPromoValue] = useState(0); // Promo value state
  const [recipientDetails, setRecipientDetails] = useState({
    name: "",
    address: "",
    contact: "",
    email: "", // Added email to recipient details
  }); // Recipient details state

  const dispatch = useDispatch();
  const router = useRouter();

  // Fetch the necessary data from your Redux store or state
  const cartItems = useSelector((state) => state.cart.cartItems);
  const customerProfile = useSelector((state) => state.customer.profile); // Check for logged-in customer
  const customerId = customerProfile?.CUSTOMER_ID || null;

  // Example of fees and total logic
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

  // Function to get or create customer ID
  const checkCustomerId = async (recipientDetails) => {
    try {
      let finalCustomerId = customerId; // Use logged-in customer ID if available

      if (!finalCustomerId) {
        // Check if no customer is logged in (i.e., guest checkout)
        try {
          const existingCustomer = await checkIfCustomerExists(
            "user", // Checking for user first
            recipientDetails.email,
            recipientDetails.contact
          );

          if (existingCustomer?.data) {
            finalCustomerId = existingCustomer.data.CUSTOMER_ID;
            console.log(
              "Existing customer found, using customerId:",
              finalCustomerId
            );
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
            console.log("Customer not found, creating a new guest customer...");

            // Create the guest customer if not found
            const guestCustomerData = {
              firstName: recipientDetails.name.split(" ")[0],
              lastName: recipientDetails.name.split(" ")[1] || "",
              email: recipientDetails.email || null, // Email from recipient details
              phoneNumber: recipientDetails.contact || null, // Phone number from recipient details
              address: recipientDetails.address || null,
              customerType: "guest", // Set as guest
            };

            const newCustomerResponse = await dispatch(
              createCustomer(guestCustomerData)
            ).unwrap();

            finalCustomerId = newCustomerResponse.customerId; // Ensure we use the customerId returned from backend
          } else {
            console.error("Error checking for customer:", error);
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
    promoValue // Pass promoValue if you have one
  ) => {
    try {
      // Construct the order payload
      const orderPayload = {
        CUSTOMER_ID: finalCustomerId,
        DUEDATE: new Date().toISOString().split("T")[0], // You can customize the date
        RECIPIENT: recipientDetails.name,
        ADDRESS: recipientDetails.address,
        PHONE: recipientDetails.contact,
        EMAIL: recipientDetails.email,
        DELIVER: pickup ? 0 : 1, // 0 for pickup, 1 for delivery
        PAYMENT: "Credit",
        TAXES: 10, // Example taxes
        DELIVERY_FEE: deliveryFee,
        SERVICE_FEE: serviceFee,
        UTENSIL: utensil,
        GIFTWRAP: giftWrap,
        PROMO: promoValue, // Promo value
        SUBTOTAL: cartSubtotal,
        ORDER_ITEM_ID: null, // This will be filled in by the order details
        CREATED_DATE: new Date().toISOString().split("T")[0],
        TOTAL: cartTotal,
        NOTES: "Please deliver ASAP", // You can customize the notes
        STATUS: "Pending", // Set the order status
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
      // Step 1: Get or create customer ID
      const finalCustomerId = await checkCustomerId(recipientDetails);

      // Step 2: Create the order and obtain the order ID
      const orderId = await createOrderHandler(
        finalCustomerId,
        cartSubtotal,
        cartTotal,
        deliveryFee,
        serviceFee,
        utensil,
        giftWrap,
        recipientDetails, // Pass the form input here
        pickup,
        promoValue // Pass promo value here
      );

      // Step 3: Create the order items using the obtained order ID
      await createOrderItemsHandler(orderId, cartItems);

      // Step 4: Redirect to a success page or confirmation page
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
          <div className="navBar text-center mb-5">
            <h1>Shipping Information</h1>
          </div>
          <Row>
            <DetailForm
              pickup={pickup}
              setPickup={setPickup}
              setRecipientDetails={setRecipientDetails} // Pass setRecipientDetails to DetailForm
              customerProfile={customerProfile} // Pass customerProfile to DetailForm
              recipientDetails={recipientDetails} // Pass recipientDetails to DetailForm
            />
          </Row>

          {/* Order Summary Section */}
          <Row className="w-100 justify-content-center">
            <div style={{ borderTop: "1px solid #03588C " }}>
              <OrderSummary />
            </div>
          </Row>

          {/* Payment Method Section */}
          <Row className="w-100 justify-content-center">
            <div style={{ borderTop: "1px solid #90B4CE " }}>
              <AddPayment
                pickup={pickup}
                fees={fees}
                setPromoValue={setPromoValue}
              />
            </div>
          </Row>

          {/* Pay Now Button */}
          <Row
            className="w-100 justify-content-center"
            style={{ marginTop: "24px" }}
          >
            <PrimaryButton
              icon={PaymentIcon}
              onClick={handlePlaceOrder}
              disabled={cartItems.length === 0}
              text="Pay Now"
            ></PrimaryButton>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Checkout;
