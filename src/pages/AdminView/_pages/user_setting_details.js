import { useState, useEffect } from "react";
import { Tab, Modal, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "../_components/table";
import UserSettingDetails from "./user_setting_details";
import {
  fetchAllAdmins,
  createAdmin,
} from "../../../../store/slices/adminSlice";

const UserSetting = (props) => {
  const [show, setShow] = useState(false);
  const [showCreateAdminModal, setShowCreateAdminModal] = useState(false); // State for showing the create form
  const [selectedId, setSelectedId] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const [newAdminData, setNewAdminData] = useState({
    ADMIN_NAME: "",
    ADMIN_EMAIL: "",
    ADMIN_TYPE: "Admin",
    ADMIN_PASSWORD: "",
  });

  const dispatch = useDispatch();

  const admins = useSelector((state) => state.admin.admins);
  const statusFetching = useSelector((state) => state.admin.status);

  useEffect(() => {
    if (selectedId) {
      const selectedAdmin = admins.find(
        (admin) => admin.ADMIN_ID === selectedId
      );
      setAdminData(selectedAdmin);
    }
  }, [selectedId, admins]);

  const handleRecordDoubleClick = ({ ADMIN_ID }) => {
    setSelectedId(ADMIN_ID);
    setShow(true);
  };

  const handleCreateClick = () => {
    setShowCreateAdminModal(true);
  };

  const handleCreateAdminSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createAdmin(newAdminData));
      setShowCreateAdminModal(false); // Close the modal after successful creation
      setNewAdminData({
        ADMIN_NAME: "",
        ADMIN_EMAIL: "",
        ADMIN_TYPE: "Admin",
        ADMIN_PASSWORD: "",
      });
      dispatch(fetchAllAdmins()); // Refresh the list of admins
    } catch (error) {
      console.error("Error creating admin:", error);
    }
  };

  return (
    <>
      <Tab.Pane {...props} className="g-4 bg-2nd-color m-2 px-3 py-3 rounded-4">
        <CustomTable
          headers={headers}
          records={records}
          handleRecordDoubleClick={handleRecordDoubleClick}
          statusFetching={statusFetching}
          showCreateButton={true}
          onCreateClick={handleCreateClick} // Pass the click handler
          customTableColor="bg-pressed-color text-light"
        />

        {/* Modal for Editing Admin */}
        <CustomModal
          setOpen={setShow}
          open={show}
          selectedId={selectedId}
          headerTitle="Admin Settings"
          customTableColor="bg-pressed-color text-light"
        >
          <UserSettingDetails
            {...props}
            adminData={adminData}
            customTableColor="bg-pressed-color text-light"
          />
        </CustomModal>

        {/* Modal for Creating Admin */}
        <Modal
          show={showCreateAdminModal}
          onHide={() => setShowCreateAdminModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create New Admin</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleCreateAdminSubmit}>
              <Form.Group controlId="adminName">
                <Form.Label>Admin Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter admin name"
                  value={newAdminData.ADMIN_NAME}
                  onChange={(e) =>
                    setNewAdminData({
                      ...newAdminData,
                      ADMIN_NAME: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="adminEmail">
                <Form.Label>Admin Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter admin email"
                  value={newAdminData.ADMIN_EMAIL}
                  onChange={(e) =>
                    setNewAdminData({
                      ...newAdminData,
                      ADMIN_EMAIL: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="adminPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={newAdminData.ADMIN_PASSWORD}
                  onChange={(e) =>
                    setNewAdminData({
                      ...newAdminData,
                      ADMIN_PASSWORD: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="adminType">
                <Form.Label>Admin Type</Form.Label>
                <Form.Control
                  as="select"
                  value={newAdminData.ADMIN_TYPE}
                  onChange={(e) =>
                    setNewAdminData({
                      ...newAdminData,
                      ADMIN_TYPE: e.target.value,
                    })
                  }
                >
                  <option>Admin</option>
                  <option>Moderator</option>
                </Form.Control>
              </Form.Group>
              <Button type="submit" className="mt-3">
                Create Admin
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Tab.Pane>
    </>
  );
};

export default UserSetting;
