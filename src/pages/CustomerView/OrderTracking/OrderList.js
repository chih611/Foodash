import Link from "next/link";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import CircleRounded from "@mui/icons-material/CircleRounded";
import KeyboardArrowDownRounded from "@mui/icons-material/KeyboardArrowDownRounded";

const OrderList = () => {
  const orderByCustomer = useSelector(
    (state) => state.order.orderListByCustomerId
  );

  if (!orderByCustomer || orderByCustomer.length === 0) {
    return (
      <div>
        <h1>No Orders</h1>
      </div>
    );
  }

  return (
    <div className="filters-section my-3">
      {orderByCustomer.map((order) => (
        <Row
          key={order.ORDER_ID}
          className="w-100 align-items-center d-none d-lg-flex"
          style={{ marginTop: "24px" }}
        >
          {/* List of orders in this account */}

          {/* 1st column: Date */}
          <Col xs={12} md={3} className="mb-2">
            <Link href={"/"} legacyBehavior passHref>
              <a className="text-decoration-none">
                <div className="align-items-center w-100">
                  <p className="subtitle w-100 text-center">{order.DUEDATE}</p>
                </div>
                {/* Link apis to database in here after for above <p> </p> sector */}
              </a>
            </Link>
          </Col>

          {/* 2nd column: OrderID */}
          <Col xs={12} md={3} className="mb-2">
            <Link href={"/"} legacyBehavior passHref>
              <a className="text-decoration-none">
                <div className="align-items-center w-100">
                  <p className="subtitle w-100 text-center">{order.ORDER_ID}</p>
                </div>
                {/* Link apis to database in here after for above <p> </p> sector */}
              </a>
            </Link>
          </Col>

          {/* 3rd column: Amount */}
          <Col xs={12} md={3} className="mb-2">
            <Link href={"/"} legacyBehavior passHref>
              <a className="text-decoration-none">
                <div className="align-items-center w-100">
                  <p className="subtitle w-100 text-center">${order.TOTAL}</p>
                </div>
                {/* Link apis to database in here after for above <p> </p> sector */}
              </a>
            </Link>
          </Col>

          {/* Final column: Status */}
          <Col xs={12} md={3} className="d-flex align-items-center mb-2">
            <Link href={"/"} legacyBehavior passHref>
              <a
                className="d-flex align-items-center text-decoration-none w-100"
                style={{
                  padding: "10px", // Optional padding
                  borderRadius: "5px", // Optional rounded edges
                }}
              >
                <div className="align-items-center flex-column text-decoration-none w-100">
                  {/* Icon and text pair 1 */}
                  <div className="d-flex align-items-center mb-2 ms-5">
                    <CircleRounded
                      className="mb-2 me-3"
                      sx={{ color: "#ef4565" }}
                    />
                    {/* {add color status} */}
                    <p className="subtitle mb-2">{order.STATUS}</p>
                  </div>

                  {/* Icon and text pair 2 */}
                  {/* <div className="d-flex align-items-center mb-2 ms-5">
                    <CircleRounded className="mb-1 me-3" />
                    <p className="subtitle mb-1">Completed</p>
                  </div> */}
                </div>
              </a>
            </Link>
          </Col>
        </Row>
      ))}

      <div className="w-100 align-items-center d-none d-lg-flex">
        <Button
          className="w-100 align-items-center d-none d-lg-flex"
          style={{
            backgroundColor: "#ffffff",
            border: "none",
            color: "#094067",
          }}
        >
          <KeyboardArrowDownRounded className="w-100 align-items-center" />
        </Button>
      </div>

      <Row
        className="w-100 align-items-center d-none d-lg-flex"
        style={{ marginTop: "24px", borderTop: "1px solid #90B4CE" }}
      >
        <h4 className="mt-4 mb-0">Recent Order</h4>
      </Row>
    </div>
  );
};

export default OrderList;
