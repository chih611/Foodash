import { Col, Tab } from "react-bootstrap";
import Report from "../report";
import Order from "../order";
import Inventory from "../inventory";
import Product from "../product";
import Marketing from "../marketing";
import UserSetting from "../user_setting";
import Profile from "../profiles";
import Reminder from "../reminder";

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
