import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Nav,
  Row,
} from "react-bootstrap";

// Icons
import HomeIcon from "@mui/icons-material/Home";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { nav_style, icon_style, custom_dropdown, logout_btn } from "../styles";
import Contents from "./contents";

const SideBar = ({ handleSelect }) => {
  const dropdown_style = nav_style.concat(custom_dropdown);
  return (
    <>
      <Row className="admin-main">
        <Col lg={2} className="">
          <Row className="flex-column justify-content-between side-bar">
            <Col>
              <Nav
                variant="pills"
                className="flex-column"
                onSelect={handleSelect}
              >
                <Nav.Item>
                  <Nav.Link className={nav_style} eventKey="Home">
                    <HomeIcon className={icon_style} />
                    Home Page <ChevronRightIcon />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className={nav_style} eventKey="Order">
                    <ReceiptLongIcon className={icon_style} />
                    order <ChevronRightIcon />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className={nav_style} eventKey="Inventory">
                    <InventoryIcon />
                    inventory
                    <ChevronRightIcon />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className={nav_style} eventKey="Product">
                    <AddCircleOutlineIcon />
                    product <ChevronRightIcon />
                  </Nav.Link>
                </Nav.Item>
                <Container className="ps-3">
                  <AddCircleOutlineIcon />
                  {["end"].map((direction) => (
                    <DropdownButton
                      as={ButtonGroup}
                      key={direction}
                      drop={direction}
                      bsPrefix={dropdown_style}
                      title={`CRM`}
                    >
                      <Dropdown.Item>
                        <Nav.Item>
                          <Nav.Link className={nav_style} eventKey="Marketing">
                            marketing <ChevronRightIcon />
                          </Nav.Link>
                        </Nav.Item>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Nav.Item>
                          <Nav.Link className={nav_style} eventKey="Profile">
                            profile <ChevronRightIcon />
                          </Nav.Link>
                        </Nav.Item>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Nav.Item>
                          <Nav.Link className={nav_style} eventKey="Reminder">
                            reminder <ChevronRightIcon />
                          </Nav.Link>
                        </Nav.Item>
                      </Dropdown.Item>
                    </DropdownButton>
                  ))}
                  <ChevronRightIcon />
                </Container>
                <Nav.Item>
                  <Nav.Link className={nav_style} eventKey="User setting">
                    <PeopleAltIcon />
                    user setting <ChevronRightIcon />
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col className={logout_btn}>
              <Button>LOG OUT</Button>
            </Col>
          </Row>
        </Col>
        <Col lg={10}>
          <Contents />
        </Col>
      </Row>
    </>
  );
};

export default SideBar;