import { Accordion, Button, Col, Form, Row } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import CustomTable from "../_components/table";
import { fetchOrderDetailList } from "../../../../store/actions/orderDetailAction";
import {
  fetchOrderList,
  fetchOrderListById,
  updateOrderViewById,
} from "../../../../store/actions/orderAction";
import styles from "../../../styles/styles";
import PersonalDetail from "./personal_information";
import OrderInformation from "./order_information";
import {
  fetchAdminItemByDetailId,
  fetchAdminItems,
  fetchModifications,
} from "../../../../store/actions/itemAction";
import CustomInput from "../_components/input";

const ProductDetails = ({
  Id,
  setOpen,
  customTableColor,
  extraReadOnlyFields,
}) => {
  let recordsOrderDetails = [];
  let headersOrderDetails = [];
  const dateTimeFields = ["Expiry date"];
  const readOnlyFields = ["ID"];
  extraReadOnlyFields && readOnlyFields.push(...extraReadOnlyFields);

  const textBoxFields = [
    "Full Name",
    "Duedate",
    "Recipient",
    "Address",
    "Phone",
    "Email",
    "Deliver",
    "Payment",
    "Taxes",
    "Delivery Fee",
    "Service Fee",
    "UTENSIL",
    "Giftwrap",
    "Promotion",
    "Subtotal",
    "ORDER_ITEM_ID",
    "Total",
    "Create Date",
  ];
  const personalInfo = ["Full Name", "Phone", "Address", "Email"];
  const dropDownFields = ["Status"];
  const objectFields = ["Modification"];
  const [showSaveBtn, setShowSaveBtn] = useState(false);

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
                  ))
                )}
              </Form.Group>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        {/* ================================== */}
        {dataMods[0] &&
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
