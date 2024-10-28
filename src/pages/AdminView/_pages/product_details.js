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

  const personalInfo = ["Full Name", "Phone", "Address", "Email"];
  const dropDownFields = ["Category name"];
  const objectFields = ["Modification"];
  const [showSaveBtn, setShowSaveBtn] = useState(false);
  const optionsData = [
    { 1: "EAT" },
    { 2: "FOOD" },
    { 3: "DRINK" },
    { 4: "COFFEE" },
  ];

  //-----------------------------------------------------------------------------------Fetch Data------------------------------------------
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAdminItemByDetailId(Id));
    dispatch(fetchModifications(Id));
  }, []);
  const dataItems = useSelector((state) => state.items.itemDetail) || [];
  const dataMods = useSelector((state) => state.items.modAdminDetail);
  const status = useSelector((state) => state.items.status) || "idle";

  //-----------------------------------------------------------------------------------Events----------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedOrderData = {
      ...orderData[0],
      ...orderChanges,
    };

    // Remove "Full Name" from the object
    delete updatedOrderData["Full Name"];

    console.log("Order Data to be sent:", updatedOrderData);

    try {
      const orderId = Id;
      await dispatch(
        updateOrderViewById({ orderId, updatedData: updatedOrderData })
      );
      setOpen(false);
      dispatch(fetchOrderList());
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };
  const handleChange = (field, value) => {
    // setShowSaveBtn(true);
    // setOrderChanges((prevChanges) => ({
    //   ...prevChanges,
    //   [field]: value,
    // }));
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
                    <>
                      <Col md={6}>
                        <CustomInput
                          title={key || "-"}
                          value={value || "-"}
                          index={index}
                          readOnlyFields={readOnlyFields}
                          dateTimeFields={dateTimeFields}
                          statusFetching={status}
                          handleChange={handleChange}
                        />
                      </Col>
                      {dropDownFields.includes(key) && (
                        <Col lg="6" className="mt-3">
                          <CustomDropBox
                            title={key}
                            value={value}
                            index={index}
                            statusFetching={status}
                            handleChange={handleChange} // Use unified handleChange
                            optionsData={optionsData}
                          />
                        </Col>
                      )}
                    </>
                  ))
                )}
              </Form.Group>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        {/* ================================== */}
        {dataMods &&
          dataMods[0] &&
          dataMods?.map((datum, pIndex) => (
            <Accordion defaultActiveKey={[pIndex]} alwaysOpen>
              <Accordion.Item eventKey={pIndex}>
                <Accordion.Header>Modification {datum.ModID}</Accordion.Header>
                <Accordion.Body>
                  {Object.entries(datum || {}).map(([key, value], index) => (
                    <>
                      <Form.Group as={Row} className="" controlId="modForm">
                        <Col md={6}>
                          <CustomInput
                            title={key || "-"}
                            value={value || "-"}
                            index={index}
                            readOnlyFields={readOnlyFields}
                            dateTimeFields={dateTimeFields}
                            statusFetching={status}
                            handleChange={handleChange}
                          />
                        </Col>
                      </Form.Group>
                    </>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))}

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

export default ProductDetails;
