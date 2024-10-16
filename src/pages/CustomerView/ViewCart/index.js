import React, { useEffect } from "react";
import Link from "next/link";
import { Container, Row, Col, Button } from "react-bootstrap";
import ClearIcon from "@mui/icons-material/Clear";
import PrimaryButton from "./_PrimaryButton";
import NavBarCheckOut from "../CheckOut/_NavBarCheckOut";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import PaymentIcon from "@mui/icons-material/Payment";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartByCustomerId,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCartItems,
} from "../../../../store/slices/cartSlice";
import { useRouter } from "next/router";
import QuantityInputField from "./_QuantityInputContainer";

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

  const handleRemoveItem = (itemId, extras, labels, note) => {
    console.log("Removing item with note:", note);
    dispatch(removeFromCart({ customerId, itemId, extras, labels, note }));
  };

  const handleIncreaseQuantity = (itemId, extras, labels, note) => {
    console.log("Increase quantity", itemId, extras, labels, note);
    dispatch(increaseQuantity({ customerId, itemId, extras, labels, note }));
  };

  const handleClearCart = () => {
    dispatch(clearCartItems({ customerId, cartId }));
  };

  const handleDecreaseQuantity = (itemId, extras, labels, note) => {
    console.log("Decreasing quantity for:", itemId, extras, labels, note);

    const currentItem = cartItems.find((item) => {
      const extrasMatch =
        JSON.stringify(item.extras) === JSON.stringify(extras);
      const labelsMatch =
        JSON.stringify(item.labels) === JSON.stringify(labels);
      const notesMatch = (item.notes || "").trim() === (note || "").trim();
      return item.itemId === itemId && extrasMatch && labelsMatch && notesMatch;
    });

    if (currentItem) {
      if (currentItem.quantity === 1) {
        dispatch(removeFromCart({ customerId, itemId, extras, labels, note }));
      } else {
        dispatch(
          decreaseQuantity({ customerId, itemId, extras, labels, note })
        );
      }
    }
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

  const total = cartItems
    .filter((item) => item !== null)
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <Container className="view-cart-container">
      <NavBarCheckOut />
      <h2>Your Cart</h2>
      <h2 className="view-cart-header">
        {cartItems.length} Items – Total: ${total}
      </h2>

      {cartItems.map((item, index) => (
        <Row className="view-cart-item" key={`${item.itemId}-${index}`}>
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
                    onClick={() =>
                      handleRemoveItem(
                        item.itemId,
                        item.extras,
                        item.labels,
                        item.notes
                      )
                    }
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
                  onIncrease={() =>
                    handleIncreaseQuantity(
                      item.itemId,
                      item.extras,
                      item.labels,
                      item.notes
                    )
                  }
                  onDecrease={() =>
                    handleDecreaseQuantity(
                      item.itemId,
                      item.extras,
                      item.labels,
                      item.notes
                    )
                  }
                />
              </Col>
              <Col xs={2}>
                <h4 className="item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </h4>
              </Col>
            </Row>
            <Row>
              <p>Variety:</p>
              <ul>
                {Object.entries(item.extras)
                  .filter(([key, value]) => value)
                  .map(([key, value]) => (
                    <li key={key}>{key}</li>
                  ))}
              </ul>
            </Row>
            <Row>
              <p>
                Label:{" "}
                {item.labels // Only display the labels
                  ? item.labels
                  : "No labels selected"}
              </p>
            </Row>

            <Row>
              <p>notes: {item.notes}</p>
            </Row>
          </Col>
        </Row>
      ))}
      <Row className="view-cart-footer">
        <Col xs={5}>
          <PrimaryButton
            icon={ClearAllIcon}
            variant="red"
            text="Clear Cart"
            onClick={handleClearCart}
          />
        </Col>
        <Col xs={7}>
          <PrimaryButton
            text="Proceed to Checkout"
            icon={PaymentIcon}
            onClick={() => router.push("/CustomerView/CheckOut")}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ViewCart;
