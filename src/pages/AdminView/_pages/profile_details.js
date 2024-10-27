import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateCustomer } from "../../../../store/slices/customerSlice";
import styles from "../../../styles/styles";

const CustomerProfileDetails = ({ customerData, setOpen }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    CUSTOMER_NAME: customerData?.CUSTOMER_NAME || "",
    CUSTOMER_EMAIL: customerData?.CUSTOMER_EMAIL || "",
    // other fields...
  });

  const [showSaveBtn, setShowSaveBtn] = useState(false);

  useEffect(() => {
    if (customerData) {
      setFormData({
        CUSTOMER_NAME: customerData.CUSTOMER_NAME,
        CUSTOMER_EMAIL: customerData.CUSTOMER_EMAIL,
        // other fields...
      });
    }
  }, [customerData]);

  const handleChange = (field, value) => {
    setShowSaveBtn(true);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        updateCustomer({
          customerId: customerData.CUSTOMER_ID,
          updatedData: formData,
        })
      );
      setShowSaveBtn(false);
      setOpen(false);
    } catch (error) {
      console.error("Error updating customer:", error);
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
              value={formData.CUSTOMER_EMAIL}
              onChange={(e) => handleChange("CUSTOMER_EMAIL", e.target.value)}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      {showSaveBtn && (
        <Button type="submit" className={`${styles.btn} mt-3 align-self-end`}>
          Save
        </Button>
      )}
    </Form>
  );
};

export default CustomerProfileDetails;
