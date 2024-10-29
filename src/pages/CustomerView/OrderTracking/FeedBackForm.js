import { useForm } from "react-hook-form";
import { Button, Form, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateOrder } from "../../../../store/actions/orderAction";

const FeedBackForm = ({ order, handleClose }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (order) {
      setShow(true);
    }
  }, [order]);

  const onSubmit = async (data) => {
    const feedbackData = {
      FEEDBACK: {
        rating: data.rating,
        comments: data.comments,
      },
    };

    // Combine the existing order data with the new feedback
    const updatedOrderData = {
      ...order, // Retain existing order details
      FEEDBACK: feedbackData.FEEDBACK, // Add or update the feedback field
    };

    try {
      console.log("Feedback Data:", feedbackData);
      console.log("Updated Order Data:", updatedOrderData);
      // Dispatch the updateOrder action
      await dispatch(
        updateOrder({
          orderId: order.ID,
          updatedData: updatedOrderData,
        })
      );

      console.log("Feedback submitted and order updated:", feedbackData);
      handleClose(); // Close the form after submission
      reset(); // Reset the form fields
    } catch (error) {
      console.error("Failed to update order with feedback:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Leave Feedback for Order #{order?.ID}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              placeholder="Rate out of 5"
              {...register("rating", { required: true, min: 1, max: 5 })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Comments</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write your feedback"
              {...register("comments")}
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Submit Feedback
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FeedBackForm;
