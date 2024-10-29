import { Card, Col, Row, Tab, Dropdown, Button } from "react-bootstrap";
import { useState, useEffect, memo } from "react";
import Link from "next/link";
import AssignmentRounded from "@mui/icons-material/AssignmentRounded";
import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import CalendarTracking from "../_components/calendar";
import {
  fetchOrderList,
  fetchOrderListByToday,
} from "../../../../store/actions/orderAction";
import { fetchAllAdmins } from "../../../../store/slices/adminSlice";
import { getAllCustomers } from "../../../../store/slices/customerSlice";
import { useDispatch, useSelector } from "react-redux";
import { format, parseISO } from "date-fns";
import CustomTable from "../_components/table";
import {
  fetchCurrentMonthCateSales,
  fetchSaleMethodThisMonth,
} from "../../../../store/actions/reportAction";
import styles from "@/styles/styles";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import moment from "moment";

const Report = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCustomers()); // Fetch all customers when component loads
    dispatch(fetchAllAdmins());
    dispatch(fetchOrderList());
    dispatch(fetchOrderListByToday());
    dispatch(fetchCurrentMonthCateSales());
    dispatch(fetchSaleMethodThisMonth());
  }, []);

  const orderList = useSelector((state) => state.order.ordersList);
  const orderListToday = useSelector((state) => state.order.orderListByToday);
  const currentMonthCateSales = useSelector(
    (state) => state.report.currentMonthCateSales
  );
  const statusOrderListToday = useSelector((state) => state.order.status);
  const statusCurrentMonthCateSales = useSelector(
    (state) => state.report.status
  );
  const salesMedthod = useSelector((state) => state.report.salesMedthod);

  //Declaring
  let headersOrderList = [];
  let headersCurrentMonthCateSales = [];
  let headerSaleMethods = [];
  const datetimeFields = ["Duedate", "Create Date", "Created"];

  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  if (orderListToday) {
    orderListToday.map((item) => {
      headersOrderList?.push(Object.keys(item));
    });
  }

  if (currentMonthCateSales) {
    currentMonthCateSales.map((item) => {
      headersCurrentMonthCateSales?.push(Object.keys(item));
    });
  }

  //Handler func()
  const handleRecordDoubleClick = ({ ID }) => {
    setSelectedId(ID);
    setShow(true);
  };
  const handleReportclick = (e) => {};

  const payments = [
    { id: "1", name: "Total Collected", amount: "$5,080.40" },
    { id: "2", name: "Cash", amount: "$863.80" },
    { id: "3", name: "Card", amount: "$4211,94" },
    { id: "4", name: "Other", amount: "$0.00" },
    { id: "5", name: "Gift Card", amount: "$0.00" },
    { id: "6", name: "Fees", amount: "-$67.59" },
    { id: "7", name: "Net Total", amount: "$5.007.31" },
  ];

  const generateSalesReportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Sales Report", 10, 10);
    doc.setFontSize(12);
    doc.text(`Date: ${moment().format("DD/MM/YYYY")}`, 10, 20);

    // Prepare data for the table
    const tableData = salesMedthod.map((item, index) => {
      return Object.entries(item).map(([key, value]) => [
        key,
        datetimeFields.includes(key)
          ? moment(value).format("DD/MM/YYYY")
          : value, // Format dates using moment
      ]);
    });

    // Use autoTable for structured table
    doc.autoTable({
      head: [["Key", "Value"]],
      body: tableData.flat(),
      startY: 30,
      styles: { fontSize: 10, cellPadding: 2 },
    });

    doc.save("Sales_Report.pdf");
  };

  // Function to generate PDF for "Sales By Category"
  const generateCategorySalesPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Sales By Category Report", 10, 10);
    doc.setFontSize(12);
    doc.text(`Date: ${moment().format("YYYY-MM-DD")}`, 10, 20);

    // Prepare data for the table
    const tableData = currentMonthCateSales.map((item) => {
      return Object.entries(item).map(([key, value]) => [
        key,
        datetimeFields.includes(key)
          ? moment(value).format("DD/MM/YYYY")
          : value, // Format dates using moment
      ]);
    });

    // Use autoTable for structured table
    doc.autoTable({
      head: [["Category", "Value"]],
      body: tableData.flat(),
      startY: 30,
      styles: { fontSize: 10, cellPadding: 2 },
    });

    doc.save("Sales_By_Category_Report.pdf");
  };

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const getMonthName = (date) => {
    return new Date().toLocaleString("default", { month: "long" });
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  return (
    <>
      <Tab.Pane
        {...props}
        className="g-4 bg-2nd-color mt-1 px-3 py-3 rounded-4"
      >
        <Row xs={1} md={2} className="my-2 justify-content-around">
          {/* What's on today, Report by Category and Item */}

          <Col lg={5}>
            {/* What's on Today */}
            <Card className="rounded-4">
              <Card.Body>
                <Card.Title className="subtitle_admin">
                  <AssignmentRounded className="mx-2" />
                  What's on Today
                  <hr />
                </Card.Title>
                <CustomTable
                  headers={headersOrderList}
                  records={orderListToday ? orderListToday : []}
                  handleRecordDoubleClick={handleRecordDoubleClick}
                  datetimeFields={datetimeFields}
                  statusFetching={statusOrderListToday}
                  showPagination={false}
                  customTableColor={styles.admin_header_tables}
                />
              </Card.Body>
            </Card>

            {/* Sales By Category */}
            <Card className="rounded-4 my-4">
              <Card.Body>
                <Row>
                  <Col xs={6}>
                    <Card.Title className="subtitle_admin mb-3">
                      Sales By Category
                    </Card.Title>
                  </Col>
                  <Col xs={6}>
                    <Button
                      variant="success"
                      onClick={generateCategorySalesPDF}
                    >
                      Download PDF
                    </Button>
                  </Col>
                </Row>
                <Link href="./AdminView/ReportCategory">
                  <Button className={styles.btn} variant="primary">
                    View Report
                  </Button>
                </Link>

                <label className="font-medium text-gray-700 ms-4 fw-bold mb-4">
                  This month: {getMonthName(startDate)}
                </label>
                <CustomTable
                  headers={headersCurrentMonthCateSales}
                  records={currentMonthCateSales ? currentMonthCateSales : []}
                  handleRecordDoubleClick={handleReportclick}
                  datetimeFields={datetimeFields}
                  statusFetching={statusCurrentMonthCateSales}
                  showPagination={false}
                  customTableColor={styles.admin_header_tables}
                />
              </Card.Body>
            </Card>

            {/* General Report */}
            <Card className="rounded-4">
              <Card.Body>
                <Row>
                  <Col xs={6}>
                    <Card.Title className="subtitle_admin">
                      Sales Report
                    </Card.Title>
                  </Col>
                  <Col xs={6}>
                    <Button variant="success" onClick={generateSalesReportPDF}>
                      Download PDF
                    </Button>
                  </Col>
                </Row>
                <Dropdown className="my-3">
                  <Dropdown.Toggle
                    variant="primary"
                    id="dropdown-basic"
                    className={styles.btn}
                  >
                    This month
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">This Week</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      This Quarter
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">This Year</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Card.Text className="my-3">
                  {salesMedthod?.map((item, index) =>
                    Object.entries(item).map(([key, value], j) => (
                      <div
                        className="m-3 d-flex justify-content-between"
                        key={index}
                      >
                        <p className="subtitle">{key}</p>
                        <p className="subtitle ">{value}</p>
                      </div>
                    ))
                  )}
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
