import { Col, Tab } from "react-bootstrap";
import Report from "../_pages/report";
import Order from "../_pages/order";
import Inventory from "../_pages/inventory";
import Product from "../_pages/product";
import Marketing from "../_pages/marketing";
import UserSetting from "../_pages/user_setting";
import CustomerProfile from "../_pages/profile_page";

const Contents = () => {
  return (
    <>
      <Tab.Content>
        <Report eventKey="Home" />
        <Order eventKey="Order" />
        <Product eventKey="Product" />
        {/* <Marketing eventKey="Marketing" /> */}
        <CustomerProfile eventKey="Profile" />
        {/* <Reminder eventKey="Reminder" /> */}
        <UserSetting eventKey="User setting" />
      </Tab.Content>
    </>
  );
};

export default Contents;
