import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createCustomer } from "../../../../store/slices/customerSlice";
import styles from "../../../styles/styles";

const CustomerProfileCreate = ({ setOpen }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    CUSTOMER_NAME: "",
    CUSTOMER_EMAIL: "",
    // other fields...
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createCustomer(formData));
      setOpen(false);
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="customerName">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter customer name"
              value={formData.CUSTOMER_NAME}
              onChange={(e) => handleChange("CUSTOMER_NAME", e.target.value)}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="customerEmail">
            <Form.Label>Customer Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter customer email"
              value={formData.CUSTOMER_EMAIL}
              onChange={(e) => handleChange("CUSTOMER_EMAIL", e.target.value)}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Button type="submit" className={`${styles.btn} mt-3 align-self-end`}>
        Create Customer
      </Button>
    </Form>
  );
};

export default CustomerProfileCreate;
