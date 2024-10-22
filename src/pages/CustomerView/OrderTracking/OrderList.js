import { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import CircleRounded from "@mui/icons-material/CircleRounded";
import KeyboardArrowDownRounded from "@mui/icons-material/KeyboardArrowDownRounded";

// Helper function to format the date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB").format(date); // Formats date to DD/MM/YYYY
};

// Helper function to determine status color
const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "#808080"; // gray
    case "created":
    case "pending":
    case "paid":
      return "#4CAF50"; // green
    case "refund":
    case "cancelled":
      return "#ef4565"; // red
    case "quote":
      return "#FFD700"; // yellow
    case "in progress":
      return "#2196F3"; // blue
    default:
      return "#808080"; // Default gray for unknown status
  }
};

// Helper function to determine background color for the badge
const getStatusBackgroundColor = (status) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "#d3d3d3"; // light gray
    case "created":
    case "pending":
    case "paid":
      return "#e8f5e9"; // light green
    case "refund":
    case "cancelled":
      return "#ffe6e6"; // light red
    case "quote":
      return "#fff9e1"; // light yellow
    case "in progress":
      return "#e3f2fd"; // light blue
    default:
      return "#f0f0f0"; // Default light gray
  }
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
            <div
              className="text-decoration-none w-100 d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: getStatusBackgroundColor(order.STATUS),
                color: getStatusColor(order.STATUS),
                padding: "4px 8px",
                borderRadius: "12px",
                fontWeight: "bold",
                minWidth: "80px",
                textAlign: "center",
              }}
            >
              {order.STATUS.toUpperCase()}
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
