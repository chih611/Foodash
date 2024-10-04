import { Container, Form, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";

const OrderDetails = () => {
  let records = [];

  //Get data
  const orderList = useSelector((state) => state.order.ordersList);
  //Get colunms of headers name
  if (orderList) {
    orderList[0].rows?.map((e) => {
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
    </>
  );
};

export default OrderDetails;
