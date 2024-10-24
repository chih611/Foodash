import { useState, useEffect } from "react";
import { Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "../_components/table";
import UserSettingDetails from "./user_setting_details"; // New details component
import CustomModal from "../_components/modal";
import { fetchAllAdmins } from "../../../../store/slices/adminSlice";

const UserSetting = (props) => {
  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [adminData, setAdminData] = useState(null);
  const dispatch = useDispatch();

  let headers = [];
  let records = [];

  // Fetch admins from state
  const admins = useSelector((state) => state.admin.admins);
  const statusFetching = useSelector((state) => state.admin.status);

  // Prepare records for the table
  if (admins) {
    admins.map((item) => {
      headers.push(Object.keys(item));
    });
    records = admins;
  }

  // Fetch data on mount
  useEffect(() => {
    if (selectedId) {
      const selectedAdmin = admins.find(
        (admin) => admin.ADMIN_ID === selectedId
      );
      setAdminData(selectedAdmin);
    }
  }, [selectedId, admins]);

  // Handle double-click on record to show details
  const handleRecordDoubleClick = ({ ADMIN_ID }) => {
    setSelectedId(ADMIN_ID);
    setShow(true);
  };

  return (
    <>
      <Tab.Pane {...props} className="g-4 bg-2nd-color m-2 px-3 py-3 rounded-4">
        <CustomTable
          headers={headers}
          records={records}
          handleRecordDoubleClick={handleRecordDoubleClick}
          statusFetching={statusFetching}
          customTableColor="bg-pressed-color text-light"
        />
        <CustomModal
          setOpen={setShow}
          open={show}
          selectedId={selectedId}
          headerTitle="Admin Settings"
          customTableColor="bg-pressed-color text-light"
        >
          <UserSettingDetails
            {...props}
            adminData={adminData} // Pass the selected admin ID
            customTableColor="bg-pressed-color text-light"
          />
        </CustomModal>
      </Tab.Pane>
    </>
  );
};

export default UserSetting;
