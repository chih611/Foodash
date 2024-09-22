import { Col, Tab } from "react-bootstrap";
import Report from "../report";
import Order from "../order";
import Inventory from "../inventory";
import Product from "../product";
import CRM from "../crm";
import UserSetting from "../user_setting";

const Contents = () => {
  return (
    <>
      <Tab.Content>
        <Report eventKey="Home" />
        <Order eventKey="Order" />
        <Inventory eventKey="Inventory" />
        <Product eventKey="Product" />
        <CRM eventKey="CRM" />
        <UserSetting eventKey="User setting" />
      </Tab.Content>
    </>
  );
};

export default Contents;
