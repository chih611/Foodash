import React, { useState } from "react";
import {
  Table,
  Button,
  Tab,
  Modal,
  Form,
  Row,
  Col,
  Nav,
} from "react-bootstrap";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DateRangeIcon from "@mui/icons-material/DateRange";
import SortIcon from "@mui/icons-material/Sort";

// Main Profile Component
const Profile = (props) => {
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Example customer and order data
  const customers = [
    {
      id: "#20462",
      name: "ABC",
      dietary: "Vegetarian",
      orders: 3,
      company: "Company A",
      business: "Business A",
      email: "abc@example.com",
      phone: "123456789",
      address: "123 ABC Street",
      loyaltyPoints: 50,
    },
    {
      id: "#18933",
      name: "DEF",
      dietary: "Gluten-Free",
      orders: 5,
      company: "Company B",
      business: "Business B",
      email: "def@example.com",
      phone: "987654321",
      address: "456 DEF Street",
      loyaltyPoints: 75,
    },
    {
      id: "#45169",
      name: "GHI",
      dietary: "None",
      orders: 10,
      company: "Company C",
      business: "Business C",
      email: "ghi@example.com",
      phone: "456789123",
      address: "789 GHI Street",
      loyaltyPoints: 25,
    },
    {
      id: "#34304",
      name: "JKL",
      dietary: "Vegan",
      orders: 7,
      company: "Company D",
      business: "Business D",
      email: "jkl@example.com",
      phone: "321654987",
      address: "321 JKL Street",
      loyaltyPoints: 100,
    },
    {
      id: "#17188",
      name: "MNO",
      dietary: "Gluten-Free",
      orders: 14,
      company: "Company E",
      business: "Business E",
      email: "mno@example.com",
      phone: "159753456",
      address: "456 MNO Street",
      loyaltyPoints: 60,
    },
    {
      id: "#73003",
      name: "PQR",
      dietary: "Vegetarian",
      orders: 15,
      company: "Company F",
      business: "Business F",
      email: "pqr@example.com",
      phone: "753159852",
      address: "789 PQR Street",
      loyaltyPoints: 30,
    },
  ];

  const orders = [
    {
      id: "#20462",
      payment: "PayPal",
      status: "Completed",
      total: 378.9,
      deliveryDate: "October 3, 2024",
      products: [
        {
          name: "Mini Mezze",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          price: 13.5,
          quantity: 8,
        },
        {
          name: "Mini Mezze",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          price: 38.2,
          quantity: 3,
        },
      ],
    },
    {
      id: "#18933",
      payment: "Credit Card",
      status: "Completed",
      total: 562.03,
      deliveryDate: "October 2, 2024",
      products: [],
    },
    {
      id: "#45169",
      payment: "Cash",
      status: "Pending",
      total: 609.9,
      deliveryDate: "October 1, 2024",
      products: [],
    },
    {
      id: "#34304",
      payment: "PayPal",
      status: "Pending",
      total: 863.8,
      deliveryDate: "September 30, 2024",
      products: [],
    },
    {
      id: "#17188",
      payment: "PayPal",
      status: "Cancelled",
      total: 873.8,
      deliveryDate: "September 29, 2024",
      products: [],
    },
  ];

  // Function to open the Customer Details modal
  const handleViewCustomerDetails = (customer) => {
    setSelectedCustomer(customer);
    setShowCustomerDetails(true);
  };

  // Function to close the Customer Details modal
  const handleCloseCustomerDetails = () => {
    setShowCustomerDetails(false);
    setSelectedCustomer(null);
  };

  // Function to open the Order History modal
  const handleOrderHistoryClick = (customerId) => {
    setSelectedCustomerId(customerId);
    setOrderHistory(orders); // Example: set orders for the selected customer
    setShowOrderHistory(true);
  };

  // Function to close the Order History modal
  const handleClose = () => {
    setShowOrderHistory(false);
    setSelectedCustomerId(null);
    setOrderHistory([]);
  };

  // Function to open the detailed order view
  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  // Function to close the detailed order view
  const handleCloseOrderDetails = () => {
    setShowOrderDetails(false);
    setSelectedOrder(null);
  };

  // Function to get filtered orders based on the selected filter
  const getFilteredOrders = () => {
    if (filter === "all") return orders;
    return orders.filter((order) => order.status.toLowerCase() === filter);
  };

  // Function to get the dietary class based on the dietary type
  const getDietaryClass = (dietary) => {
    switch (dietary) {
      case "Vegetarian":
        return "dietary-tag vegetarian-tag";
      case "Gluten-Free":
        return "dietary-tag glutenfree-tag";
      case "Vegan":
        return "dietary-tag vegan-tag";
      case "None":
        return "dietary-tag none-tag";
      default:
        return "dietary-tag default-tag";
    }
  };

  return (
    <Tab.Pane {...props}>
      <div className="crm-container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="crm-title">Customer List</h1>
          <Button variant="primary" className="add-btn">
            Add Customer
          </Button>
        </div>

        <Table striped bordered hover responsive className="customer-table">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Dietary</th>
              <th>Order History</th>
              <th>Recommend</th>
              <th>Details</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>
                  <AccountCircleIcon className="customer-icon" />{" "}
                  {customer.name}
                </td>
                <td>
                  <span className={getDietaryClass(customer.dietary)}>
                    {customer.dietary}
                  </span>
                </td>
                <td>
                  <Button
                    variant="primary"
                    className="order-history-btn"
                    onClick={() => handleOrderHistoryClick(customer.id)}
                  >
                    {customer.orders} Orders
                  </Button>
                </td>
                <td>
                  <Button variant="link">
                    <LibraryAddIcon />
                  </Button>
                </td>
                <td>
                  <Button
                    variant="info"
                    className="view-btn"
                    onClick={() => handleViewCustomerDetails(customer)}
                  >
                    View
                  </Button>
                </td>
                <td>
                  <Button variant="link">
                    <EditIcon />
                  </Button>
                  <Button variant="link" className="text-danger">
                    <DeleteIcon />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Customer Details Modal */}
        <CustomerDetailsModal
          show={showCustomerDetails}
          onHide={handleCloseCustomerDetails}
          customer={selectedCustomer}
        />

        {/* Order History Modal */}
        <OrderHistoryModal
          show={showOrderHistory}
          onHide={handleClose}
          customerId={selectedCustomerId}
          orderHistory={orderHistory}
          onViewDetails={handleViewOrderDetails}
        />

        {/* Order Details Modal */}
        {selectedOrder && (
          <OrderDetailsModal
            show={showOrderDetails}
            onHide={handleCloseOrderDetails}
            order={selectedOrder}
          />
        )}
      </div>
    </Tab.Pane>
  );
};

