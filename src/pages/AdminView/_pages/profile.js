import { useState } from "react";
import { Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const Profile = (props) => {
  const {} = props;
  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.customer.customer);
  const statusOrderFetching = useSelector((state) => state.customer.status);
  let headers = [];
  let records = [];

  return (
    <Tab.Pane {...props}>
      {/* <CustomTable
        headers={headers}
        records={records}
        handleRecordDoubleClick={handleRecordDoubleClick}
        datetimeFields={datetimeFields}
        statusFetching={statusOrderFetching}
        showPagination={true}
        customTableColor="bg-pressed-color text-light"
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
      </CustomModal> */}
    </Tab.Pane>
  );
};
export default Profile;
