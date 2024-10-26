import { Card, Col, Row, Tab, Dropdown, Button } from "react-bootstrap";
import { useState, useEffect, memo } from "react";

import Link from "next/link";

import FilterListOutlined from "@mui/icons-material/FilterListOutlined";
import AssignmentRounded from "@mui/icons-material/AssignmentRounded";
import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import CalendarTracking from "../_components/calendar";
import {
  fetchOrderList,
  fetchOrderListByToday,
} from "../../../../store/actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import { format, parseISO } from "date-fns";
import { SwapVertRounded } from "@mui/icons-material";
import CustomTable from "../_components/table";
import CustomModal from "../_components/modal";
import OrderDetails from "./order_details";

// import { ReportCategory } from "./reportCategory";

const Report = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(props);
    dispatch(fetchOrderList());
    dispatch(fetchOrderListByToday());
  }, []);

  const orderList = useSelector((state) => state.order.ordersList);
  const orderListToday = useSelector((state) => state.order.orderListByToday);
  const statusOrderListToday = useSelector((state) => state.order.status);

 //Declaring
  let headersOrderList = [];
  const datetimeFields = ["Duedate", "Create Date"];

  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  if (orderListToday) {
    orderListToday.map((item) => {
      headersOrderList?.push(Object.keys(item));
    });
  }

  //Handler func()
  const handleRecordDoubleClick = ({ ID }) => {
    setSelectedId(ID);
    setShow(true);
  };

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

  //use today filter for orderList with updated date, created date or due date are: today _ JUST need 2 collumn: ORDER_ID & STATUS, Order Amount or Recurring Status

  const today = format(new Date(), "yyyy.MM.dd");
  console.log(today);
  // Filter orders to include only today's orders
  // Ensure orderList is an array, and filter today's orders based on the Create Date
  const todaysOrders = Array.isArray(orderList)
    ? orderList.filter((order) => {
        // Parse the order's Create Date and format it to 'YYYY.MM.DD'
        const formattedCreateDate = format(
          parseISO(order["Create Date"]),
          "yyyy.MM.dd"
        );
        const formattedDueDate = format(parseISO(order.Duedate), "yyyy.MM.dd");

        // Check if either date matches today's date
        return formattedCreateDate === today || formattedDueDate === today;
      })
    : [];

  return (
    <>
      <Tab.Pane
        {...props}
        className="g-4 bg-2nd-color mt-1 px-3 py-3 rounded-4"
      >
        <Row xs={1} md={2} className="my-2 justify-content-around">
          {/* What 's on today, Report by Category and Item */}

          <Col lg={5}>
            {/* What 's on Today */}
            <Card className="rounded-4">
              <Card.Body>
                <Card.Title className="subtitle_admin">
                  <AssignmentRounded className="mx-2" />
                  What's on Today
                </Card.Title>
                <CustomTable
                  headers={headersOrderList}
                  records={orderListToday ? orderListToday : []}
                  handleRecordDoubleClick={handleRecordDoubleClick}
                  datetimeFields={datetimeFields}
                  statusFetching={statusOrderListToday}
                />
              </Card.Body>
              <CustomModal
                setOpen={setShow}
                open={show}
                selectedId={selectedId}
                headerTitle="Order"
              >
                <OrderDetails {...props} />
              </CustomModal>
            </Card>

            {/* Sales By Category */}
            <Card className="rounded-4 my-4">
              <Card.Body>
                <Card.Title className="subtitle_admin mb-3">
                  Sales By Category
                </Card.Title>
                <Link href="./AdminView/ReportCategory">
                  <Button variant="primary">View Report</Button>
                </Link>

                <label className="font-medium text-gray-700 ms-4">
                  This month: {getMonthName(startDate)}
                </label>

                <CustomTable
                  headers={headersOrderList}
                  records={orderListToday ? orderListToday : []}
                  handleRecordDoubleClick={handleRecordDoubleClick}
                  datetimeFields={datetimeFields}
                  statusFetching={statusOrderListToday}
                />
              </Card.Body>
            </Card>

            {/* General Report */}
            <Card className="rounded-4">
              <Card.Body>
                <Card.Title className="subtitle_admin">Sales Report</Card.Title>
                <Dropdown className="my-3">
                  <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    This month
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">This Week</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">This Quater</Dropdown.Item>
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
export default memo(Report);
