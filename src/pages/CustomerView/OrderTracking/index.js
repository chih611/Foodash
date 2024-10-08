import HomePageNavBar from "../HomePage/HomePageNavBar";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded"
import Link from "next/link";
import { Container, Row, Col, Button } from "react-bootstrap";
import OrderList from "./OrderList";

import OrderFilter from "./OrderFilter";
import OrderFilter_desktop from "./OrderrFilter_desktop"
import RecentOrder from "./RecentOrder"

const OrderTracking = () => {
  return (
    <div>
      <div className="navBar" style={{ marginBottom: "150px" }}>
          <HomePageNavBar />
      </div>
      <div className="container">
        {/* Desktop View */}
        <Row className="d-none justify-content-center d-lg-flex">
          <div className="col-md-1">
            <Link href="/CustomerView/HomePage/HomePage" legacyBehavior passHref>
                        <a className="d-flex align-items-center text-decoration-none">
                          <div className="account-button me-2">
                            <ArrowBackRounded sx={{ color: "#025373" }} />
                          </div>
                        </a>
            </Link> 
          </div>
          <div className="col-md-3"></div>
          <div className="col-md-8" >
              <h1>Order Management</h1>
          </div> 
        </Row>

        {/* Desktop View - List of orders */}
        <Row className="d-none justify-content-center d-lg-flex w-100">
          <OrderFilter_desktop />
        </Row>
        <Row>
          <OrderList />
          <RecentOrder />
        </Row>

        {/* Back to home button */}
        <Row className="w-100 my-5">
          <Link
            href="/CustomerView/HomePage/HomePage"
            legacyBehavior passHref>

            <a className="w-100">
              <Button variant="primary" className="w-100">Back to Home</Button>
            </a>
          </Link>
        </Row>



        {/* Mobile View - side bar (Name and Return button)*/}
        
        <Row className="d-flex justify-content-center d-lg-none"> 
          <Col xs = {1} className="d-flex justify-content-center">
            <Link href="/CustomerView/HomePage/HomePage" legacyBehavior passHref>
                <a className="d-flex align-items-center text-decoration-none">
                    <div className="account-button me-2">
                      <ArrowBackRounded sx={{ color: "#025373" }} />
                    </div>
                </a>
            </Link> 
          </Col>
          <Col xs = {2}></Col>
          <Col xs = {8} className="d-flex justify-content-center">
            <h2>Order Management</h2>
          </Col>
        </Row>

        {/* Mobile View - List of orders */}
        <Row className="d-flex justify-content-center d-lg-none">
          <Col className="w-100 d-flex justify-content-center">
            <OrderFilter />
          </Col>          
        </Row>


      </div>
    </div>
  );
};

export default OrderTracking;
