import React, { useState } from "react";
import { Row, Col, Collapse } from "react-bootstrap";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const HomeSideBarBox = () => {
  const [open, setOpen] = useState({
    eventType: false,
    dietary: false,
    people: false,
    checklist: false,
  });

  const toggleDropdown = (category) => {
    setOpen((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  return (
    <div className="sidebar-box">
      <div className="sidebar-box-category">
        <Row onClick={() => toggleDropdown("eventType")}>
          <Col xs={3}>
            <RemoveCircleIcon className="sidebar-box-removeicon" />
          </Col>
          <Col xs={6}>Labels</Col>
          <Col xs={3}>
            <ArrowDropDownIcon />
          </Col>
        </Row>
        <Collapse in={open.eventType}>
          <div>
            <ul>
              <li>Event Type 1</li>
              <li>Event Type 2</li>
              <li>Event Type 3</li>
            </ul>
          </div>
        </Collapse>
      </div>
      <div className="sidebar-box-category">
        <Row onClick={() => toggleDropdown("dietary")}>
          <Col xs={3}>
            <RemoveCircleIcon className="sidebar-box-removeicon" />
          </Col>
          <Col xs={6}>Ingredients</Col>
          <Col xs={3}>
            <ArrowDropDownIcon />
          </Col>
        </Row>
        <Collapse in={open.dietary}>
          <div>
            <ul>
              <li>Dietary 1</li>
              <li>Dietary 2</li>
              <li>Dietary 3</li>
            </ul>
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default HomeSideBarBox;
