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
import { useForm, FormProvider } from "react-hook-form";
import Swal from "sweetalert2";
import ChatBot from "../ChatBot/ChatBot";

const Checkout = () => {
  const [pickup, setPickup] = useState(false);
  const [promoValue, setPromoValue] = useState(0);
  const [orderNote, setOrderNote] = useState(""); // State for order note
  const [scheduledDate, setScheduledDate] = useState(""); // State for scheduled delivery date

  const dispatch = useDispatch();
  const router = useRouter();

  // React Hook Form setup
  const methods = useForm({
    defaultValues: {
      name: "",
      address: "",
      contact: "",
      email: "",
      scheduledDate: "",
    },
  });

  const {
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = methods;

  // Fetch customer profile and cart items from Redux store
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartId = useSelector((state) => state.cart.cartId);
  const customerProfile = useSelector((state) => state.customer.profile);
  const customerId = customerProfile?.CUSTOMER_ID || null;

  useEffect(() => {
    if (customerProfile) {
      reset({
        name: `${customerProfile.FIRST_NAME || ""} ${
          customerProfile.LAST_NAME || ""
        }`,
        address: customerProfile.ADDRESS || "",
        contact: customerProfile.PHONE_NUMBER || "",
        email: customerProfile.EMAIL || "",
      });
    }
  }, [customerProfile, reset]);

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

  const checkCustomerId = async (recipientDetails) => {
    let finalCustomerId = customerId;

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
        if (error.response?.status === 404) {
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
  };

  const createOrderHandler = async (
    finalCustomerId,
    data,
    status = "Pending"
  ) => {
    const orderPayload = {
      CUSTOMER_ID: finalCustomerId,
      DUEDATE:
        scheduledDate ||
        data.scheduledDate ||
        new Date().toISOString().split("T")[0],
      RECIPIENT: data.name,
      ADDRESS: data.address,
      PHONE: data.contact,
      EMAIL: data.email,
      DELIVER: pickup ? 0 : 1,
      PAYMENT: "Credit",
      TAXES: 10,
      DELIVERY_FEE: fees.find((fee) => fee.id === 1)?.price || 0,
      SERVICE_FEE: fees.find((fee) => fee.id === 2)?.price || 0,
      UTENSIL: fees.find((fee) => fee.id === 3)?.price || 0,
      GIFTWRAP: fees.find((fee) => fee.id === 4)?.price || 0,
      PROMO: promoValue,
      SUBTOTAL: cartSubtotal,
      TOTAL: cartTotal,
      NOTES: orderNote,
      STATUS: status,
    };

    const orderResponse = await dispatch(
      createOrder({ orderData: orderPayload })
    ).unwrap();
    return orderResponse.ORDER_ID;
  };

  const createOrderItemsHandler = async (orderId) => {
    for (const item of cartItems) {
      const orderDetailPayload = {
        ORDER_ID: orderId,
        UNIT_PRICE: item.price,
        TOTAL: item.price * item.quantity,
        QUANTITY: item.quantity,
        ITEM_ID: item.itemId,
        NOTES: item.notes,
      };
      await dispatch(createOrderDetail(orderDetailPayload)).unwrap();
    }
  };

  const handleFormSubmission = async (data, status) => {
    if (cartSubtotal < 200) {
      Swal.fire({
        icon: "warning",
        title: "Minimum Order Requirement",
        text: "Order must be at least $200 to proceed.",
        confirmButtonText: "Return",
      });
      return;
    }

    try {
      const finalCustomerId = await checkCustomerId(data);
      const orderId = await createOrderHandler(finalCustomerId, data, status);
      await createOrderItemsHandler(orderId);

      if (status === "Pending") {
        router.push({
          pathname: "/CustomerView/Payment",
          query: { orderId },
        });
      } else {
        router.push(`/CustomerView/CheckOut/Confirm?orderId=${orderId}`);
      }
    } catch (error) {
      console.error("An error occurred while creating the order:", error);
    }
  };

  return (
    <div>
      <NavBarCheckOut />
      <HomeDirectionLink />
      <Container fluid className="px-3 px-md-5 py-5">
        <div className="navBar text-center mb-5">
          <h1>Shipping Information</h1>
        </div>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit((data) =>
              handleFormSubmission(data, "Pending")
            )}
          >
            <Row>
              <DetailForm pickup={pickup} setPickup={setPickup} />
            </Row>
            <Row className="w-100 justify-content-center my-4">
              <Form.Group>
                <Form.Label>Add a Note to Your Order</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Add any special instructions or notes here..."
                  value={orderNote}
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
            <Row className="w-100 justify-content-center mt-4">
              <PrimaryButton
                icon={PaymentIcon}
                text="Pay Now"
                onClick={handleSubmit((data) =>
                  handleFormSubmission(data, "Pending")
                )}
              />
            </Row>
            <Row className="w-100 justify-content-center mt-4">
              <PrimaryButton
                variant="inverted"
                text="Create Quote"
                onClick={handleSubmit((data) =>
                  handleFormSubmission(data, "Quote")
                )}
              />
            </Row>
          </form>
        </FormProvider>
        <ChatBot />
      </Container>
    </div>
  );
};

export default Checkout;
