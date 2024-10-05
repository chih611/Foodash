import React, { useState } from "react";
import Link from "next/link";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Button,
  Offcanvas,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../../../store/slices/cartSlice";
import QuantityInputField from "../ViewCart/QuantityInputContainer";
import ArrowDropDownOutlined from "@mui/icons-material/ArrowDropDownOutlined"; //dropdown arrow
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined"; //add item +
import RemoveCircleOutlineOutlined from "@mui/icons-material/RemoveCircleOutlineOutlined"; //remove item -
import CloseOutlined from "@mui/icons-material/CloseOutlined"; // delete item x

const OrderSummary = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const customerProfile = useSelector((state) => state.customer.profile);
  const customerId = customerProfile?.CUSTOMER_ID || null;
  const dispatch = useDispatch();
  const handleToggle = () => setShowOffcanvas(!showOffcanvas);

  const handleRemoveItem = (itemId, extras, note) => {
    console.log("Removing item with note:", note);
    dispatch(removeFromCart({ customerId, itemId, extras, note }));
  };

  const handleIncreaseQuantity = (itemId, extras, note) => {
    console.log("Increase quantity", itemId, extras, note);
    dispatch(increaseQuantity({ customerId, itemId, extras, note }));
  };

  const handleClearCart = () => {
    dispatch(clearCartItems({ customerId, cartId }));
  };

  const handleDecreaseQuantity = (itemId, extras, note) => {
    console.log("Decreasing quantity for:", itemId, extras, note); // Debugging log

    // Find the specific item by itemId, extras, and note
    const currentItem = cartItems.find((item) => {
      const extrasMatch =
        JSON.stringify(item.extras) === JSON.stringify(extras);
      const notesMatch = (item.notes || "").trim() === (note || "").trim();
      return item.itemId === itemId && extrasMatch && notesMatch;
    });

    // If the item exists, handle decreasing or removing it based on its quantity
    if (currentItem) {
      if (currentItem.quantity === 1) {
        // If quantity is 1, remove the item
        dispatch(removeFromCart({ customerId, itemId, extras, note }));
      } else {
        // Otherwise, decrease the quantity
        dispatch(decreaseQuantity({ customerId, itemId, extras, note }));
      }
    }
  };

  return (
    <div>
      <div></div>
      <h4 className="my-3">Order Summary</h4>
      <div className="d-flex mx-3">
        <p className="subtitle mx-3">
          {cartItems ? cartItems.length : 0} items
        </p>
        <ArrowDropDownOutlined />
      </div>

      {cartItems ? (
        cartItems.map((item) => (
          <Row className="w-100 d-flex my-3 align-items-center">
            <Col xs={4}>
              <p className="subtitle me-5 mt-3">{item.itemName}</p>
            </Col>
            <Col xs={4}>
              <QuantityInputField
                quantity={item.quantity}
                onIncrease={() =>
                  handleIncreaseQuantity(item.itemId, item.extras, item.notes)
                }
                onDecrease={() =>
                  handleDecreaseQuantity(item.itemId, item.extras, item.notes)
                }
              />
            </Col>
            <Col xs={4}>
              <button>
                <CloseOutlined className=" ms-5" />
              </button>
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
              onClick={() => router.push("/CustomerView/HomePage")}
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
