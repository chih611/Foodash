import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import QuantityInputField from "./QuantityInputContainer";
import ClearIcon from "@mui/icons-material/Clear";
import PrimaryButton from "./PrimaryButton";
import NavBarCheckOut from "../CheckOut/NavBarCheckOut";
import Inventory2Outlined from "@mui/icons-material/Inventory2Outlined";
const ViewCart = () => {
  // Initial state for items
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Glazed Honey & Mustard Ham",
      category: 12,
      quantity: 2,
      price: 13.5,
    },
    {
      id: 2,
      name: "Glazed Honey & Mustard Ham",
      category: 12,
      quantity: 2,
      price: 13.5,
    },
    {
      id: 3,
      name: "Glazed Honey & Mustard Ham",
      category: 12,
      quantity: 2,
      price: 13.5,
    },
    {
      id: 4,
      name: "Glazed Honey & Mustard Ham",
      category: 12,
      quantity: 2,
      price: 13.5,
    },
  ]);

  // Calculate subtotal
  const subtotal = items
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  // Function to handle quantity increase
  const increaseQuantity = (itemId) => {
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setItems(updatedItems);
  };

  // Function to handle quantity decrease
  const decreaseQuantity = (itemId) => {
    const updatedItems = items.map((item) =>
      item.id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setItems(updatedItems);
  };

  // Function to remove an item from the cart
  const removeItem = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  };

  return (
    <Container className="view-cart-container">
      <NavBarCheckOut />

      <h2>Your Cart</h2>
      <h2 className="view-cart-header">
        {items.length} Items – Total: ${subtotal}
      </h2>

      {items.map((item) => (
        <Row className="view-cart-item" key={item.id}>
          <Col xs={2} className="view-cart-item-image"></Col>
          <Col xs={10} className="view-cart-item-details">
            <Row>
              <Col xs={10}>
                <h4 className="item-name">{item.name}</h4>
              </Col>
              <Col xs={2}>
                <Button
                  variant="link"
                  onClick={() => removeItem(item.id)}
                  className="remove-item-button"
                >
                  <ClearIcon
                    className="remove-item-icon"
                    style={{ color: "094067" }}
                  />
                </Button>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>Categories: {item.category}</Col>
              <Col xs={6}></Col>
              <Col xs={2}>
                <a href="#" className="save-for-later">
                  Save for later
                </a>
              </Col>
            </Row>
            <Row>
              <Col xs={3}>
                <QuantityInputField
                  quantity={item.quantity}
                  onIncrease={() => increaseQuantity(item.id)}
                  onDecrease={() => decreaseQuantity(item.id)}
                />
              </Col>
              <Col xs={7}></Col>
              <Col xs={2}>
                <h4 className="item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </h4>
              </Col>
            </Row>
          </Col>
        </Row>
      ))}

      <div className="view-cart-footer">
        <Button variant="link" className="add-items">
          + Add items
        </Button>
        <InputGroup className="additional-notes mt-3">
          <FormControl placeholder="Add notes" className="add-notes-input" />
        </InputGroup>
        <div className="options mt-3">
          <p className="option-item">Send as a gift</p>
          <p className="option-item">Request utensils, etc.</p>
        </div>
        <Row className="subtotal-checkout mt-4">
          <Col xs={6} className="text-left">
            <h3 className="subtotal-text">Subtotal: ${subtotal}</h3>
          </Col>
          <Col xs={6} className="text-right">
            <PrimaryButton
              text="Check out now"
              icon={Inventory2Outlined} // Pass the icon component
            />{" "}
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default ViewCart;
