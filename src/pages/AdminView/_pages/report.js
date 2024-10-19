import { Card, Col, Row, Tab, Dropdown, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

import Link from "next/link";

import FilterListOutlined from "@mui/icons-material/FilterListOutlined";
import AssignmentRounded from "@mui/icons-material/AssignmentRounded";
import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import CalendarTracking from "../_components/calendar";
import { fetchOrderList, fetchOrderListByDuedate } from "../../../../store/actions/orderAction";
import { useDispatch, useSelector } from "react-redux";

// import { ReportCategory } from "./reportCategory";

const Report = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrderList());
  }, []);
  const orderList = useSelector((state) => state.order.ordersList);
  const categories = [
    { id: "111", name: "EAT", stock: "11000", sold: "123", expired: "108" },
    { id: "112", name: "FOOD", stock: "12000", sold: "123", expired: "180" },
    { id: "113", name: "COFFEE", stock: "11000", sold: "123", expired: "188" },
    { id: "114", name: "DRINK", stock: "10100", sold: "123", expired: "18" },
  ];

  const payments = [
    { id: "1", name: "Total Collected", amount: "$5,080.40" },
    { id: "2", name: "Cash", amount: "$863.80" },
    { id: "3", name: "Card", amount: "$4211,94" },
    { id: "4", name: "Other", amount: "$0.00" },
    { id: "5", name: "Gift Card", amount: "$0.00" },
    { id: "6", name: "Fees", amount: "-$67.59" },
    { id: "7", name: "Net Total", amount: "$5.007.31" },
  ];

  const orders = [
    { id: "147", status: "new", create_date: "08.10.2024" },
    { id: "148", status: "new", create_date: "08.10.2024" },
    { id: "149", status: "new", create_date: "09.10.2024" },
    { id: "150", status: "new", create_date: "10.10.2024" },
  ];
  // sorted by date

  // set up date range picker
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [selectedEvent, setSelectedEvent] = useState(null); // Track selected event

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const getMonthName = (date) => {
    return new Date().toLocaleString("default", { month: "long" });
  };
  // Handle event click
  const handleEventClick = (event) => {
    setSelectedEvent(event); // Set selected event details
    setShowModal(true); // Show the modal with event details
  };
  return (
    <>
      <Tab.Pane {...props} className="g-4 bg-2nd-color m-2 px-3 py-3 rounded-4">
        <Row xs={1} md={2} className="my-2 justify-content-around">
          {/* What 's on today, Report by Category and Item */}
          <Col lg={5}>
            {/* What 's on Today */}
            <div>
              <Card className="rounded-4">
                <Card.Body>
                  <Card.Title className="subtitle_admin">
                    <AssignmentRounded className="mx-2" />
                    What's on Today
                  </Card.Title>
                  <div
                    className="d-flex my-2 justify-content-around"
                    style={{ borderTop: "solid 1px #90B4CE" }}
                  >
                    {["Order ID", "Status", "Created Date"].map(
                      (header, index) => (
                        <div key={index} className="my-3">
                          <p className="my-2 subtitle">
                            {header}
                            <button mb-2>
                              {" "}
                              <FilterListOutlined />{" "}
                            </button>
                          </p>
                          {orders.map((order) => (
                            <p className="subtitle text-center" key={order.id}>
                              {index === 0
                                ? order.id
                                : index === 1
                                ? order.status
                                : index === 2
                                ? order.create_date
                                : cate.create_date}
                            </p>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                </Card.Body>
              </Card>
            </div>

            {/* Report Sale by category */}
            <div>
              <Card className="rounded-4 my-4">
                <Card.Body>
                  <Card.Title className="subtitle_admin mb-3">
                    Sales By Category
                  </Card.Title>
                  <Link href="AdminView/ReportCategory">
                    <Button variant="primary">View Report</Button>
                  </Link>

                  <label className="font-medium text-gray-700 ms-4">
                    This month: {getMonthName(startDate)}
                  </label>

                  <div
                    className="d-flex my-2 justify-content-around"
                    style={{ borderBottom: "solid 1px #90B4CE" }}
                  >
                    {["Product", "Stock", "Sold", "Expired in 30 days"].map(
                      (header, index) => (
                        <div key={index} className="my-3">
                          <p className="mb-3 subtitle">{header}</p>
                          {categories.map((cate) => (
                            <p className="subtitle text-center" key={cate.id}>
                              {index === 0
                                ? cate.name
                                : index === 1
                                ? cate.stock
                                : index === 2
                                ? cate.sold
                                : index === 3
                                ? cate.expired
                                : cate.expired}
                            </p>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                </Card.Body>
              </Card>
            </div>

            {/* Report Sales */}
            <div>
              <Card className="rounded-4">
                <Card.Body>
                  <Card.Title className="subtitle_admin">
                    Sales Report
                  </Card.Title>
                  <Dropdown className="my-3">
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                      This month
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">This Week</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        This Quater
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">This Year</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Card.Text className="my-3">
                    {payments.map((item) => (
                      <div
                        className="my-3 d-flex justify-content-between"
                        key={item.id}
                      >
                        <p className="subtitle mx-4">{item.name}</p>
                        <p className="subtitle mx-4">{item.amount}</p>
                      </div>
                    ))}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>

          {/* Tracking calendar */}

          <Col lg={7}>
            <Card className="rounded-4">
              <Card.Body>
                <Card.Title
                  className="subtitle_admin mb-3 pb-2"
                  style={{ borderBottom: "solid 1px #90B4CE" }}
                >
                  <CalendarMonthRounded className="mx-2" />
                  Order Tracking Calendar
                </Card.Title>

                <CalendarTracking
                  handleEventClick={handleEventClick}
                  showModal={showModal}
                  setShowModal={setShowModal}
                  setSelectedEvent={setSelectedEvent}
                  selectedEvent={selectedEvent}
                  events={orderList}
                ></CalendarTracking>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab.Pane>
    </>
  );
};

export default Report;
