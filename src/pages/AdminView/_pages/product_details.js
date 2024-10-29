import React, { useEffect, useState } from "react";
import { Accordion, Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminItemByDetailId,
  fetchModifications,
  fetchModificationsById,
} from "../../../../store/actions/itemAction";
import { createModification } from "../../../../store/slices/itemsSlice";
import CustomInput from "../_components/input";
import axios from "axios";
import moment from "moment";

const ProductDetails = ({
  Id,
  setOpen,
  customTableColor,
  extraReadOnlyFields,
  customAccordingColor,
}) => {
  const BASE_URL = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_ADDRESS;
  const dateTimeFields = ["Expiry date"];
  const readOnlyFields = ["ID", "LabelID", "ItemID", "ModID", "Label name"];
  extraReadOnlyFields && readOnlyFields.push(...extraReadOnlyFields);

  const optionsData = [
    { value: 1, label: "vegan" },
    { value: 4, label: "gluten-free" },
  ];

  const dispatch = useDispatch();
  const [modChanges, setModChanges] = useState();
  const [newModification, setNewModification] = useState({
    modification: "",
    ingredients: "",
    labelId: "",
  });
  const [modificationData, setModificationData] = useState({});
  const [showSaveBtn, setShowSaveBtn] = useState(false);

  useEffect(() => {
    dispatch(fetchAdminItemByDetailId(Id));
    dispatch(fetchModifications(Id));
  }, [Id, dispatch]);

  const dataItems = useSelector((state) => state.items.itemDetail) || [];
  const dataMods = useSelector((state) => state.items.modAdminDetail) || [];
  const status = useSelector((state) => state.items.status) || "idle";
  const oldModData = useSelector((state) => state.items.modDetailByModId);

  const compareEachValue = async (obj1, obj2) => {
    const differentProperties = {};

    // Loop through obj1 and compare values with obj2
    for (const key in obj1) {
      if (obj1.hasOwnProperty(key)) {
        if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
          differentProperties[key] = obj1[key];
        }
      }
    }

    // Check for properties in obj2 that are missing in obj1
    for (const key in obj2) {
      if (obj2.hasOwnProperty(key) && !obj1.hasOwnProperty(key)) {
        differentProperties[key] = obj2[key];
      }
    }

    return differentProperties;
  };

  // Save existing modification
  const saveModification = async (modId) => {
    const comparisonResults = await compareEachValue(modChanges, oldModData);
    console.log(comparisonResults);
    try {
      const response = await axios.put(
        `${BASE_URL}/item/update/modification/${modId}`,
        comparisonResults
      );
      console.log("Data updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // Submit new modification
  const onSubmit = async (e) => {
    e.preventDefault();
    const processedFormData = {
      ...newModification,
      ingredients: newModification.ingredients
        .split(",")
        .map((ingredient) => ingredient.trim())
        .filter((ingredient) => ingredient !== ""),
      itemId: Id,
    };

    console.log("New modification data to be saved:", processedFormData); // Debugging output

    try {
      await dispatch(createModification(processedFormData));
      setNewModification({ modification: "", ingredients: "", labelId: "" });
      dispatch(fetchModifications(Id));
    } catch (error) {
      console.error("Error creating modification:", error);
    }
  };

  const updateItemData = async (e) => {
    const comparisonResults = await compareEachValue(modChanges, dataItems);
    console.log(comparisonResults);
    const convetObject = {
      itemName: comparisonResults["Name"],
      quantity: comparisonResults["Quantity"],
      unitPrice: comparisonResults["Unit price"],
      category: comparisonResults["Category"],
      picture: comparisonResults["Picture"],
      description: comparisonResults["Description"],
      expDate: moment(comparisonResults["Expiry date"]).format("YYYY-MM-DD"),
      specialStt: comparisonResults["Special status"],
    };
    try {
      const response = await axios.put(
        `${BASE_URL}/item/update/${Id}`,
        convetObject
      );
      console.log("Data updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleChange = (field, value) => {
    setModChanges((prevChanges) => ({
      ...prevChanges,
      [field]: value,
    }));
  };

  const handleEnter = (modId) => {
    dispatch(fetchModificationsById(modId));
  };

  // console.log(modChanges);
  return (
    <Form onSubmit={onSubmit}>
      <Accordion defaultActiveKey="0" alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header className={customAccordingColor}>
            Product Detail
          </Accordion.Header>
          <Accordion.Body>
            <Form.Group as={Row} controlId="orderForm">
              {Object.entries(dataItems || {}).map(([key, value], index) => (
                <React.Fragment key={`${key}-${index}`}>
                  <Col md={6}>
                    <CustomInput
                      title={key || "-"}
                      value={value || "-"}
                      index={index}
                      readOnlyFields={readOnlyFields}
                      dateTimeFields={dateTimeFields}
                      statusFetching={status}
                      setShowSaveBtn={setShowSaveBtn}
                      handleChange={handleChange}
                    />
                  </Col>
                </React.Fragment>
              ))}
              {showSaveBtn && (
                <Col className="mb-3 d-flex flex-column">
                  <Button
                    type="submit"
                    className={`mt-3 align-self-end admin_bg_btn`}
                    onClick={(e) => {
                      updateItemData(e);
                    }}
                  >
                    Save Item
                  </Button>
                </Col>
              )}
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Accordion defaultActiveKey="1" alwaysOpen>
        {dataMods.map((datum) => (
          <Accordion.Item eventKey={`mod-${datum.ModID}`} key={datum.ModID}>
            <Accordion.Header className={customAccordingColor}>
              Modification {datum.ModID}
            </Accordion.Header>
            <Accordion.Body onEnter={() => handleEnter(datum.ModID)}>
              <Form.Group as={Row} controlId={`modification-${datum.ModID}`}>
                {Object.entries(datum || {}).map(([key, value]) => (
                  <Col md={6} key={key} className="mt-4">
                    <CustomInput
                      title={key || "-"}
                      value={
                        modificationData[datum.ModID]?.[key] || value || ""
                      }
                      readOnlyFields={readOnlyFields}
                      dateTimeFields={dateTimeFields}
                      statusFetching={status}
                      handleChange={handleChange}
                      setShowSaveBtn={setShowSaveBtn}
                    />
                  </Col>
                ))}
              </Form.Group>
              {showSaveBtn && (
                <Button
                  variant="primary"
                  className="mt-2"
                  onClick={() => saveModification(datum.ModID)}
                >
                  Save Changes
                </Button>
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <Accordion defaultActiveKey="2" alwaysOpen>
        <Accordion.Item eventKey="2">
          <Accordion.Header className={customAccordingColor}>
            Add New Modification
          </Accordion.Header>
          <Accordion.Body>
            <Form.Group as={Row} controlId="newModificationForm">
              <Col md={6}>
                <Form.Label>Modification</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter modification"
                  value={newModification.modification}
                  onChange={(e) =>
                    handleNewModificationChange("modification", e)
                  }
                />
              </Col>
              <Col md={6}>
                <Form.Label>Ingredients (comma-separated)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter ingredients"
                  value={newModification.ingredients}
                  onChange={(e) =>
                    handleNewModificationChange("ingredients", e)
                  }
                />
              </Col>
              <Col md={6}>
                <Form.Label>Label ID</Form.Label>
                <Form.Select
                  value={newModification.labelId}
                  onChange={(e) => handleNewModificationChange("labelId", e)}
                >
                  <option value="">Select Label</option>
                  {optionsData.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Form.Group as={Row} controlId="formPlaintextEmail">
        <Col className="mb-3 d-flex flex-column">
          <Button type="submit" className={`mt-3 align-self-end admin_bg_btn`}>
            Save Modification
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default ProductDetails;
