import React, { useState, useEffect } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  increaseQuantity,
} from "../../../../store/slices/cartSlice";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PrimaryButton from "../ViewCart/_PrimaryButton";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const ItemModification = () => {
  // Access selectedItem from Redux
  const { cartItems } = useSelector((state) => state.cart);
  const selectedItem = useSelector((state) => state.items.selectedItem);
  const selectedItemModifications = useSelector(
    (state) => state.items.selectedItemModifications
  );
  const customerProfile = useSelector((state) => state.customer.profile);
  const customerId = customerProfile?.CUSTOMER_ID || null;
  const dispatch = useDispatch();
  const router = useRouter();

  // Local state for extras and notes
  const [extras, setExtras] = useState({});
  const [note, setNote] = useState("");

  // Set modifications into the state when selectedItemModifications is available
  useEffect(() => {
    if (selectedItemModifications.length > 0) {
      const initialExtrasState = selectedItemModifications.reduce(
        (acc, mod) => {
          acc[mod.MODIFICATION] = false; // Set each modification to false initially
          return acc;
        },
        {}
      );
      setExtras(initialExtrasState); // Initialize the extras state with modifications
    }
  }, [selectedItemModifications]); // Run this when selectedItemModifications changes

  // Ensure selectedItem is available
  if (!selectedItem) {
    return (
      <Container className="py-5 item-modification-container">
        <Row>
          <Col>
            <h2>No item selected</h2>
            <Link href="/CustomerView/HomePage/">Go back to home</Link>
          </Col>
        </Row>
      </Container>
    );
  }

  // Handle checkbox changes for extras
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setExtras((prevExtras) => ({
      ...prevExtras,
      [name]: checked, // Update the checked state for the modification
    }));
  };

  // Handle note input changes
  const handleNoteChange = (e) => {
    setNote(e.target.value); // Trimming note on input change
  };

  // Calculate the total price based on extras
  const calculateTotal = () => {
    const basePrice = selectedItem ? selectedItem.UNIT_PRICE || 13.5 : 13.5;
    const extrasCost = Object.keys(extras).reduce(
      (total, extra) => (extras[extra] ? total + 0 : total), // Add $3 for each selected extra
      0
    );
    return basePrice + extrasCost;
  };

  // Add the item to the cart or increase its quantity
  const handleAddToCart = () => {
    const modifiedItem = {
      itemId: selectedItem.ITEM_ID,
      itemName: selectedItem.ITEM_NAME,
      price: calculateTotal(),
      quantity: 1,
      extras: extras,
      notes: note.trim(), // Ensure the note is trimmed
      totalPrice: calculateTotal(),
    };

    console.log("Modified item:", modifiedItem); // Debugging log

    // Helper function to sort the keys of an object
    const sortObjectKeys = (obj) => {
      return Object.keys(obj)
        .sort()
        .reduce((result, key) => {
          result[key] = obj[key];
          return result;
        }, {});
    };

    // Find if the same item with the same extras and notes exists in the cart
    const existingItem = cartItems.find(
      (item) =>
        item.itemId === modifiedItem.itemId &&
        JSON.stringify(sortObjectKeys(item.extras)) ===
          JSON.stringify(sortObjectKeys(modifiedItem.extras)) && // Compare extras
        (item.notes || "").trim() === modifiedItem.notes
    );

    if (existingItem) {
      // If the item exists, dispatch increaseQuantity
      console.log("Increasing quantity for:", existingItem.itemId);
      dispatch(
        increaseQuantity({
          customerId,
          itemId: existingItem.itemId,
          extras: existingItem.extras,
          note: existingItem.notes,
        })
      );
    } else {
      // If the item doesn't exist, dispatch addToCart
      console.log("Adding new item to cart:", modifiedItem);
      dispatch(addToCart({ customerId, item: modifiedItem }));
    }

    // Navigate to cart view after adding the item
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
              src={selectedItem.image || "/birthdaycake_cate.jpg"}
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
          <h2>Variety</h2>
          {selectedItemModifications
            ? selectedItemModifications.map((mod, index) => (
                <Row key={index} className="extra-checkbox-row">
                  <Col xs={3} className="d-flex align-items-center">
                    <label htmlFor={mod.MODIFICATION} className="custom-label">
                      <Row className="extra-item-name">{mod.MODIFICATION}</Row>
                      <br></br>
                    </label>
                  </Col>
                  <Col xs={8} />
                  <Col xs={1} className="d-flex align-items-center">
                    <input
                      type="checkbox"
                      id={mod.MODIFICATION}
                      name={mod.MODIFICATION}
                      checked={extras[mod.MODIFICATION]}
                      onChange={handleCheckboxChange}
                      className="custom-checkbox"
                    />
                  </Col>
                </Row>
              ))
            : "No modifications available"}
        </Col>
      </Row>

      {/* Note Section */}
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

      {/* Add to Cart Button */}
      <Row className="my-4">
        <PrimaryButton
          variant="primary"
          onClick={handleAddToCart}
          icon={Inventory2OutlinedIcon}
          text={`Add 1 to cart - $${calculateTotal().toFixed(2)}`}
        />
      </Row>
    </Container>
  );
};

export default ItemModification;
