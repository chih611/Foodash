import { Accordion, Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  fetchOrderList,
  updateOrderViewById,
} from "../../../../store/actions/orderAction";
import styles from "../../../styles/styles";
import {
  fetchAdminItemByDetailId,
  fetchModifications,
} from "../../../../store/actions/itemAction";
import { createModification } from "../../../../store/slices/itemsSlice";
import CustomInput from "../_components/input";
import CustomDropBox from "../_components/dropbox";

const ProductDetails = ({
  Id,
  setOpen,
  customTableColor,
  extraReadOnlyFields,
}) => {
  const dateTimeFields = ["Expiry date"];
  const readOnlyFields = ["ID"];
  extraReadOnlyFields && readOnlyFields.push(...extraReadOnlyFields);

  const [showSaveBtn, setShowSaveBtn] = useState(false);
  const optionsData = [
    { 1: "EAT" },
    { 2: "FOOD" },
    { 3: "DRINK" },
    { 4: "COFFEE" },
  ];

  const [modificationData, setModificationData] = useState({
    itemId: Id,
    modification: "",
    ingredients: "",
    labelId: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdminItemByDetailId(Id));
    dispatch(fetchModifications(Id));
  }, [Id, dispatch]);

  const dataItems = useSelector((state) => state.items.itemDetail) || [];
  const dataMods = useSelector((state) => state.items.modAdminDetail);
  const status = useSelector((state) => state.items.status) || "idle";

  // Update modification data
  const handleModificationChange = (field, value) => {
    setModificationData((prevData) => ({
      ...prevData,
      [field]: value,
      itemId: Id 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Save Modification button clicked");
  
    // Your existing code
    try {
      console.log("Modification data before submiting:", modificationData);  
      await dispatch(createModification(modificationData));
      console.log("Modification data submitted:", modificationData);  
      setModificationData({
        itemId: Id,
        modification: "",
        ingredients: "",
        labelId: "",
      });
    } catch (error) {
      console.error("Error creating modification:", error);
    }
  };

  

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Accordion defaultActiveKey={["0"]} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Product Detail</Accordion.Header>
            <Accordion.Body>
              <Form.Group as={Row} className="" controlId="orderForm">
                {dataItems.map((datum) =>
                  Object.entries(datum || {}).map(([key, value], index) => (
                    <React.Fragment key={`${key}-${index}`}>
                      <Col md={6}>
                        <CustomInput
                          title={key || "-"}
                          value={value || "-"}
                          index={index}
                          readOnlyFields={readOnlyFields}
                          dateTimeFields={dateTimeFields}
                          statusFetching={status}
                          handleChange={(val) => handleModificationChange(key, val)}
                        />
                      </Col>
                    </React.Fragment>
                  ))
                )}
              </Form.Group>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        
        {/* Modifications Accordion */}
        <Accordion defaultActiveKey="1" alwaysOpen>
          {dataMods &&
            dataMods.map((datum, pIndex) => (
              <Accordion.Item eventKey={pIndex} key={pIndex}>
                <Accordion.Header>Modification {datum.ModID}</Accordion.Header>
                <Accordion.Body>
                  {Object.entries(datum || {}).map(([key, value], index) => (
                    <Form.Group as={Row} key={`${key}-${index}`} className="" controlId="modForm">
                      <Col md={6}>
                        <CustomInput
                          title={key || "-"}
                          value={value || "-"}
                          index={index}
                          readOnlyFields={readOnlyFields}
                          dateTimeFields={dateTimeFields}
                          statusFetching={status}
                          handleChange={(val) => handleModificationChange(key, val)}
                        />
                      </Col>
                    </Form.Group>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            ))}
        </Accordion>

        {/* New Modification Form */}
        <Accordion defaultActiveKey="2" alwaysOpen>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Add New Modification</Accordion.Header>
            <Accordion.Body>
              <Form.Group as={Row} controlId="newModificationForm">
                <Col md={6}>
                  <CustomInput
                    title="Modification"
                    value={modificationData.modification}
                    handleChange={(val) => handleModificationChange("modification", val)}
                  />
                </Col>
                <Col md={6}>
                  <CustomInput
                    title="Ingredients"
                    value={modificationData.ingredients}
                    handleChange={(val) => handleModificationChange("ingredients", val)}
                  />
                </Col>
                <Col md={6}>
                  <CustomDropBox
                    title="Label ID"
                    value={modificationData.labelId}
                    optionsData={optionsData}
                    handleChange={(val) => handleModificationChange("labelId", val)}
                  />
                </Col>
              </Form.Group>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Form.Group as={Row} controlId="formPlaintextEmail">
          <Col className="mb-3 d-flex flex-column">
            <Button
              type="submit"
              className={`${styles.btn} mt-3 align-self-end`}
            >
              Save Modification
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};

export default ProductDetails;
