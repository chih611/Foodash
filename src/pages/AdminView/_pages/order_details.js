import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

import CustomTable from "../_components/backup_table";
import { fetchOrderDetailList } from "../../../../store/actions/orderDetailAction";
import { fetchOrderListById } from "../../../../store/actions/orderAction";
import { btn } from "../_styles";
import { CustomInput } from "../_components/input";

const OrderDetails = ({ orderId, setShow }) => {
  let recordsOrderDetails = [];
  let headersOrderDetails = [];
  const readOnlyFields = ["Full Name"];
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
  const dropDownFields = ["Status"];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrderDetailList(orderId));
    dispatch(fetchOrderListById(orderId));
  }, []);

  const orderDetailList = useSelector(
    (state) => state.orderDetail.orderDetailList
  );
  const order = useSelector((state) => state.order.orderById);

  if (orderDetailList) {
    orderDetailList.map((item) => {
      headersOrderDetails.push(Object.keys(item));
    });
    recordsOrderDetails = orderDetailList;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShow(false);
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        {order?.map((e, i) => (
          <Form.Group as={Row} className="" controlId="formPlaintextEmail">
            {Object.entries(e).map(
              ([key, value], index) =>
                textBoxFields.includes(key) && (
                  <Col lg="6" className="mt-3">
                    <CustomInput
                      keyInput={key}
                      value={value}
                      index={index}
                      readOnlyFields={readOnlyFields}
                    />
                  </Col>
                )
            )}
          </Form.Group>
        ))}
        <Form.Group as={Row} controlId="formPlaintextEmail">
          <Col className="mb-3 d-flex flex-column">
            <Button type="submit" className={`${btn} mt-3 align-self-end`}>
              Save
            </Button>
          </Col>
        </Form.Group>
      </Form>
      <CustomTable
        headers={headersOrderDetails}
        records={recordsOrderDetails}
      />
    </>
  );
};

export default OrderDetails;
