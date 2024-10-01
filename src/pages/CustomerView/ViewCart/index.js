import React, { useEffect } from "react";
import Link from "next/link";
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
import NavBarCheckOut from "../CheckOut/_NavBarCheckOut";
import Inventory2Outlined from "@mui/icons-material/Inventory2Outlined";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartByCustomerId,
  clearCart,
  addToCart,
} from "../../../../store/slices/cartSlice";
import { useRouter } from "next/router";

const ViewCart = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { cartItems = [], status, error } = useSelector((state) => state.cart); // Default to an empty array
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
      dispatch(clearCart());
      console.log("No customerId available, cart is cleared");
    }
  }, [customerId, dispatch]);

  const handleAddToCart = (item) => {
    dispatch(addToCart({ customerId, item }));
  };

  if (status === "loading") {
    return <p>Loading your cart...</p>;
  }

  if (!customerId || cartItems.length === 0) {
    return (
      <Container className="view-cart-container">
        <NavBarCheckOut />
        <p> You don't have any items in your cart</p>
        <Link href="/CustomerView/HomePage">
          {" "}
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
          </button>{" "}
        </Link>
      </Container>
    );
  }

  // Filter out null objects
  const filteredCartItems = cartItems.filter(
    (item) => item !== null && item !== undefined
  );

  const total = filteredCartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  // Function to handle increasing the item quantity
  const onIncrease = (itemId) => {
    const item = filteredCartItems.find((item) => item.itemId === itemId);
    if (item) {
      dispatch(addToCart({ ...item, quantity: 1 }));
    }
  };

  // Function to handle decreasing the item quantity
  const onDecrease = (itemId) => {
    const item = filteredCartItems.find((item) => item.itemId === itemId);
    if (item && item.quantity > 1) {
      dispatch(addToCart({ ...item, quantity: -1 }));
    }
  };

  return (
    <Container className="view-cart-container">
      <NavBarCheckOut />
      <h2>Your Cart</h2>
      <h2 className="view-cart-header">
        {filteredCartItems.length} Items – Total: ${total}
      </h2>

      {filteredCartItems.map((item) => (
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
                  onIncrease={() => onIncrease(item.itemId)}
                  onDecrease={() => onDecrease(item.itemId)}
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
    </Container>
  );
};

export default ViewCart;
