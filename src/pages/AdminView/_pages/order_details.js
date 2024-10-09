import { Button, Col, Form, Row } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import CustomTable from "../_components/table";
import { fetchOrderDetailList } from "../../../../store/actions/orderDetailAction";
import {
  fetchOrderList,
  fetchOrderListById,
} from "../../../../store/actions/orderAction";
import { btn } from "../_styles";
import axios from "axios";
import { PersonalDetail } from "./personal_information";
import { OrderInformation } from "./order_information";

const OrderDetails = ({ orderId, setShow }) => {
  let recordsOrderDetails = [];
  let headersOrderDetails = [];
  const dateTimeFields = ["Duedate", "Create Date"];
  const readOnlyFields = ["Full Name", "Phone", "Address", "Email"];
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
  const dispatch = useDispatch();
  const BACKEND_PORT = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_PORT;
  const BASE_URL = `http://localhost:${BACKEND_PORT}`;

  const [status, setStatus] = useState(false);
  const [showSaveBtn, setShowSaveBtn] = useState(false);

  useEffect(() => {
    dispatch(fetchOrderDetailList(orderId));
    dispatch(fetchOrderListById(orderId));
  }, []);

  const orderDetailList = useSelector(
    (state) => state.orderDetail.orderDetailList,
    shallowEqual
  );
  const order = useSelector((state) => state.order.orderById);
  const statusOrderFetching = useSelector((state) => state.order.status);

  if (orderDetailList) {
    orderDetailList.map((item) => {
      headersOrderDetails.push(Object.keys(item));
    });
    recordsOrderDetails = orderDetailList;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${BASE_URL}/order/update/${orderId}`, {
        status: status,
      });

      if (response.status === 200) {
        setShow(false);
        dispatch(fetchOrderList());
      } else {
        return rejectWithValue("Failed to update customer");
      }
    } catch (error) {
      console.error("Error updating data", error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {order?.map((e, i) => (
          <>
            <PersonalDetail
              e={e}
              status={status}
              setStatus={setStatus}
              textBoxFields={textBoxFields}
              personalInfo={personalInfo}
              dropDownFields={dropDownFields}
              dateTimeFields={dateTimeFields}
              readOnlyFields={readOnlyFields}
              Row={Row}
              statusFetching={statusOrderFetching}
            />
            <OrderInformation
              e={e}
              status={status}
              setStatus={setStatus}
              textBoxFields={textBoxFields}
              personalInfo={personalInfo}
              dropDownFields={dropDownFields}
              dateTimeFields={dateTimeFields}
              readOnlyFields={readOnlyFields}
              setShowSaveBtn={setShowSaveBtn}
              Row={Row}
            />
          </>
        ))}
        {showSaveBtn ? (
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Col className="mb-3 d-flex flex-column">
              <Button type="submit" className={`${btn} mt-3 align-self-end`}>
                Save
              </Button>
            </Col>
          </Form.Group>
        ) : null}
      </Form>
      <CustomTable
        headers={headersOrderDetails}
        records={recordsOrderDetails}
      />
    </>
  );
};

export default OrderDetails;
