import { Button, Modal } from "react-bootstrap";
import React from "react";

const CustomModal = ({
  handleOk,
  setOpen,
  open,
  selectedId,
  children,
  showCancelBtn,
  showOKBtn,
  headerTitle,
}) => {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      show={open}
      onHide={() => setOpen(false)}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
      size="xl"
      animation
      fullscreen="lg-down"
    >
      <Modal.Header closeButton className="bg-pressed-color text-light">
        <Modal.Title id="example-custom-modal-styling-title">
          {headerTitle} {selectedId}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children &&
          React.cloneElement(children, {
            Id: selectedId,
            setOpen: setOpen,
          })}
      </Modal.Body>
      <Modal.Footer>
        <Button className="bg-pressed-color text-light" onClick={handleClose}>
          {showCancelBtn ? "Cancel" : "Close"}
        </Button>
        {showOKBtn ? (
          <Button
            className="bg-pressed-color text-light"
            onClick={(e) => handleOk(e, selectedId)}
          >
            OK
          </Button>
        ) : null}
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
