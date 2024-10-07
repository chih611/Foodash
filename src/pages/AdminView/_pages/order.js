import { useEffect, useState } from "react";
import { Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderList } from "../../../../store/actions/orderAction";
import CustomTable from "../_components/backup_table";
import OrderDetails from "./order_details";
import CustomModal from "../_components/modal";

const Order = (props) => {
  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

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
    orderList.map((item) => {
      headers.push(Object.keys(item));
    });
    records = orderList;
  }

  const handleRecordDoubleClick = ({ ID }) => {
    setSelectedId(ID);
    setShow(true);
  };

  return (
    <>
      <Tab.Pane {...props}>
        <CustomTable
          headers={headers}
          records={records}
          handleRecordDoubleClick={handleRecordDoubleClick}
        />
        <CustomModal setShow={setShow} show={show} selectedId={selectedId}>
          <OrderDetails {...props} />
        </CustomModal>
      </Tab.Pane>
    </>
  );
};

export default Order;
