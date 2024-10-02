import React, { useEffect } from "react";
import Link from "next/link";
import { Container, Row, Col, Button } from "react-bootstrap";
import QuantityInputField from "./QuantityInputContainer";
import ClearIcon from "@mui/icons-material/Clear";
import PrimaryButton from "./PrimaryButton";
import NavBarCheckOut from "../CheckOut/_NavBarCheckOut";
import Inventory2Outlined from "@mui/icons-material/Inventory2Outlined";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartByCustomerId,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCartItems,
} from "../../../../store/slices/cartSlice";
import { useRouter } from "next/router";

const ViewCart = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    cartItems = [],
    cartId,
    status,
    error,
  } = useSelector((state) => state.cart);
  const customerProfile = useSelector((state) => state.customer.profile);
  const customerId = customerProfile?.CUSTOMER_ID || null;

  useEffect(() => {
    if (customerId) {
      dispatch(fetchCartByCustomerId(customerId)).then((action) => {
        if (action.payload) {
          console.log("Cart Items fetched:", action.payload);
        }
      });
    } else {
      console.log("No customerId available, managing cart locally");
    }
  }, [customerId, dispatch]);

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart({ customerId, itemId }));
  };

  const handleIncreaseQuantity = (itemId) => {
    console.log("Increase quantity", itemId);
    dispatch(increaseQuantity({ customerId, itemId }));
  };

  const handleClearCart = () => {
    dispatch(clearCartItems({ customerId, cartId }));
  };

  const handleDecreaseQuantity = (itemId) => {
    if (
      cartItems.find((item) => item.itemId === itemId).quantity === 1 &&
      cartItems.length === 1
    ) {
      dispatch(clearCartItems({ customerId, cartId }));
      return;
    } else if (
      cartItems.find((item) => item.itemId === itemId).quantity === 1
    ) {
      dispatch(removeFromCart({ customerId, itemId }));
      return;
    }

    dispatch(decreaseQuantity({ customerId, itemId }));
  };

  if (status === "loading") {
    return <p>Loading your cart...</p>;
  }

  if (cartItems.length === 0) {
    return (
      <Container className="view-cart-container">
        <NavBarCheckOut />
        <p>You don't have any items in your cart</p>
        <Link href="/CustomerView/HomePage">
          <button
            style={{
              color: "#025373",
              textDecoration: "underline",
              cursor: "pointer",
              background: "none",
              border: "none",
              padding: "0",
            }}
            onClick={() => router.push("/CustomerView/HomePage")}
          >
            Create my first order
          </button>
        </Link>
      </Container>
    );
  }

  // Calculate total locally
  const total = cartItems
    .filter((item) => item !== null) // Ensure null items are filtered out
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <Container className="view-cart-container">
      <NavBarCheckOut />
      <h2>Your Cart</h2>
      <h2 className="view-cart-header">
        {cartItems.length} Items – Total: ${total}
      </h2>

      {cartItems.map((item) => (
        <Row className="view-cart-item" key={item.itemId}>
          <Col xs={2} className="view-cart-item-image"></Col>
          <Col xs={10} className="view-cart-item-details">
            <Row>
              <Col xs={10}>
                <h4 className="item-name">{item.itemName}</h4>
              </Col>
              <Col xs={2}>
                <Button variant="link" className="remove-item-button">
                  <ClearIcon
                    className="remove-item-icon"
                    style={{ color: "094067" }}
                    onClick={() => handleRemoveItem(item.itemId)}
                  />
                </Button>
              </Col>
            </Row>
            <Row>
              <Col xs={10}>Categories: {item.category}</Col>
              <Col xs={2}>
                <a href="#" className="save-for-later">
                  Save for later
                </a>
              </Col>
            </Row>
            <Row>
              <Col xs={10}>
                <QuantityInputField
                  quantity={item.quantity}
                  onIncrease={() => handleIncreaseQuantity(item.itemId)}
                  onDecrease={() => handleDecreaseQuantity(item.itemId)}
                />
              </Col>
              <Col xs={2}>
                <h4 className="item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </h4>
              </Col>
            </Row>
          </Col>
        </Row>
      ))}
      <PrimaryButton text="Clear Cart" onClick={handleClearCart} />
    </Container>
  );
};

export default ViewCart;
