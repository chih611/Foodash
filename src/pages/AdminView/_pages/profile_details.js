import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createCustomer,
  fetchCustomerById,
} from "../../../../store/slices/customerSlice";
import styles from "../../../styles/styles";
import CustomInput from "../_components/input";

const CustomerProfileDetails = ({ setOpen, selectedId }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCustomerById(selectedId));
  }, []);
  let data = useSelector((state) => state.customer.profileDetail);
  const statusFetching = useSelector((state) => state.customer.status);
  const readOnlyFields = ["LAST_NAME"];
  const dateTimeFields = ["DATE_OF_BIRTH"];
  const handleChange = (field, value) => {
    // setFormData((prev) => ({ ...prev, [field]: value }));
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
      <Form.Group as={Row} className="" controlId="orderForm">
        {Object.entries(data || {}).map(([key, value], index) => (
          <Col md={6}>
            <CustomInput
              title={key || "-"}
              value={value || "-"}
              index={index}
              readOnlyFields={readOnlyFields}
              dateTimeFields={dateTimeFields}
              statusFetching={statusFetching}
              handleChange={handleChange}
            />
          </Col>
        ))}
      </Form.Group>
      <Button type="submit" className={`${styles.btn} mt-3 align-self-end`}>
        Create Customer
      </Button>
    </Form>
  );
};

export default CustomerProfileDetails;
