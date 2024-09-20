import {
  Tab
} from "react-bootstrap";
const Product = (props) => {
  return (
    <>
      <Tab.Pane { ...props }>product</Tab.Pane>
    </>
  );
};

export default Product;
