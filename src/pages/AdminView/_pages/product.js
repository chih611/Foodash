import { useEffect, useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import CustomTable from "../_components/table";
import ProductDetails from "./product_details";
import CustomModal from "../_components/modal";
import NewProduct from "../_components/inputProduct";
import CustomInput from "../_components/input";
import { Tab, Button } from "react-bootstrap";
import { fetchAdminItems } from "../../../../store/actions/itemAction";

const Product = (props) => {
  const [showPro, setShowPro] = useState(false);
  // const [alertConfirm, setAlertConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const dispatch = useDispatch();
  let headers = [];
  let records = [];
  const customFields = ["Duedate", "Create Date"];
  // pop up modal to show the add_new_customer function
  const [showAddCustomer, setShowAddCustomer] = useState(false);

  //Get data
  useEffect(() => {
    dispatch(fetchAdminItems()); // Fetch all items initially
  }, [dispatch]);
  const items = useSelector((state) => state.items.itemAdmin);
  const status = useSelector((state) => state.items.status);
  //Get colunms of headers name
  if (items) {
    items.map((item) => {
      headers.push(Object.keys(item));
    });
    records = items;
  }

  const handleRecordDoubleClick = ({ ID }) => {
    setSelectedId(ID);
    setShowPro(true);
  };

  // Handlers for add customer modal button
  const handleCloseAddCustomer = () => setShowAddCustomer(false);
  const handleShowAddCustomer = () => setShowAddCustomer(true);

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
      <Tab.Pane {...props} className="g-4 bg-2nd-color m-2 px-3 py-3 rounded-4">
        <Button
          variant="primary"
          className="add-btn"
          onClick={handleShowAddCustomer}
        >
          Add Item
        </Button>
        {/* Add Customer Modal - Using React Bootstrap */}
        <NewProduct
          show={showAddCustomer}
          onHide={handleCloseAddCustomer}
          backdrop="static"
          keyboard={false}
        />

        <CustomTable
          headers={headers}
          records={records}
          handleRecordDoubleClick={handleRecordDoubleClick}
          datetimeFields={customFields}
          statusFetching={status}
          customTableColor="bg-pressed-color text-light"
          showPagination={true}
        />

        <CustomModal
          setOpen={setShowPro}
          open={showPro}
          selectedId={selectedId}
          headerTitle="Product"
        >
          <ProductDetails {...props} Id={selectedId} />
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

export default Product;
