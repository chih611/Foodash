import { Button, Modal, Form, Alert } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createItem, fetchItems } from "../../../../store/slices/itemsSlice";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_ADDRESS;

const NewProduct = ({ show, onHide, backdrop, keyboard }) => {
  const dispatch = useDispatch();

  const [product, setProduct] = useState({
    name: "",
    quantity: "0",
    price: "0.00",
    category_id: "1",
    description: "",
    special: 0
  });

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setProduct(prev => ({
        ...prev,
        [name]: checked ? 1 : 0
      }));
    } else {
      setProduct(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const resetForm = () => {
    setProduct({
      name: "",
      quantity: "",
      price: "",
      category_id: "",
      description: "",
      special: 0
    });
    setMsg("");
    setError("");
  };

  const handleClose = () => {
    resetForm();
    onHide();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default"); // Replace with your preset name
    try {
      const response = await axios.post(
        `${BASE_URL}/upload_img`,
        formData
      );
      setImageUrl(response.data.secure_url); // Save the uploaded image URL
      const payload = {
        name: product.item_name,
        quantity: parseInt(product.quantity),
        price: parseFloat(product.price),
        category_id: parseInt(product.category_id),
        description: product.description || '',
        special: product.special,
        picture: response.data.url
      };

      await dispatch(createItem(payload)).unwrap();
      setMsg("Product Added Successfully");
      dispatch(fetchItems());
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err) {
      console.error('Submit Error:', err);
      setError(err.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop={backdrop}
      keyboard={keyboard}
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {msg && <Alert variant="success">{msg}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="item_name"
              value={product.item_name}
              onChange={handleChange}
              placeholder="Enter product name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
              min="0"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Unit Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Enter unit price"
              min="0"
              step="0.01"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category ID</Form.Label>
            <Form.Control
              type="number"
              name="category_id"
              value={product.category_id}
              onChange={handleChange}
              placeholder="Enter category ID"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows={3}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              id="special-status"
              name="special"
              label="Special Status"
              checked={product.special === 1}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control type="file" name="file" onChange={handleFileChange} accept="image/*" />
          </Form.Group>
          {imageUrl && (
            <div>
              <p>Uploaded Image:</p>
              <img src={imageUrl} alt="Uploaded" style={{ width: "200px" }} />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Product"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default NewProduct;