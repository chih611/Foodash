import { Col, Tab } from "react-bootstrap";
import Report from "../_pages/report";
import Order from "../_pages/order";
import Inventory from "../_pages/inventory";
import Product from "../_pages/product";
import Marketing from "../_pages/marketing";
import UserSetting from "../_pages/user_setting";
import Profile from "../_pages/profiles";
import Reminder from "../_pages/reminder";

const Contents = () => {
  return (
    <>
      <Tab.Content>
        <Report eventKey="Home" />
        <Order eventKey="Order" />
        <Inventory eventKey="Inventory" />
        <Product eventKey="Product" />
        <Marketing eventKey="Marketing" />
        <Profile eventKey="Profile" />
        <Reminder eventKey="Reminder" />
        <UserSetting eventKey="User setting" />
      </Tab.Content>
    </>
  );
};

export default Contents;
