import HomePageNavBar from "../HomePage/HomePageNavBar";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import Link from "next/link";
import { Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { fetchOrderByCustomerId } from "../../../../store/actions/orderAction";
import OrderList from "./OrderList";
import { useSelector, useDispatch } from "react-redux";
import OrderFilter from "./OrderFilter";
import OrderFilter_desktop from "./OrderrFilter_desktop";
import RecentOrder from "./RecentOrder";
import CustomModal from "@/pages/AdminView/_components/modal";
import OrderDetails from "@/pages/AdminView/_pages/order_details";
const OrderTracking = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const customerId = useSelector(
    (state) => state.customer.profile?.CUSTOMER_ID
  );

  useEffect(() => {
    if (customerId) {
      dispatch(fetchOrderByCustomerId(customerId));
    }
  }, [customerId, dispatch]);

  const orderByCustomer = useSelector(
    (state) => state.order.orderListByCustomerId
  );

  if (!orderByCustomer || orderByCustomer.length === 0) {
    return <div>No Orders Available</div>;
  }

  const recentOrder = orderByCustomer[orderByCustomer.length - 1];

  // Handle order click for modal
  const handleOrderDoubleClick = (orderId) => {
    setSelectedOrderId(orderId);
    setShowModal(true);
  };

  return (
    <div>
      <div className="navBar" style={{ marginBottom: "150px" }}>
        <HomePageNavBar />
      </div>

      <div className="container">
        {/* Desktop View */}
        <Row className="d-none justify-content-center d-lg-flex">
          <div className="col-md-1">
            <Link href="/CustomerView/HomePage/" legacyBehavior passHref>
              <a className="d-flex align-items-center text-decoration-none">
                <div className="account-button me-2">
                  <ArrowBackRounded sx={{ color: "#025373" }} />
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
          <OrderFilter_desktop />
        </Row>
        <Row className="d-none d-lg-flex">
          <OrderList
            orders={orderByCustomer}
            onOrderDoubleClick={handleOrderDoubleClick}
          />
          <RecentOrder order={recentOrder} />
        </Row>

        {/* Mobile View */}
        <Row className="d-flex justify-content-center d-lg-none">
          <Col xs={12}>
            <h2>Order Management</h2>
          </Col>
          <Col xs={12}>
            <OrderFilter />
          </Col>
          <Col xs={12}>
            <OrderList
              orders={orderByCustomer}
              onOrderDoubleClick={handleOrderDoubleClick}
            />
            <RecentOrder order={recentOrder} />
          </Col>
        </Row>

        {/* Back to home button */}
        <Row className="w-100 my-5">
          <Link href="/CustomerView/HomePage" legacyBehavior passHref>
            <a className="w-100">
              <Button variant="primary" className="w-100">
                Back to Home
              </Button>
            </a>
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
        >
          <OrderDetails Id={selectedOrderId} setOpen={setShowModal} />
        </CustomModal>
      )}
    </div>
  );
};

export default OrderTracking;
