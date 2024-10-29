import React, { useEffect, useState } from "react";
import { Accordion, Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  fetchAdminItemByDetailId,
  fetchModifications,
} from "../../../../store/actions/itemAction";
import { createModification } from "../../../../store/slices/itemsSlice";
import CustomInput from "../_components/input";
import CustomDropBox from "../_components/dropbox";
import axios from "axios";

const ProductDetails = ({
  Id,
  setOpen,
  customTableColor,
  extraReadOnlyFields,
  customAccordingColor,
}) => {
  const dateTimeFields = ["Expiry date"];
  const readOnlyFields = ["ID"];
  extraReadOnlyFields && readOnlyFields.push(...extraReadOnlyFields);

  const optionsData = [
    { value: 1, label: "EAT" },
    { value: 2, label: "FOOD" },
    { value: 3, label: "DRINK" },
    { value: 4, label: "COFFEE" },
  ];

  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const [showSaveBtn, setShowSaveBtn] = useState(false);
  const [data, handleChange] = useState(null);
  useEffect(() => {
    dispatch(fetchAdminItemByDetailId(Id));
    dispatch(fetchModifications(Id)); // Fetch existing modifications
  }, [Id, dispatch]);

  const dataItems = useSelector((state) => state.items.itemDetail) || [];
  const dataMods = useSelector((state) => state.items.modAdminDetail); // Existing modifications
  const status = useSelector((state) => state.items.status) || "idle";

  const onSubmit = async (formData) => {
    // Convert comma-separated ingredients to an array
    const processedFormData = {
      ...formData,
      ingredients: formData.ingredients
        .split(",")
        .map((ingredient) => ingredient.trim()), // Convert to array
    };

    try {
      console.log("Submitting:", processedFormData);
      await dispatch(createModification({ itemId: Id, ...processedFormData }));
      console.log("Submitted successfully");
      reset(); // Clear the form after successful submission
      dispatch(fetchModifications(Id)); // Refresh the modifications list after adding
    } catch (error) {
      console.error("Error creating modification:", error);
    }
  };

  const updateItemData = async (e) => {
    console.log(data);
    // try {
    //   const response = await axios.put(`router.put("/item/update/${Id}`, updatedData);
    //   console.log('Data updated successfully:', response.data);
    // } catch (error) {
    //   console.error('Error updating data:', error);
    // }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Accordion defaultActiveKey={["0"]} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header className={customAccordingColor}>
            Product Detail
          </Accordion.Header>
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
                        setShowSaveBtn={setShowSaveBtn}
                        handleChange={handleChange}
                      />
                    </Col>
                  </React.Fragment>
                ))
              )}
              {showSaveBtn && (
                <Col className="mb-3 d-flex flex-column">
                  <Button
                    type="submit"
                    className={`mt-3 align-self-end admin_bg_btn`}
                    onClick={(e) => {
                      updateItemData(e);
                    }}
                  >
                    Edit Modification
                  </Button>
                </Col>
              )}
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Accordion to display existing modifications */}
      <Accordion defaultActiveKey="1" alwaysOpen>
        {dataMods &&
          dataMods.map((datum, pIndex) => (
            <Accordion.Item eventKey={`mod-${pIndex}`} key={pIndex}>
              <Accordion.Header className={customAccordingColor}>
                Modifications {datum.ModID}
              </Accordion.Header>
              <Accordion.Body>
                {Object.entries(datum || {}).map(([key, value], index) => (
                  <Form.Group
                    as={Row}
                    key={`${key}-${index}`}
                    className=""
                    controlId="modForm"
                  >
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
                  </Form.Group>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          ))}
      </Accordion>

      {/* Form to add new modification */}
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
                  {...register("modification")}
                  placeholder="Enter modification"
                />
              </Col>
              <Col md={6}>
                <Form.Label>Ingredients (comma-separated)</Form.Label>
                <Form.Control
                  type="text"
                  {...register("ingredients")}
                  placeholder="Enter ingredients"
                />
              </Col>
              <Col md={6}>
                <Form.Label>Label ID</Form.Label>
                <Form.Select {...register("labelId")}>
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
