import { Button, Col, Form, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CustomInput from "../_components/input";
import CustomDropBox from "../_components/dropbox";
import { updateAdminProfile } from "../../../../store/slices/adminSlice";
import styles from "../../../styles/styles";

const UserSettingDetails = ({ adminData, setAdminChanges }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    ADMIN_NAME: adminData?.ADMIN_NAME || "",
    ADMIN_EMAIL: adminData?.ADMIN_EMAIL || "",
    ADMIN_TYPE: adminData?.ADMIN_TYPE || "",
  });
  const [showSaveBtn, setShowSaveBtn] = useState(false);

  useEffect(() => {
    if (adminData) {
      setFormData({
        ADMIN_ID: adminData.ADMIN_ID,
        ADMIN_NAME: adminData.ADMIN_NAME,
        ADMIN_EMAIL: adminData.ADMIN_EMAIL,
        ADMIN_TYPE: adminData.ADMIN_TYPE,
      });
    }
  }, [adminData]);

  const handleChange = (field, value) => {
    setShowSaveBtn(true); // Show save button when there are changes
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Admin Data to be sent:", formData);
      // Dispatch the update action with the new form data
      await dispatch(
        updateAdminProfile({
          id: formData.ADMIN_ID,
          updatedData: formData,
        })
      );
      setShowSaveBtn(false); // Hide save button after successful update
    } catch (error) {
      console.error("Error updating admin:", error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <CustomInput
              title="Admin Name"
              value={formData.ADMIN_NAME}
              readOnlyFields={["ADMIN_ID"]}
              handleChange={(field, value) => handleChange("ADMIN_NAME", value)}
            />
          </Col>
          <Col md={6}>
            <CustomInput
              title="Admin Email"
              value={formData.ADMIN_EMAIL}
              readOnlyFields={["ADMIN_ID"]}
              handleChange={(field, value) =>
                handleChange("ADMIN_EMAIL", value)
              }
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <CustomInput
              title="Admin Type"
              value={formData.ADMIN_TYPE}
              readOnlyFields={["ADMIN_ID"]}
              handleChange={(field, value) => handleChange("ADMIN_TYPE", value)}
            />
          </Col>
        </Row>

        {showSaveBtn ? (
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Col className="mb-3 d-flex flex-column">
              <Button
                type="submit"
                className={`${styles.btn} mt-3 align-self-end`}
              >
                Save
              </Button>
            </Col>
          </Form.Group>
        ) : null}
      </Form>
    </>
  );
};

export default UserSettingDetails;
