import { Button, Col, Form, Row } from "react-bootstrap";
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

const ProductDetails = ({
  Id,
  setOpen,
  customTableColor,
  extraReadOnlyFields,
}) => {
  let recordsOrderDetails = [];
  let headersOrderDetails = [];
  const dateTimeFields = ["Duedate", "Create Date"];
  const readOnlyFields = ["Full Name"];
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

  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState({});
  const [orderChanges, setOrderChanges] = useState({}); // Track only changes
  const [showSaveBtn, setShowSaveBtn] = useState(false);

  useEffect(() => {
    dispatch(fetchOrderDetailList(Id));
    dispatch(fetchOrderListById(Id));
  }, [dispatch, Id]);

  const orderDetailList = useSelector(
    (state) => state.orderDetail.orderDetailList,
    shallowEqual
  );
  const order = useSelector((state) => state.order.orderById);
  const statusOrderFetching = useSelector((state) => state.order.status);
  const statusOrderDetailFetching = useSelector(
    (state) => state.orderDetail.status
  );

  if (orderDetailList) {
    orderDetailList?.map((item) => {
      headersOrderDetails.push(Object.keys(item));
    });
    recordsOrderDetails = orderDetailList;
  }

  useEffect(() => {
    if (order && Object.keys(order).length) {
      setOrderData(order);
    }
  }, [order]);

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

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {order?.map((e, i) => (
          <>
            <PersonalDetail
              e={e}
              textBoxFields={textBoxFields}
              personalInfo={personalInfo}
              dropDownFields={dropDownFields}
              dateTimeFields={dateTimeFields}
              readOnlyFields={readOnlyFields}
              Row={Row}
              statusFetching={statusOrderFetching}
              customHeaderColor={customTableColor}
              setShowSaveBtn={setShowSaveBtn}
              setOrderData={setOrderData}
              setOrderChanges={setOrderChanges}
            />
            <OrderInformation
              e={e}
              textBoxFields={textBoxFields}
              personalInfo={personalInfo}
              dropDownFields={dropDownFields}
              dateTimeFields={dateTimeFields}
              readOnlyFields={readOnlyFields}
              Row={Row}
              statusFetching={statusOrderFetching}
              customOrderInformationColor={customTableColor}
              setShowSaveBtn={setShowSaveBtn}
              setOrderData={setOrderData}
              setOrderChanges={setOrderChanges}
            />
          </>
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
      <CustomTable
        headers={headersOrderDetails}
        records={recordsOrderDetails}
        statusFetching={statusOrderDetailFetching}
        objectFields={objectFields}
        customTableColor={customTableColor}
      />
    </>
  );
};

export default ProductDetails;
