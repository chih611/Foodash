import { useState } from "react";
import Link from "next/link";
import { Row, Col, Button } from "react-bootstrap";
import CircleRounded from "@mui/icons-material/CircleRounded";
import KeyboardArrowDownRounded from "@mui/icons-material/KeyboardArrowDownRounded";

// Helper function to format the date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB").format(date); // Formats date to DD/MM/YYYY
};

const OrderList = ({ orders, onOrderDoubleClick }) => {
  const [visibleOrders, setVisibleOrders] = useState(5); // State to control how many orders to show

  if (!orders || orders.length === 0) {
    return <div>No Orders</div>;
  }

  // Function to show all orders
  const handleShowAll = () => {
    setVisibleOrders(orders.length); // Set visibleOrders to total length of orders array
  };

  return (
    <div className="filters-section my-3">
      {orders.slice(0, visibleOrders).map((order) => (
        <Row
          key={order.ORDER_ID}
          className="w-100 align-items-center d-flex"
          style={{ marginTop: "24px", cursor: "pointer" }}
          onDoubleClick={() => onOrderDoubleClick(order.ORDER_ID)} // Double-click event
        >
          {/* 1st column: Date */}
          <Col xs={3} md={3} className="mb-2">
            <div className="align-items-center w-100">
              <p className="subtitle w-100 text-center">
                {formatDate(order.DUEDATE)} {/* Reformatted date */}
              </p>
            </div>
          </Col>

          {/* 2nd column: OrderID */}
          <Col xs={2} md={3} className="mb-2">
            <div className="align-items-center w-100">
              <p className="subtitle w-100 text-center">{order.ORDER_ID}</p>
            </div>
          </Col>

          {/* 3rd column: Amount */}
          <Col xs={3} md={3} className="mb-2">
            <div className="align-items-center w-100">
              <p className="subtitle w-100 text-center">${order.TOTAL}</p>
            </div>
          </Col>

          {/* Final column: Status */}
          <Col xs={4} md={3} className="d-flex align-items-center mb-2">
            <div className="text-decoration-none w-100">
              <div className="d-flex align-items-center mb-2 ms-5">
                <CircleRounded
                  className="mb-2 me-3"
                  sx={{ color: "#ef4565" }}
                />
                <p className="subtitle mb-2">{order.STATUS}</p>
              </div>
            </div>
          </Col>
        </Row>
      ))}

      {/* Show more button if there are more orders to show */}
      {visibleOrders < orders.length && (
        <div className="w-100 align-items-center d-flex justify-content-center mt-4">
          <Button
            className="w-100 d-flex justify-content-center align-items-center"
            style={{
              backgroundColor: "#ffffff",
              border: "none",
              color: "#094067",
            }}
            onClick={handleShowAll} // Show all orders when clicked
          >
            <KeyboardArrowDownRounded className="w-100 align-items-center" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrderList;
