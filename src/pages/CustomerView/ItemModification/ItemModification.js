import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Badge } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";

const ItemModification = () => {
  const [extras, setExtras] = useState({
    Bacon: false,
    Ham: false,
    Egg: false,
    Tomatoes: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setExtras((prevExtras) => ({
      ...prevExtras,
      [name]: checked,
    }));
  };

  const calculateTotal = () => {
    const basePrice = 13.5;
    const extrasCost = Object.keys(extras).reduce(
      (total, extra) => (extras[extra] ? total + 3 : total),
      0
    );
    return basePrice + extrasCost;
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
                Club House Sandwich
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
            {/* Image Placeholder */}
          </div>
        </Col>
        <Col xs={12} md={6} lg={6}>
          <h2 className="product-title">Club House Sandwich</h2>

          {/* Tagging */}
          <div className="my-2">
            <div pill className="badge me-2">
              Quick food cooking
            </div>
            <div pill className="badge me-2">
              Processed Meats
            </div>
            <div pill className="badge me-2">
              Daily
            </div>
          </div>

          {/* Price Information */}
          <div className="my-3">
            <h4>$13.5 / pack</h4>
            <h4>$38.2 / 3 packs</h4>
          </div>
        </Col>
      </Row>

      {/* Extras Section - Custom Checkboxes */}
      <Row className="my-4">
        <Col>
          <h2>Extras</h2>
          {Object.keys(extras).map((extra, index) => (
            <Row key={index} className="extra-checkbox-row">
              <Col xs={3} className="d-flex align-items-center">
                <label htmlFor={extra} className="custom-label">
                  <Row className="extra-item-name"> {extra}</Row>

                  <Row>+ $3.00 </Row>
                </label>
              </Col>
              <Col xs={8} />
              <Col xs={1} className="d-flex align-items-center">
                <input
                  type="checkbox"
                  borderColor="#90B4CE"
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

      {/* Special Instructions */}
      <Row className="my-4">
        <Col>
          <h3>Special Instructions</h3>
          <Form.Group>
            <Form.Control as="textarea" className="instruction-area" rows={3} />
            <p>You may be charged for extras</p>
          </Form.Group>
        </Col>
      </Row>

      {/* Add to Cart */}
      <Row className="my-4">
        <Col>
          <Button className="w-100">
            Add 1 to cart - ${calculateTotal().toFixed(2)}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ItemModification;
