import { Button, Col, Form, InputGroup, Navbar, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import CustomTable from "../_components/table";
import { fetchOrderDetailList } from "../../../../store/actions/orderDetailAction";
import { fetchOrderListById } from "../../../../store/actions/orderAction";
import { btn } from "../_styles";

const OrderDetails = ({ orderId }) => {
  let recordsOrderDetails = [];
  let headersOrderDetails = [];
  let orderHeaders = [];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrderDetailList(orderId));
    dispatch(fetchOrderListById(orderId));
  }, []);

  const orderDetailList = useSelector(
    (state) => state.orderDetail.orderDetailList
  );
  const order = useSelector((state) => state.order.orderById);

  if (order) {
    order.map((item) => {
      orderHeaders = Object.keys(item);
    });
  }
  if (orderDetailList) {
    orderDetailList.map((item) => {
      headersOrderDetails.push(Object.keys(item));
    });
    recordsOrderDetails = orderDetailList;
  }

  return (
    <>
      <Navbar className="bg-body-tertiary justify-content-between">
        <Form inline>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="4">
              {orderHeaders.find((e) => e === "Full Name")}
            </Form.Label>
            <Col sm="8">
              {order?.map((e, i) => (
                <Form.Control
                  type="text"
                  placeholder="Fullname"
                  aria-label="Fullname"
                  aria-describedby="order"
                  value={e["Full Name"]}
                  readOnly
                />
              ))}
            </Col>
          </Form.Group>
        </Form>
        <Form inline>
          <Row>
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Search"
                className=" mr-sm-2"
              />
            </Col>
            <Col xs="auto">
              <Button type="submit" className={btn}>
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </Navbar>
      <CustomTable
        headers={headersOrderDetails}
        records={recordsOrderDetails}
      />
    </>
  );
};

export default OrderDetails;
