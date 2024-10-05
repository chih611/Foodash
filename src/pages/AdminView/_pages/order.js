import { useEffect } from "react";
import { Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderList } from "../../../../store/actions/orderAction";
import CustomTable from "../_components/table";

const Order = (props) => {
  const dispatch = useDispatch();
  let headers = [];
  let records = [];
  useEffect(() => {
    dispatch(fetchOrderList());
  }, []);

  //Get data
  const orderList = useSelector((state) => state.order.ordersList);
  //Get colunms of headers name
  if (orderList) {
    orderList[0].fields?.map((e) => {
      headers.push(e.name);
    });
    orderList[0].rows?.map((e) => {
      records.push(e);
    });
  }

  return (
    <>
      <Tab.Pane {...props}>
        <CustomTable headers={headers} records={records} />
      </Tab.Pane>
    </>
  );
};

export default Order;
