import React, { useState, useEffect } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  increaseQuantity,
} from "../../../../store/slices/cartSlice";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PrimaryButton from "../ViewCart/PrimaryButton";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const ItemModification = () => {
  // Access selectedItem from Redux
  const { cartItems } = useSelector((state) => state.cart);
  const selectedItem = useSelector((state) => state.items.selectedItem);
  const customerProfile = useSelector((state) => state.customer.profile);
  const customerId = customerProfile?.CUSTOMER_ID || null;
  const dispatch = useDispatch();
  const router = useRouter();

  // Local state for extras
  const [extras, setExtras] = useState({
    Bacon: false,
    Ham: false,
    Egg: false,
    Tomatoes: false,
  });
  const [note, setNote] = useState("");

  // Ensure selectedItem is available
  if (!selectedItem) {
    return (
      <Container className="py-5 item-modification-container">
        <Row>
          <Col>
            <h2>No item selected</h2>
            <Link href="/CustomerView/HomePage/HomePage">Go back to home</Link>
          </Col>
        </Row>
      </Container>
    );
  }

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setExtras((prevExtras) => ({
      ...prevExtras,
      [name]: checked,
    }));
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  // Calculate the total price
  const calculateTotal = () => {
    const basePrice = selectedItem ? selectedItem.PRICE || 13.5 : 13.5;
    const extrasCost = Object.keys(extras).reduce(
      (total, extra) => (extras[extra] ? total + 3 : total),
      0
    );
    return basePrice + extrasCost;
  };

  // Add the item to the cart
  const handleAddToCart = () => {
    const modifiedItem = {
      itemId: selectedItem.ITEM_ID, // Assuming ITEM_ID is the unique identifier for the item
      itemName: selectedItem.ITEM_NAME,
      price: calculateTotal(),
      quantity: 1,
      extras: extras,
      notes: note,
      totalPrice: calculateTotal(),
    };

    // Check if the item with the same itemId, extras, and note already exists in the cart
    const existingItem = cartItems.find(
      (item) =>
        item.itemId === modifiedItem.itemId &&
        JSON.stringify(item.extras) === JSON.stringify(modifiedItem.extras) &&
        (item.notes || "").trim() === (modifiedItem.notes || "").trim() // handle null or empty notes case
    );

    if (existingItem) {
      // If the item exists, increase the quantity
      dispatch(
        increaseQuantity({
          customerId,
          itemId: existingItem.itemId,
          extras: existingItem.extras,
          note: existingItem.notes,
        })
      );
    } else {
      // If the item doesn't exist, add it to the cart
      dispatch(addToCart({ customerId, item: modifiedItem }));
    }

    router.push("/CustomerView/ViewCart");
  };

  return (
    <Container className="py-5 item-modification-container">
      {/* Breadcrumb */}
      <Row>
        <Col>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/CustomerView/HomePage/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/platters">Platters</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {selectedItem.ITEM_NAME || "Selected Item"}
              </li>
            </ol>
          </nav>
        </Col>
      </Row>

      {/* Product Image & Info */}
      <Row className="my-4">
        <Col xs={12} md={6} lg={6} className="text-center">
          <div
            style={{
              width: "100%",
              maxWidth: "342px",
              height: "342px",
              backgroundColor: "#e0e0e0",
              borderRadius: "50%",
              position: "relative",
            }}
          >
            <Image
              src={selectedItem.image || ""}
              alt={selectedItem.ITEM_NAME}
              layout="fill"
            />
          </div>
        </Col>
        <Col xs={12} md={6} lg={6}>
          <h2 className="product-title">{selectedItem.ITEM_NAME}</h2>

          <div className="my-2">
            {selectedItem.LABELS
              ? selectedItem.LABELS.map((label, index) => (
                  <Badge pill key={index} className="badge me-2">
                    {label}
                  </Badge>
                ))
              : "No labels available"}
          </div>

          <div className="my-3">
            <h4>${selectedItem.UNIT_PRICE || 13.5} / pack</h4>
          </div>
        </Col>
      </Row>

      {/* Extras Section */}
      <Row className="my-4">
        <Col>
          <h2>Extras</h2>
          {Object.keys(extras).map((extra, index) => (
            <Row key={index} className="extra-checkbox-row">
              <Col xs={3} className="d-flex align-items-center">
                <label htmlFor={extra} className="custom-label">
                  <Row className="extra-item-name">{extra}</Row>
                  <Row>+ $3.00</Row>
                </label>
              </Col>
              <Col xs={8} />
              <Col xs={1} className="d-flex align-items-center">
                <input
                  type="checkbox"
                  id={extra}
                  name={extra}
                  checked={extras[extra]}
                  onChange={handleCheckboxChange}
                  className="custom-checkbox"
                />
              </Col>
            </Row>
          ))}
        </Col>
      </Row>

      <Row className="my-4">
        <Col>
          <h2>Note</h2>
          <textarea
            value={note}
            onChange={handleNoteChange}
            placeholder="Write a note..."
            className="form-control"
            rows="3"
          />
        </Col>
      </Row>
      {/* Add to Cart */}
      <Row className="my-4">
        <PrimaryButton
          onClick={handleAddToCart}
          icon={Inventory2OutlinedIcon}
          text={`Add 1 to cart - $${calculateTotal().toFixed(2)}`}
        />
      </Row>
    </Container>
  );
};

export default ItemModification;
