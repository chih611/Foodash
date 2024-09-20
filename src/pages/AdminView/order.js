import {
  Tab
} from "react-bootstrap";
import { useEffect } from "react";

const Order = (props) => {
  useEffect(() => {

  }, []);

  return (
    <>
      <Tab.Pane { ...props }>order</Tab.Pane>
    </>
  );
};

export default Order;
