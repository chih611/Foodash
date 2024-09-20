import {
  Tab
} from "react-bootstrap";
import { useEffect } from "react";
import TableContent from "./_Components/table";

const Order = (props) => {
  useEffect(() => {

  }, []);

  return (
    <>
      <Tab.Pane { ...props }>
        <TableContent />
      </Tab.Pane>
    </>
  );
};

export default Order;