// Modal for Customer Details
const CustomerDetailsModal = ({ show, onHide, customer }) => {
  if (!customer) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Customer Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Customer ID</Form.Label>
              <Form.Control type="text" value={customer.id} readOnly />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Dietary References</Form.Label>
              <Form.Control type="text" value={customer.dietary} readOnly />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Company Name</Form.Label>
              <Form.Control type="text" value={customer.company} readOnly />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Loyalty Points</Form.Label>
              <Form.Control
                type="text"
                value={customer.loyaltyPoints}
                readOnly
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Business Name</Form.Label>
              <Form.Control type="text" value={customer.business} readOnly />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={customer.email} readOnly />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" value={customer.phone} readOnly />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control as="textarea" value={customer.address} readOnly />
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Modal for Order History with tabs and filters
const OrderHistoryModal = ({
  show,
  onHide,
  customerId,
  orderHistory,
  onViewDetails,
}) => {
  const [activeTab, setActiveTab] = useState("all");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  // Filter orders based on active tab
  const filterOrders = (orders) => {
    switch (activeTab) {
      case "pending":
        return orders.filter((order) => order.status === "Pending");
      case "completed":
        return orders.filter((order) => order.status === "Completed");
      case "cancelled":
        return orders.filter((order) => order.status === "Cancelled");
      default:
        return orders;
    }
  };

  const filteredOrders = filterOrders(orderHistory);

  return (
    <Modal show={show} onHide={onHide} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Order History for Customer {customerId}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab.Container activeKey={activeTab} onSelect={handleTabChange}>
          <Row className="mb-3">
            <Col>
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="all">
                    All Orders ({orderHistory.length})
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="pending">
                    Pending (
                    {
                      orderHistory.filter((order) => order.status === "Pending")
                        .length
                    }
                    )
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="completed">
                    Completed (
                    {
                      orderHistory.filter(
                        (order) => order.status === "Completed"
                      ).length
                    }
                    )
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="cancelled">
                    Cancelled (
                    {
                      orderHistory.filter(
                        (order) => order.status === "Cancelled"
                      ).length
                    }
                    )
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>

          {/* Separator Line */}
          <hr />

          {/* Search and Filter Bar */}
          <Row className="mb-3 align-items-center">
            <Col md={5}>
              <Form.Control
                type="text"
                placeholder="Search for id, name, email, etc."
              />
            </Col>
            <Col md={3}>
              <Button variant="outline-primary" className="filter-btn">
                <DateRangeIcon /> From: DD-MM-YYYY
              </Button>
            </Col>
            <Col md={3}>
              <Button variant="outline-primary" className="filter-btn">
                <DateRangeIcon /> To: DD-MM-YYYY
              </Button>
            </Col>
            <Col md={1}>
              <Button variant="outline-primary" className="filter-btn">
                <SortIcon /> Sort By
              </Button>
            </Col>
          </Row>

          {/* Orders Table */}
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Total</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.payment}</td>
                  <td>
                    <span
                      className={`badge badge-${order.status.toLowerCase()}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>${order.total}</td>
                  <td>
                    <Button
                      variant="info"
                      className="view-btn"
                      onClick={() => onViewDetails(order)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab.Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Modal for Order Details
const OrderDetailsModal = ({ show, onHide, order }) => {
  if (!order) return null;

  return (
    <Modal show={show} onHide={onHide} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Order History</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <Col>
            <strong>Order ID:</strong> {order.id}
          </Col>
          <Col>
            <strong>Delivery Date:</strong> {order.deliveryDate || "N/A"}
          </Col>
          <Col>
            <strong>Payment Method:</strong> {order.payment}
          </Col>
          <Col className="text-end">
            <Button variant="info">View Invoice</Button>
          </Col>
        </Row>

        {/* Products Table */}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Product</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {order.products && order.products.length > 0 ? (
              order.products.map((product, index) => (
                <tr key={index}>
                  <td>
                    {/* Placeholder for product image */}
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: "#ddd",
                      }}
                    ></div>
                  </td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>${product.price.toFixed(2)}/pack</td>
                  <td>{product.quantity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No products available for this order.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Profile;
