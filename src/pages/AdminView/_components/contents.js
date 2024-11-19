import { Tab } from "react-bootstrap";
import Report from "../_pages/report";
import Order from "../_pages/order";
import Product from "../_pages/product";
import UserSetting from "../_pages/user_setting";
import CustomerProfile from "../_pages/profile_page";

const Contents = () => {
  return (
    <>
      <Tab.Content>
        <Report eventKey="Home" />
        <Order eventKey="Order" />
        <Product eventKey="Product" />
        <CustomerProfile eventKey="Profile" />
        <UserSetting eventKey="User setting" />
      </Tab.Content>
    </>
  );
};

export default Contents;
