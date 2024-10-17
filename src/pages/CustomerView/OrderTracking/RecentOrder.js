import Link from "next/link";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import CircleRounded from "@mui/icons-material/CircleRounded";
import HeadphonesOutlined from "@mui/icons-material/HeadphonesOutlined";

const RecentOrder = () => {
  const orderByCustomer = useSelector(
    (state) => state.order.orderListByCustomerId
  );
  const recentOrder = orderByCustomer[orderByCustomer.length - 1];
  console.log(recentOrder);
  return (
    <div className="filters-section mb-3">
      {/* Desktop View */}
      <Row
        className="align-items-center w-100 d-flex "
        style={{ marginTop: "24px" }}
      >
        <Col xs={12} md={2} className="mb-2 align-items-center">
          <p className="subtitle mb-0">Order ID : </p>
        </Col>

        <Col xs={12} md={7} className="mb-2 align-items-center">
          <p className="subtitle mb-0">{recentOrder.ORDER_ID}</p>
        </Col>

        <Col xs={12} md={3} className="mb-2 align-items-center ">
          <p className="subtitle mb-0 d-flex w-100">
            Estimated arrival in: 30-40 minutes{" "}
          </p>
        </Col>
      </Row>

      <Row className="align-items-center w-100 d-none d-lg-flex ">
        <div
          className="w-100 align-items-end d-none d-lg-flex"
          style={{
            borderTop: "1px solid #90B4CE",
            backgroundColor: "#D8EEFE",
            height: "165px",
          }}
        >
          <CircleRounded className="mb-0 me-3 mb-2" sx={{ color: "#ef4565" }} />
          <p className="subtitle mb-0 mb-2">Delivering</p>
        </div>
      </Row>
      <Row className="w-100 my-4">
        <Col xs={12} md={8} className="mb-2">
          {" "}
        </Col>

        <Col xs={12} md={2} className="mb-2">
          <button className="subtitle button-2"> Leave Instruction </button>
        </Col>
        <Col xs={12} md={2} className="mb-2">
          <button className="subtitle button-2">
            <HeadphonesOutlined className="mb-1 mx-3" />
            Call Driver
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default RecentOrder;
