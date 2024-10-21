import React, { useState } from "react";
import { Row, Col, Collapse, Form } from "react-bootstrap";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useSelector } from "react-redux";

const HomeSideBarBox = ({ onFilterChange }) => {
  const [open, setOpen] = useState({
    eventType: false,
    dietary: false,
  });

  const toggleDropdown = (category) => {
    setOpen((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  const ingredientList = useSelector((state) => state.items.ingredients);
  const labelList = useSelector((state) => state.items.labels);

  const handleCheckboxChange = (type, value, checked) => {
    onFilterChange(type, value, checked);
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
              {labelList.map((label, index) => (
                <li key={index}>
                  <Form.Check
                    type="checkbox"
                    label={label.LABEL_NAME}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "labels",
                        label.LABEL_NAME,
                        e.target.checked
                      )
                    }
                  />
                </li>
              ))}
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
              {ingredientList.map((ingredient, index) => (
                <li key={index}>
                  <Form.Check
                    type="checkbox"
                    label={ingredient}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "ingredients",
                        ingredient,
                        e.target.checked
                      )
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default HomeSideBarBox;
