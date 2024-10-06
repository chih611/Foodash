import { Button, Col, Form, InputGroup, Navbar, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "../_components/table";
import { fetchOrderDetailList } from "../../../../store/actions/orderDetailAction";
import { useEffect } from "react";

const OrderDetails = ({ orderId }) => {
  let records = [];
  let headers = [];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrderDetailList(orderId));
  }, []);

  //Get data
  const orderDetailList = useSelector(
    (state) => state.orderDetail.orderDetailList
  );
  //Get colunms of headers name
  if (orderDetailList) {
    orderDetailList.map((item) => {
      headers.push(Object.keys(item));
    });
    records = orderDetailList;
  }

  return (
    <>
      <Navbar className="bg-body-tertiary justify-content-between">
        <Form inline>
          <InputGroup>
            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            <Form.Control
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
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
              <Button type="submit">Submit</Button>
            </Col>
          </Row>
        </Form>
      </Navbar>
      <CustomTable headers={headers} records={records} />
    </>
  );
};

export default OrderDetails;
