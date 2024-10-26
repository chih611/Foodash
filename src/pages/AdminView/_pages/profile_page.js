import { useState, useEffect } from "react";
import { Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "../_components/table";
import CustomModal from "../_components/modal";
import {
  getAllCustomers,
  createCustomer,
  updateCustomer,
} from "../../../../store/slices/customerSlice";
import CustomerProfileDetails from "./profile_details";
import CustomerProfileCreate from "./profile_create";
const CustomerProfile = (props) => {
  const [showCustomerDetailsModal, setShowCustomerDetailsModal] =
    useState(false);
  const [showCreateCustomerModal, setShowCreateCustomerModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const dispatch = useDispatch();

  let headers = [];
  let records = [];

  // Fetch customers from state
  const customers = useSelector((state) => state.customer.allCustomers);
  const statusFetching = useSelector((state) => state.customer.status);

  const handleCreateClick = () => {
    setShowCreateCustomerModal(true); // Show the modal when "Create Customer" is clicked
  };

  // Prepare records for the table
  if (customers) {
    customers.map((item) => {
      headers.push(Object.keys(item));
    });
    records = customers;
  }

  // Fetch customer details when the selected ID changes
  useEffect(() => {
    if (selectedCustomerId) {
      const selectedCustomer = customers.find(
        (customer) => customer.CUSTOMER_ID === selectedCustomerId
      );
      setSelectedCustomer(selectedCustomer);
    }
  }, [selectedCustomerId, customers]);

  // Handle double-click on record to show details
  const handleRecordDoubleClick = ({ CUSTOMER_ID }) => {
    setSelectedCustomerId(CUSTOMER_ID);
    setShowCustomerDetailsModal(true);
  };

  return (
    <>
      <Tab.Pane {...props} className="g-4 bg-2nd-color m-2 px-3 py-3 rounded-4">
        <CustomTable
          headers={headers}
          records={records}
          handleRecordDoubleClick={handleRecordDoubleClick}
          onCreateClick={handleCreateClick} // Pass the handleCreateClick function
          statusFetching={statusFetching}
          showCreateButton={false}
          customTableColor="bg-pressed-color text-light"
        />

        {/* Customer Details Modal */}
        <CustomModal
          setOpen={setShowCustomerDetailsModal}
          open={showCustomerDetailsModal}
          selectedId={selectedCustomerId}
          headerTitle="Customer Details"
          customTableColor="bg-pressed-color text-light"
        >
          <CustomerProfileDetails
            {...props}
            customerData={selectedCustomer}
            customTableColor="bg-pressed-color text-light"
          />
        </CustomModal>

        {/* Create Customer Modal */}
        <CustomModal
          setOpen={setShowCreateCustomerModal}
          open={showCreateCustomerModal}
          headerTitle="Create New Customer"
          customTableColor="bg-pressed-color text-light"
        >
          <CustomerProfileCreate setOpen={setShowCreateCustomerModal} />
        </CustomModal>
      </Tab.Pane>
    </>
  );
};

export default CustomerProfile;
