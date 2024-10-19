import { Card, Col, Container, Row, Tab, Dropdown, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

import Link from "next/link";

import SwapVertRounded from "@mui/icons-material/SwapVertRounded";
import FilterListOutlined from "@mui/icons-material/FilterListOutlined";
import CalendarTracking from "../_components/calendar";

// import { ReportCategory } from "./reportCategory";

const Report = (props) => {
  useEffect(() => {}, []);

  const categories = [
    {
      id: "111",
      name: "EAT",
      total: "11000",
      sold: "123",
      stock: "1200",
      expired: "108",
    },
    {
      id: "112",
      name: "FOOD",
      total: "12000",
      sold: "123",
      stock: "2010",
      expired: "180",
    },
    {
      id: "113",
      name: "COFFEE",
      total: "11000",
      sold: "123",
      stock: "2003",
      expired: "188",
    },
    {
      id: "114",
      name: "DRINK",
      total: "10100",
      sold: "123",
      stock: "9200",
      expired: "18",
    },
  ];

  const items = [
    { id: "1111", image: "/", name: "Mini Mize", sale: "1100" },
    { id: "1101", image: "/", name: "Buffet", sale: "1200" },
    { id: "1112", image: "/", name: "Signature Cake", sale: "1100" },
    { id: "1211", image: "/", name: "Salad Trays", sale: "1010" },
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

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const getMonthName = (date) => {
    return new Date().toLocaleString("default", { month: "long" });
  };

  return (
    <>
      <Tab.Pane {...props} className="g-4 bg-2nd-color m-2 px-3 py-3 rounded-4">
        <Row xs={1} md={2} className="m-3 justify-content-around">
          {/* Notify the new order or upcoming order */}

          <Col lg={7}>
            <Card className="rounded-4">
              <Card.Body>
                <Card.Title
                  className="subtitle_admin mb-3"
                  style={{ borderBottom: "solid 1px #90B4CE" }}
                >
                  ORDER TRACKING CALENDAR
                </Card.Title>

                <CalendarTracking orders={orders}></CalendarTracking>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab.Pane>
    </>
  );
};

export default Report;
