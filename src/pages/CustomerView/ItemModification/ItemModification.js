import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { addToCart } from "../../../../store/slices/cartSlice";
import { useDispatch } from "react-redux";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

import PrimaryButton from "../ViewCart/PrimaryButton";
import Image from "next/image";
import Link from "next/link";

const ItemModification = () => {
  // Access selectedItem from Redux
  const selectedItem = useSelector((state) => state.items.selectedItem);
  const dispatch = useDispatch();

  // Local state for extras
  const [extras, setExtras] = useState({
    Bacon: false,
    Ham: false,
    Egg: false,
    Tomatoes: false,
  });

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

  // Calculate the total price
  const calculateTotal = () => {
    const basePrice = selectedItem ? selectedItem.PRICE || 13.5 : 13.5;
    const extrasCost = Object.keys(extras).reduce(
      (total, extra) => (extras[extra] ? total + 3 : total),
      0
    );
    return basePrice + extrasCost;
  };

  const handleAddToCart = () => {
    const modifiedItem = {
      ...selectedItem,
      extras,
      totalPrice: calculateTotal(),
    };
    dispatch(addToCart(modifiedItem));
  };

  return (
    <Container className="py-5 item-modification-container">
      {/* Breadcrumb */}
      <Row>
        <Col>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/CustomerView/HomePage/HomePage">Home</Link>
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
            <h4>${selectedItem.PRICE || 13.5} / pack</h4>
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

      {/* Add to Cart */}
      <Row className="my-4">
        <Col>
          <PrimaryButton
            onClick={handleAddToCart}
            icon={Inventory2OutlinedIcon}
            text={`Add 1 to cart - ${calculateTotal().toFixed(2)}`}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ItemModification;
