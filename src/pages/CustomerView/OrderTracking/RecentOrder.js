import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import CircleRounded from "@mui/icons-material/CircleRounded";
import HeadphonesOutlined from "@mui/icons-material/HeadphonesOutlined";
import PrimaryButton from "../ViewCart/_PrimaryButton";

const RecentOrder = ({ order, onLeaveFeedback }) => {
  if (!order) {
    return <div>No recent order available</div>;
  }

  const estimateArrival = order ? new Date(order.DUEDATE) - new Date() : null;

  const getReadableTime = (milliseconds) => {
    const totalMinutes = Math.floor(milliseconds / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours} hours and ${minutes} minutes`;
  };

  const readableEstimateArrival = estimateArrival
    ? getReadableTime(estimateArrival)
    : "N/A";

  return (
    <div className="filters-section mb-3">
      <Row
        className="align-items-center w-100 d-flex "
        style={{ marginTop: "24px" }}
      >
        <Col xs={12} md={2} className="mb-2 align-items-center">
          <p className="subtitle mb-0">Order ID : </p>
        </Col>
        <Col xs={12} md={7} className="mb-2 align-items-center">
          <p className="subtitle mb-0">{order.ORDER_ID}</p>
        </Col>
        <Col xs={12} md={3} className="mb-2 align-items-center ">
          <p className="subtitle mb-0 d-flex w-100">
            Estimated arrival in: {readableEstimateArrival}
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
          <PrimaryButton
            variant="inverted"
            text="Leave Feedback"
            className="subtitle button-2"
            onClick={onLeaveFeedback}
          />
        </Col>
        <Col xs={12} md={2} className="mb-2">
          <PrimaryButton
            icon={HeadphonesOutlined}
            variant="inverted"
            text="Call Driver"
            className="subtitle button-2"
            onClick={() => {
              router.push("/CustomerView/LandingPage/LandingContact");
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default RecentOrder;
