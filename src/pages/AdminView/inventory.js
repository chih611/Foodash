import {
  Tab
} from "react-bootstrap";
import { useEffect } from "react";

const Inventory = (props) => {
  useEffect(() => {
  }, []);

  return (
    <>
      <Tab.Pane { ...props }>Inventory</Tab.Pane>
    </>
  );
};

export default Inventory;
