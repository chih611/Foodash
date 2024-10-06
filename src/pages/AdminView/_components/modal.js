import { Button, Modal } from "react-bootstrap";
import React from "react";

const CustomModal = ({ setShow, show, selectedId, children }) => {
  const handleClose = () => setShow(false);
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
        {children && React.cloneElement(children, { orderId: selectedId })}
      </Modal.Body>
      <Modal.Footer>
        <Button className="bg-pressed-color text-light" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
