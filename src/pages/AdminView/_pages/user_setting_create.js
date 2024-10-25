import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createAdmin } from "../../../../store/slices/adminSlice";
import styles from "../../../styles/styles";

const UserSettingCreate = ({ setOpen }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    ADMIN_NAME: "",
    ADMIN_EMAIL: "",
    ADMIN_PASSWORD: "",
    ADMIN_TYPE: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createAdmin(formData));
      alert("Admin created successfully!");
      setOpen(false); // Close the modal after successful creation
    } catch (error) {
      console.error("Error creating admin:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="adminName">
            <Form.Label>Admin Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter admin name"
              value={formData.ADMIN_NAME}
              onChange={(e) => handleChange("ADMIN_NAME", e.target.value)}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="adminEmail">
            <Form.Label>Admin Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter admin email"
              value={formData.ADMIN_EMAIL}
              onChange={(e) => handleChange("ADMIN_EMAIL", e.target.value)}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="adminPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={formData.ADMIN_PASSWORD}
              onChange={(e) => handleChange("ADMIN_PASSWORD", e.target.value)}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="adminType">
            <Form.Label>Admin Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter admin type (e.g., Super Admin)"
              value={formData.ADMIN_TYPE}
              onChange={(e) => handleChange("ADMIN_TYPE", e.target.value)}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group as={Row} className="d-flex justify-content-end">
        <Col>
          <Button type="submit" className={`${styles.btn} mt-3 align-self-end`}>
            Create Admin
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default UserSettingCreate;
