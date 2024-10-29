import { useEffect, useState } from "react";
import { Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "../_components/table";
import OrderDetails from "./order_details";
import CustomModal from "../_components/modal";
import { fetchOrderByCustomerId } from "../../../../store/actions/orderAction";
import styles from "@/styles/styles";

const Order = (props) => {
  const { orderId, countOrder } = props;
  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const dispatch = useDispatch();
  let headers = [];
  let records = [];
  const datetimeFields = ["Duedate", "Create Date", "Updated"];
  const objectFields = ["Feedback"];
  useEffect(() => {
    orderId && dispatch(fetchOrderByCustomerId(orderId));
  }, []);
  //Get data
  const orderList = orderId
    ? useSelector((state) => state.order.orderListByCustomerId)
    : useSelector((state) => state.order.ordersList);
  const statusOrderFetching = useSelector((state) => state.order.status);
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
      {orderId ? (
        <>
          <CustomTable
            headers={headers}
            records={records}
            handleRecordDoubleClick={handleRecordDoubleClick}
            datetimeFields={datetimeFields}
            objectFields={objectFields}
            statusFetching={statusOrderFetching}
            showPagination={true}
            customTableColor={styles.admin_header_tables}
          />
          <CustomModal
            setOpen={setShow}
            open={show}
            selectedId={selectedId}
            headerTitle="Order"
            customTableColor="bg-pressed-color text-light"
          >
            <OrderDetails
              {...props}
              customTableColor="bg-pressed-color text-light"
            />
          </CustomModal>
        </>
      ) : (
        <Tab.Pane
          {...props}
          className="g-4 bg-2nd-color m-2 px-3 py-3 rounded-4"
        >
          <CustomTable
            headers={headers}
            records={records}
            handleRecordDoubleClick={handleRecordDoubleClick}
            datetimeFields={datetimeFields}
            objectFields={objectFields}
            statusFetching={statusOrderFetching}
            showPagination={true}
            customTableColor={styles.admin_header_tables}
          />
          <CustomModal
            setOpen={setShow}
            open={show}
            selectedId={selectedId}
            headerTitle="Order"
            customerModalColor="bg-pressed-color text-light"
          >
            <OrderDetails
              {...props}
              customTableColor={styles.admin_header_tables}
            />
          </CustomModal>
        </Tab.Pane>
      )}
    </>
  );
};

export default Order;
