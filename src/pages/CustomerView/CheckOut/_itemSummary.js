import React from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../../../store/slices/cartSlice";
import QuantityInputField from "../ViewCart/QuantityInputContainer";
import ClearIcon from "@mui/icons-material/Clear";

const OrderSummary = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const customerProfile = useSelector((state) => state.customer.profile);
  const customerId = customerProfile?.CUSTOMER_ID || null;
  const dispatch = useDispatch();

  const handleRemoveItem = (itemId, extras, labels, note) => {
    dispatch(removeFromCart({ customerId, itemId, extras, labels, note }));
  };

  const handleIncreaseQuantity = (itemId, extras, labels, note) => {
    dispatch(increaseQuantity({ customerId, itemId, extras, labels, note }));
  };

  const handleDecreaseQuantity = (itemId, extras, labels, note) => {
    const currentItem = cartItems.find((item) => {
      const extrasMatch =
        JSON.stringify(item.extras) === JSON.stringify(extras);
      const labelsMatch = item.labels === labels;
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

  return (
    <div>
      <h4 className="my-3">Order Summary</h4>
      <div className="d-flex mx-3">
        <p className="subtitle mx-3">
          {cartItems ? cartItems.length : 0} items
        </p>
      </div>

      {cartItems && cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <Row
            className="w-100 d-flex my-3 align-items-center"
            key={`${item.itemId}-${index}`}
          >
            <Col xs={4}>
              <p className=" me-5 mt-3">{item.itemName}</p>
            </Col>
            <Col xs={4}>
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
            <Col xs={4}>
              <ClearIcon
                className="remove-item-icon"
                style={{ color: "#094067" }}
                onClick={() =>
                  handleRemoveItem(
                    item.itemId,
                    item.extras,
                    item.labels,
                    item.notes
                  )
                }
              />
            </Col>

            <Col xs={12} style={{ paddingLeft: "1.5rem" }}>
              {/* Display extras (without bullet points) */}
              <p className="subtitle me-5 mt-3  mb-1">Variety:</p>
              <ul style={{ listStyleType: "none", paddingLeft: "1rem" }}>
                {Object.entries(item.extras)
                  .filter(([key, value]) => value)
                  .map(([key]) => (
                    <li key={key} style={{ marginBottom: "0.25rem" }}>
                      {key}
                    </li>
                  ))}
              </ul>
            </Col>

            <Col xs={12} style={{ paddingLeft: "1.5rem" }}>
              {/* Display labels with indentation */}
              <p className="subtitle me-5 mt-3  mb-1">Labels:</p>
              <p
                className="subtitle "
                style={{ paddingLeft: "1rem", margin: 0 }}
              >
                {item.labels || "No labels selected"}
              </p>
            </Col>

            <Col xs={12} style={{ paddingLeft: "1.5rem" }}>
              {/* Display notes with indentation */}
              <p className="subtitle me-5 mt-3  mb-1">Notes:</p>
              <p
                className="subtitle "
                style={{ paddingLeft: "1rem", margin: 0 }}
              >
                {item.notes || "None"}
              </p>
            </Col>
          </Row>
        ))
      ) : (
        <>
          <p>No items in cart</p>
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
            >
              Create my first order
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default OrderSummary;
