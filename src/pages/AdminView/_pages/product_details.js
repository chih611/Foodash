import React, { useEffect, useState } from "react";
import { Accordion, Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminItemByDetailId,
  fetchModifications,
} from "../../../../store/actions/itemAction";
import {
  createModification,
  updateItemModificationById,
} from "../../../../store/slices/itemsSlice";
import CustomInput from "../_components/input";

const ProductDetails = ({
  Id,
  setOpen,
  customTableColor,
  extraReadOnlyFields,
}) => {
  const dateTimeFields = ["Expiry date"];
  const readOnlyFields = ["ID"];
  extraReadOnlyFields && readOnlyFields.push(...extraReadOnlyFields);

  const optionsData = [
    { value: 1, label: "vegan" },
    { value: 4, label: "gluten-free" },
  ];

  const dispatch = useDispatch();

  // State to manage new modification form data and existing modification data
  const [newModification, setNewModification] = useState({
    modification: "",
    ingredients: "",
    labelId: "",
  });
  const [modificationData, setModificationData] = useState({});

  useEffect(() => {
    dispatch(fetchAdminItemByDetailId(Id));
    dispatch(fetchModifications(Id));
  }, [Id, dispatch]);

  const dataItems = useSelector((state) => state.items.itemDetail) || [];
  const dataMods = useSelector((state) => state.items.modAdminDetail) || [];
  const status = useSelector((state) => state.items.status) || "idle";

  // Track changes for existing modifications
  const handleModificationChange = (modId, field, event) => {
    // Ensure event and event.target are valid
    const value = event?.target?.value || ""; // Default to empty string if undefined

    // Update modification data
    setModificationData((prevData) => ({
      ...prevData,
      [modId]: {
        ...prevData[modId],
        [field]: value,
      },
    }));

    // Debugging output
    console.log("Updated modification data:", {
      ...modificationData,
      [modId]: {
        ...modificationData[modId],
        [field]: value,
      },
    });
  };

  // Save existing modification
  const saveModification = async (modId) => {
    const modData = modificationData[modId] || {};
    const modifiedData = {
      itemId: Id,
      ModId: modId,
      modification: modData.modification || "",
      ingredients: (modData.ingredients || "")
        .split(",")
        .map((ingredient) => ingredient.trim())
        .filter((ingredient) => ingredient !== ""),
      labelId: modData.labelId || null,
    };

    console.log("Data to be saved:", modifiedData); // Debugging output

    try {
      await dispatch(updateItemModificationById(modifiedData));
      dispatch(fetchModifications(Id));
    } catch (error) {
      console.error("Error saving modification:", error);
    }
  };

  // Track new modification input changes
  const handleNewModificationChange = (field, event) => {
    const value = event.target.value;
    setNewModification((prevData) => ({
      ...prevData,
      [field]: value,
    }));
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

  return (
    <Form onSubmit={onSubmit}>
      <Accordion defaultActiveKey="0" alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Product Detail</Accordion.Header>
          <Accordion.Body>
            <Form.Group as={Row} controlId="orderForm">
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
                      />
                    </Col>
                  </React.Fragment>
                ))
              )}
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Accordion defaultActiveKey="1" alwaysOpen>
        {dataMods.map((datum) => (
          <Accordion.Item eventKey={`mod-${datum.ModID}`} key={datum.ModID}>
            <Accordion.Header>Modification {datum.ModID}</Accordion.Header>
            <Accordion.Body>
              <Form.Group as={Row} controlId={`modification-${datum.ModID}`}>
                {Object.entries(datum || {}).map(([key, value]) => (
                  <Col md={6} key={key}>
                    <CustomInput
                      title={key || "-"}
                      value={
                        modificationData[datum.ModID]?.[key] || value || ""
                      }
                      readOnlyFields={readOnlyFields}
                      dateTimeFields={dateTimeFields}
                      statusFetching={status}
                      handleChange={(e) =>
                        handleModificationChange(datum.ModID, key, e)
                      }
                    />
                  </Col>
                ))}
              </Form.Group>
              <Button
                variant="primary"
                className="mt-2"
                onClick={() => saveModification(datum.ModID)}
              >
                Save Changes
              </Button>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <Accordion defaultActiveKey="2" alwaysOpen>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Add New Modification</Accordion.Header>
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
          <Button type="submit" className="mt-3 align-self-end">
            Save Modification
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default ProductDetails;
