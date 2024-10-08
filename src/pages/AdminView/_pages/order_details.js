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
            {Object.entries(e).map(([key, value], index) => {
              return (
                <>
                  {textBoxFields.includes(key) && (
                    <Col lg="6" className="mt-3">
                      <CustomInput
                        keyInput={key}
                        value={value}
                        index={index}
                        readOnlyFields={readOnlyFields}
                      />
                    </Col>
                  )}
                  {dropDownFields.includes(key) && (
                    <Col lg="6" className="mt-3">
                      <Form.Label key={`label-${index}`} className="fw-bold">
                        {key}
                      </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        size="sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="delivered">Delivered</option>
                        <option value="canceled">Canceled</option>
                      </Form.Select>
                    </Col>
                  )}
                </>
              );
            })}
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

// dropDownFields.includes(key) && (
//   <Col lg="6" className="mt-3">
//     <Form.Label key={`label-${index}`} className="fw-bold">
//       {key}
//     </Form.Label>
//     <Form.Control
//       key={`input-${index}`}
//       type="dropdown"
//       aria-describedby="order"
//       value={value}
//       plaintext={readOnlyFields.includes(key)}
//     />
//   </Col>
//   )

export default OrderDetails;
