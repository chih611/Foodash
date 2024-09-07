import React from "react";
import { Row, Col, Nav } from "react-bootstrap";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const HomeSideBarBox = () => {
  return (
    <div className="sidebar-box">
      <div className="sidebar-box-category">
        <Row>
          <Col xs={3}>
            <RemoveCircleIcon />
          </Col>
          <Col xs={6}>Event Type</Col>
          <Col xs={3}>
            <ArrowDropDownIcon />
          </Col>
        </Row>{" "}
      </div>
      <div className="sidebar-box-category">
        <Row>
          <Col xs={3}>
            <RemoveCircleIcon />
          </Col>
          <Col xs={6}>Dietary</Col>
          <Col xs={3}>
            <ArrowDropDownIcon />
          </Col>
        </Row>{" "}
      </div>
      <div className="sidebar-box-category">
        <Row>
          <Col xs={3}>
            <RemoveCircleIcon />
          </Col>
          <Col xs={6}>People</Col>
          <Col xs={3}>
            <ArrowDropDownIcon />
          </Col>
        </Row>{" "}
      </div>
      <div className="sidebar-box-category">
        <Row>
          <Col xs={3}>
            <RemoveCircleIcon />
          </Col>
          <Col xs={6}>Checklist</Col>
          <Col xs={3}>
            <ArrowDropDownIcon />
          </Col>
        </Row>{" "}
      </div>
    </div>
  );
};

export default HomeSideBarBox;
