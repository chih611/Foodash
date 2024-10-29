import HomePageNavBar from "../HomePage/HomePageNavBar";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import Link from "next/link";
import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { fetchOrderByCustomerId } from "../../../../store/actions/orderAction";
import OrderList from "./OrderList";
import { useSelector, useDispatch } from "react-redux";
import OrderFilter from "./OrderFilter";
import OrderFilter_desktop from "./OrderFilter_desktop";
import RecentOrder from "./RecentOrder";
import PrimaryButton from "../ViewCart/_PrimaryButton";
import { useRouter } from "next/router";
import CustomModal from "@/pages/AdminView/_components/modal";
import OrderDetails from "@/pages/AdminView/_pages/order_details";
import HomeDirectionLink from "../HomePage/HomeDirectionLink/HomeDirectionLink";
import FeedBackForm from "./FeedBackForm";

const OrderTracking = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState([]); // Initialize as an empty array
  const router = useRouter();

  const customerId = useSelector(
    (state) => state.customer.profile?.CUSTOMER_ID
  );

  useEffect(() => {
    if (customerId) {
      dispatch(fetchOrderByCustomerId(customerId));
    }
  }, [customerId, dispatch]);

  const orderByCustomer = useSelector(
    (state) => state.order.orderListByCustomerId || [] // Ensure it's always an array
  );

  console.log(orderByCustomer);

  useEffect(() => {
    setFilteredOrders(orderByCustomer);
  }, [orderByCustomer]);

  const recentOrder =
    selectedOrder ||
    (filteredOrders.length > 0
      ? filteredOrders[filteredOrders.length - 1]
      : null);

  const handleOrderDoubleClick = (orderId) => {
    const clickedOrder = filteredOrders.find(
      (order) => order.ORDER_ID === orderId
    );
    setSelectedOrder(clickedOrder);
    setSelectedOrderId(orderId);
    setShowModal(true);
  };

  // Sort Orders by Delivery Date
  const handleSortByDate = (order) => {
    const sortedOrders = [...filteredOrders].sort((a, b) => {
      const dateA = new Date(a.DUEDATE);
      const dateB = new Date(b.DUEDATE);
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
    setFilteredOrders(sortedOrders);
  };

  // Filter Orders by Status
  const handleFilterByStatus = (status) => {
    const filtered = status
      ? orderByCustomer.filter(
          (order) => order.STATUS.toLowerCase() === status.toLowerCase()
        )
      : orderByCustomer; // Show all if no status is selected
    setFilteredOrders(filtered);
  };

  // Show feedback form
  const handleShowFeedbackForm = () => {
    setShowFeedbackForm(true);
  };

  // Close feedback form
  const handleCloseFeedbackForm = () => {
    setShowFeedbackForm(false);
  };

  // Redirect to Home if no customer ID
  if (!customerId) {
    return (
      <div className="container text-center my-5">
        <h2>You are not logged in</h2>
        <Link href="/CustomerView/HomePage" legacyBehavior passHref>
          <PrimaryButton
            variant="primary"
            text="Back to Home"
            className="w-100 text-decoration-none"
            onClick={() => {
              router.push("/CustomerView/HomePage");
            }}
          />
        </Link>
      </div>
    );
  }

  return (
    <div>
      <HomePageNavBar />

      <div className="container">
        {/* Desktop View */}
        <HomeDirectionLink />
        <Row className="d-none justify-content-center d-lg-flex">
          <div className="col-md-1">
            <Link href="/CustomerView/HomePage/" legacyBehavior passHref>
              <a className="d-flex align-items-center text-decoration-none">
                <div className="account-button me-2">
                  <ArrowBackRounded sx={{ color: "#fffffe" }} />
                </div>
              </a>
            </Link>
          </div>
          <div className="col-md-3"></div>
          <div className="col-md-8">
            <h1>Order Management</h1>
          </div>
        </Row>

        {/* Desktop View - List of orders */}
        <Row className="d-none justify-content-center d-lg-flex w-100">
          <OrderFilter_desktop
            onSortByDate={handleSortByDate}
            onFilterByStatus={handleFilterByStatus}
          />
        </Row>
        <Row className="d-none d-lg-flex">
          <OrderList
            orders={filteredOrders}
            onOrderDoubleClick={handleOrderDoubleClick}
          />
          {recentOrder && (
            <RecentOrder
              order={recentOrder}
              onLeaveFeedback={handleShowFeedbackForm}
            />
          )}
        </Row>

        {/* Mobile View */}
        <Row className="d-flex justify-content-center d-lg-none">
          <Col xs={12}>
            <h2>Order Management</h2>
          </Col>
          <Col xs={12}>
            <OrderFilter
              onSortByDate={handleSortByDate}
              onFilterByStatus={handleFilterByStatus}
            />
          </Col>
          <Col xs={12}>
            <OrderList
              orders={filteredOrders}
              onOrderDoubleClick={handleOrderDoubleClick}
            />
            {recentOrder && (
              <RecentOrder
                order={recentOrder}
                onLeaveFeedback={handleShowFeedbackForm}
              />
            )}
          </Col>
        </Row>

        {/* Back to home button */}
        <Row className="w-100 my-5">
          <Link href="/CustomerView/HomePage" passHref>
            <PrimaryButton
              variant="primary"
              text="Back to Home"
              className="w-100 text-decoration-none"
            />
          </Link>
        </Row>
      </div>

      {/* Modal to display order details */}
      {selectedOrderId && (
        <CustomModal
          setOpen={setShowModal}
          open={showModal}
          selectedId={selectedOrderId}
          headerTitle="Order Details"
          customTableColor="bg-headline-color"
        >
          <OrderDetails
            Id={selectedOrderId}
            setOpen={setShowModal}
            customTableColor="bg-headline-color"
            extraReadOnlyFields={[
              "Full Name",
              "Phone",
              "Address",
              "Email",
              "Duedate",
              "Create Date",
              "Recipient",
              "Deliver",
              "Payment",
              "Taxes",
              "Delivery Fee",
              "Service Fee",
              "UTENSIL",
              "Giftwrap",
              "Promotion",
              "Subtotal",
              "ORDER_ITEM_ID",
              "Total",
              "Status",
            ]}
          />
        </CustomModal>
      )}

      {/* Feedback Form Modal */}
      {showFeedbackForm && (
        <FeedBackForm
          order={recentOrder}
          handleClose={handleCloseFeedbackForm}
        />
      )}
    </div>
  );
};

export default OrderTracking;
