import React, { useState, useEffect } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  increaseQuantity,
} from "../../../../store/slices/cartSlice";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import HomeDirectionLink from "../HomePage/HomeDirectionLink/HomeDirectionLink";
import PrimaryButton from "../ViewCart/_PrimaryButton";
import HomePageNavBar from "../HomePage/HomePageNavBar";
import Image from "next/image";
import Link from "next/link";
import ChatBot from "../ChatBot/ChatBot";
import { useRouter } from "next/router";

const ItemModification = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const selectedItem = useSelector((state) => state.items.selectedItem);
  const selectedItemModifications = useSelector(
    (state) => state.items.selectedItemModifications
  );
  const categories = useSelector((state) => state.category.categories);
  const customerProfile = useSelector((state) => state.customer.profile);
  const customerId = customerProfile?.CUSTOMER_ID || null;
  const optionLabels = useSelector((state) => state.items.labels);
  const dispatch = useDispatch();
  const router = useRouter();

  // Local state for extras, selected label, and note
  const [extras, setExtras] = useState({});
  const [selectedLabels, setSelectedLabels] = useState({
    labelId: null,
    labelName: "",
  });
  const [note, setNote] = useState("");

  //Parse the Item image
  const getItemImageSrc = () => {
    try {
      if (!selectedItem?.PICTURE) {
        return "/birthdaycake_cate.jpg";
      }

      // Clean the URL if it has a base64 prefix
      const cleanUrl = selectedItem.PICTURE.replace(
        "data:image/png;base64,",
        ""
      );

      // Return Cloudinary URL directly if it exists
      if (cleanUrl.includes("cloudinary.com")) {
        return cleanUrl;
      }

      // For local images
      return `http://localhost:8080${cleanUrl}`;
    } catch (error) {
      console.error("Error getting image source:", error);
      return "/birthdaycake_cate.jpg";
    }
  };

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
  }, [selectedItemModifications]);

  // Set up labels in state when optionLabels is available
  useEffect(() => {
    if (optionLabels.length > 0) {
      const initialLabelsState = optionLabels.reduce((acc, label) => {
        acc[label.LABEL_NAME] = false;
        return acc;
      }, {});
      setSelectedLabels(initialLabelsState);
    }
  }, [optionLabels]);

  // Handle checkbox changes for extras
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setExtras((prevExtras) => ({
      ...prevExtras,
      [name]: checked, // Update the checked state for the modification
    }));
  };

  // Handle checkbox changes for labels (single choice behavior)
  const handleLabelCheckboxChange = (e, label) => {
    const { name, checked } = e.target;
    if (checked) {
      setSelectedLabels({
        labelId: label.LABEL_ID,
        labelName: name,
      });
    } else {
      setSelectedLabels({
        labelId: null,
        labelName: "",
      });
    }
  };

  // Determine the category of the item
  const itemCategory = categories.find(
    (category) => category.CATEGORY_ID === selectedItem.CATEGORY_ID
  );

  // Handle note input changes
  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  // Calculate the total price based on extras
  const calculateTotal = () => {
    const basePrice = selectedItem ? selectedItem.UNIT_PRICE || 13.5 : 13.5;
    const extrasCost = Object.keys(extras).reduce(
      (total, extra) => (extras[extra] ? total + 0 : total),
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
      labelId: selectedLabels.labelId,
      labels: selectedLabels.labelName,
      notes: note.trim(),
      totalPrice: calculateTotal(),
    };

    const sortObjectKeys = (obj) => {
      return Object.keys(obj || {})
        .sort()
        .reduce((result, key) => {
          result[key] = obj[key];
          return result;
        }, {});
    };

    const existingItem = cartItems.find(
      (item) =>
        item.itemId === modifiedItem.itemId &&
        JSON.stringify(sortObjectKeys(item.extras)) ===
          JSON.stringify(sortObjectKeys(modifiedItem.extras)) &&
        JSON.stringify(sortObjectKeys(item.labels)) ===
          JSON.stringify(sortObjectKeys(modifiedItem.labels)) &&
        (item.notes || "").trim() === modifiedItem.notes
    );

    if (existingItem) {
      dispatch(
        increaseQuantity({
          customerId,
          itemId: existingItem.itemId,
          extras: existingItem.extras,
          labels: existingItem.labels,
          note: existingItem.notes,
        })
      );
    } else {
      dispatch(addToCart({ customerId, item: modifiedItem }));
    }

    router.push("/CustomerView/ViewCart");
  };

  // Breadcrumb navigation for category link
  const categoryId = selectedItem?.CATEGORY_ID;
  const categoryName = itemCategory ? itemCategory.CATEGORY_NAME : "Category";

  return (
    <Container className="py-5 item-modification-container">
      <HomePageNavBar />
      <Row>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link className="breadcrumb-item" href="/CustomerView/HomePage/">
                Home
              </Link>
            </li>
            <span className="breadcrumb-separator"> &gt; </span>
            <li className="breadcrumb-item">
              <Link
                className="breadcrumb-item"
                href={`/CustomerView/HomePage?category=${categoryId}`}
                onClick={() => {
                  router.push(`/CustomerView/HomePage?category=${categoryId}`);
                }}
              >
                {categoryName}
              </Link>
            </li>
            <span className="breadcrumb-separator"> &gt; </span>
            <li className="breadcrumb-item active" aria-current="page">
              {selectedItem.ITEM_NAME || "Selected Item"}
            </li>
          </ol>
        </nav>
      </Row>

      {/* Product Image & Info */}
      <Row className="my-4 mx-2">
        <Col xs={12} md={4} lg={6} className="text-center">
          <div
            style={{
              width: "100%",
              maxWidth: "342px",
              height: "342px",
              backgroundColor: "#e0e0e0",
              borderRadius: "100%",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Image
              src={getItemImageSrc()}
              alt={selectedItem.ITEM_NAME}
              layout="fill"
            />
          </div>
        </Col>
        <Col xs={12} md={8} lg={6}>
          <p className="name_tag">{selectedItem.ITEM_NAME}</p>

          <div className="my-2">
            {selectedItem.LABELS
              ? selectedItem.LABELS.map((label, index) => (
                  <Badge pill key={index} className="badge me-2">
                    {label}
                  </Badge>
                ))
              : " "}
          </div>

          <div className="my-4">
            <h4>${selectedItem.UNIT_PRICE || 13.5} / pack</h4>
          </div>

          <h3 className="product-title">Mix and Match</h3>
          <div className="variety-container">
            {selectedItemModifications
              ? selectedItemModifications.map((mod, index) => (
                  <Row key={index} className="extra-checkbox-row ">
                    <Col xs={10} className="d-flex align-items-center">
                      <label
                        htmlFor={mod.MODIFICATION}
                        className="custom-label"
                      >
                        <Row className="extra-item-name">
                          Option {index + 1}: {mod.MODIFICATION}
                        </Row>
                      </label>
                    </Col>
                    <Col xs={2} className="d-flex">
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
              : "Standard box only"}
          </div>
        </Col>
      </Row>

      {/* Extras Section */}
      {/* <Row className="my-4 mx-2">
        <Col>
          <h3 className="product-title">Variety</h3>
          <div className="variety-container">
            {selectedItemModifications
              ? selectedItemModifications.map((mod, index) => (
                  <Row key={index} className="extra-checkbox-row ">
                    <Col xs={3} className="d-flex align-items-center">
                      <label
                        htmlFor={mod.MODIFICATION}
                        className="custom-label"
                      >
                        <Row className="extra-item-name">
                        Option {index + 1}: {mod.MODIFICATION}
                        </Row>
                      </label>
                    </Col>
                    <Col xs={3} />
                    <Col xs={3} className="d-flex">
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
          </div>
        </Col>
      </Row> */}

      {/* Labels for Dietary Section */}
      <Row className="my-4 mx-2">
        <Col>
          <h3 className="product-title ">Dietary Preferences</h3>
          <div className="variety-container">
            {optionLabels
              ? optionLabels
                  .filter((label) => label.LABEL_NAME !== "croissant_labels")
                  .map((label, index) => (
                    <Row key={index}>
                      <Col xs={3}>
                        <label
                          htmlFor={label.LABEL_NAME}
                          className="custom-label"
                        >
                          <Row className="extra-item-name">
                            {label.LABEL_NAME}
                          </Row>
                        </label>
                      </Col>
                      <Col xs={6} />
                      <Col xs={3}>
                        <input
                          type="checkbox"
                          id={label.LABEL_NAME}
                          name={label.LABEL_NAME}
                          checked={
                            selectedLabels.labelName === label.LABEL_NAME
                          }
                          onChange={(e) => handleLabelCheckboxChange(e, label)}
                          className="custom-checkbox"
                        />
                      </Col>
                    </Row>
                  ))
              : "No labels available"}
          </div>
        </Col>
      </Row>

      {/* Note Section */}
      <Row className="my-4 mx-2">
        <Col>
          <h2>Special Notes</h2>
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
      <Row className="my-4 ">
        <PrimaryButton
          variant="primary"
          onClick={handleAddToCart}
          icon={Inventory2OutlinedIcon}
          text={`Add 1 to cart - $${calculateTotal().toFixed(2)}`}
          style={{ width: "100%" }}
        />
      </Row>
      <ChatBot />
    </Container>
  );
};

export default ItemModification;
