import { Button, Col, Form, Row } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import CustomTable from "../_components/table";
import { fetchOrderDetailList } from "../../../../store/actions/orderDetailAction";
import {
  fetchOrderList,
  fetchOrderListById,
} from "../../../../store/actions/orderAction";
import styles from "../../../styles/styles";
import axios from "axios";
import PersonalDetail from "./personal_information";
import OrderInformation from "./order_information";

const OrderDetails = ({ Id, setOpen, customTableColor }) => {
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
  const objectFields = ["Modification"];

  const dispatch = useDispatch();
  const BASE_URL = `https://${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_ADDRESS}`;

  const [switchOptions, setSwitchOptions] = useState(false);
  const [showSaveBtn, setShowSaveBtn] = useState(false);

  useEffect(() => {
    dispatch(fetchOrderDetailList(Id));
    dispatch(fetchOrderListById(Id));
  }, []);

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
    orderDetailList.map((item) => {
      headersOrderDetails.push(Object.keys(item));
    });
    recordsOrderDetails = orderDetailList;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${BASE_URL}/order/update/${Id}`, {
        status: switchOptions,
      });

      if (response.status === 200) {
        setOpen(false);
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
              switchOptions={switchOptions}
              setSwitchOptions={setSwitchOptions}
              textBoxFields={textBoxFields}
              personalInfo={personalInfo}
              dropDownFields={dropDownFields}
              dateTimeFields={dateTimeFields}
              readOnlyFields={readOnlyFields}
              Row={Row}
              statusFetching={statusOrderFetching}
              customHeaderColor={customTableColor}
            />
            <OrderInformation
              e={e}
              switchOptions={switchOptions}
              setSwitchOptions={setSwitchOptions}
              textBoxFields={textBoxFields}
              personalInfo={personalInfo}
              dropDownFields={dropDownFields}
              dateTimeFields={dateTimeFields}
              readOnlyFields={readOnlyFields}
              setShowSaveBtn={setShowSaveBtn}
              Row={Row}
              statusFetching={statusOrderFetching}
              customOrderInformationColor={customTableColor}
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

export default OrderDetails;
