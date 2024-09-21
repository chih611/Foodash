import {
  Button,
  Col,
  Nav,
  Row,
  Tab,
} from "react-bootstrap";
import Report from "../report";
import Order from "../order";
import Inventory from "../inventory";
import Product from "../product";
import CRM from "../crm";
import UserSetting from "../user_setting";

// Icons
import HomeIcon from '@mui/icons-material/Home';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import { nav_style, icon_style } from "../styles";

const SideBar = ({
  handleSelect,
  setBreadcrumb }) => {

  return (
    <>
      <Row className="admin-main">
        <Col sm={2} className="side-bar">
          <Nav variant="pills" className="flex-column" onSelect={handleSelect}>
            <Nav.Item>
              <Nav.Link className={nav_style} eventKey="Home"><HomeIcon className={icon_style} />Home Page <ChevronRightIcon /></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className={nav_style} eventKey="Order"><ReceiptLongIcon className={icon_style} />order <ChevronRightIcon /></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className={nav_style} eventKey="Inventory"><InventoryIcon />inventory<ChevronRightIcon /></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className={nav_style} eventKey="Product"><AddCircleOutlineIcon />product <ChevronRightIcon /></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className={nav_style} eventKey="CRM"><AddCircleOutlineIcon />crm <ChevronRightIcon /></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className={nav_style} eventKey="User setting"><PeopleAltIcon />user setting <ChevronRightIcon /></Nav.Link>
            </Nav.Item>
          </Nav>
          <Button>LOG OUT</Button>
        </Col>
        <Col sm={10} className="admin-content">
          <Tab.Content>
            <Report eventKey="Home" setBreadcrumb={setBreadcrumb} />
            <Order eventKey="Order" setBreadcrumb={setBreadcrumb} />
            <Inventory eventKey="Inventory" setBreadcrumb={setBreadcrumb} />
            <Product eventKey="Product" />
            <CRM eventKey="CRM" />
            <UserSetting eventKey="User setting" />
          </Tab.Content>
        </Col>
      </Row>
    </>
  );
};

export default SideBar;