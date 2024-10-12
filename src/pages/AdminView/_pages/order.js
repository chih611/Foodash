import { useEffect, useState } from "react";
import { Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderList } from "../../../../store/actions/orderAction";
import CustomTable from "../_components/table";
import OrderDetails from "./order_details";
import CustomModal from "../_components/modal";

const Order = (props) => {
  const [show, setShow] = useState(false);
  // const [alertConfirm, setAlertConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const dispatch = useDispatch();
  let headers = [];
  let records = [];
  const customFields = ["Duedate", "Create Date"];

  useEffect(() => {
    dispatch(fetchOrderList());
  }, []);

  //Get data
  const orderList = useSelector((state) => state.order.ordersList);
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

  // const handleOk = async (e, selectedId) => {
  //   e.preventDefault();
  //   setAlertConfirm(false);
  //   try {
  //     const response = await axios.delete(
  //       `${BASE_URL}/order/delete/${selectedId}`
  //     );

  //     if (response.status === 200) {
  //       dispatch(fetchOrderList());
  //     } else {
  //       return rejectWithValue("Failed to update data!");
  //     }
  //   } catch (error) {
  //     console.error("Error updating data", error);
  //   }
  // };
  return (
    <>
      <Tab.Pane {...props}>
        <CustomTable
          headers={headers}
          records={records}
          handleRecordDoubleClick={handleRecordDoubleClick}
          customFields={customFields}
          statusFetching={statusOrderFetching}
        />
        <CustomModal
          setOpen={setShow}
          open={show}
          selectedId={selectedId}
          headerTitle="Order"
        >
          <OrderDetails {...props} />
        </CustomModal>
        {/* <CustomModal
          handleOk={handleOk}
          setOpen={setAlertConfirm}
          open={alertConfirm}
          selectedId={selectedId}
          showCancelBtn={true}
          showOKBtn={true}
          headerTitle="Order"
        >
          <ConfirmationAlert {...props} elementName="order" />
        </CustomModal> */}
      </Tab.Pane>
    </>
  );
};

export default Order;
