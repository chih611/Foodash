import { Button, Modal } from "react-bootstrap";
import OrderDetails from "../_pages/order_details";

const CustomModal = ({ setShow, show, selectedId }) => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
      size="xl"
      animation
    >
      <Modal.Header closeButton className="bg-pressed-color text-light">
        <Modal.Title id="example-custom-modal-styling-title">
          Order {selectedId}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <OrderDetails orderId={selectedId} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button className="bg-pressed-color text-light" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
