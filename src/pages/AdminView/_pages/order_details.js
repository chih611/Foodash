import { Container, Form, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "../_components/table";
import { fetchOrderDetailList } from "../../../../store/actions/orderDetailAction";
import { useEffect } from "react";

const OrderDetails = ({ orderId }) => {
  let records = [];
  let headers = [];

  const customColumns = [""];
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
    orderDetailList[0].fields?.map((e) => {
      headers.push(e.name);
    });
    orderDetailList[0].rows?.map((e) => {
      records.push(e);
    });
  }

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">Mark Otto</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <CustomTable headers={headers} records={records} />
    </>
  );
};

export default OrderDetails;
