import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button, InputGroup, FormControl, Tab } from "react-bootstrap";

const localizer = momentLocalizer(moment);

const events = [
  {
    title: "Event at Vin Plaza",
    start: new Date(2024, 8, 23, 9, 0),
    end: new Date(2024, 8, 23, 10, 0),
    desc: "A nice event",
  },
  {
    title: "50th Anniversary of Hotel",
    start: new Date(2024, 8, 25, 10, 0),
    end: new Date(2024, 8, 25, 11, 0),
    desc: "A celebration",
  },
  {
    title: "DELIVERY TO AZKAC CAFE",
    start: new Date(2024, 8, 23, 11, 0),
    end: new Date(2024, 8, 23, 12, 0),
    desc: "Delivery event",
  },
];

const Reminder = (props) => {
  const [view, setView] = useState("week"); // Default view is 'week'
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleNext = () => {
    setCurrentDate(moment(currentDate).add(1, view).toDate());
  };

  const handleBack = () => {
    setCurrentDate(moment(currentDate).subtract(1, view).toDate());
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <Tab.Pane {...props}>
      <div className="reminder-page">
        {/* Month name on top */}
        <div className="month-display text-center mb-3">
          <h2>{moment(currentDate).format("MMMM YYYY")}</h2>{" "}
          {/* Display current month */}
        </div>

        {/* Navigation buttons */}
        <div className="calendar-toolbar d-flex justify-content-between align-items-center mb-3">
          <div className="navigation-buttons d-flex">
            <Button variant="light" onClick={handleBack} className="arrow-btn">
              &lt;
            </Button>
            <Button variant="light" onClick={handleToday} className="today-btn">
              Today
            </Button>
            <Button variant="light" onClick={handleNext} className="arrow-btn">
              &gt;
            </Button>
          </div>

          {/* View buttons */}
          <div className="view-buttons d-flex">
            <Button
              variant={view === "day" ? "danger" : "light"}
              onClick={() => setView("day")}
            >
              Day
            </Button>
            <Button
              variant={view === "week" ? "danger" : "light"}
              onClick={() => setView("week")}
            >
              Week
            </Button>
            <Button
              variant={view === "month" ? "danger" : "light"}
              onClick={() => setView("month")}
            >
              Month
            </Button>
          </div>

          {/* Search bar */}
          <div className="right-section">
            <InputGroup className="search-bar">
              <FormControl placeholder="Search" />
            </InputGroup>
          </div>
        </div>

        {/* Calendar component */}
        <Calendar
          localizer={localizer}
          events={events}
          view={view} // Use the dynamic view state
          onView={(newView) => setView(newView)} // Allow changing the view dynamically
          date={currentDate}
          views={["day", "week", "month"]} // Removed "year" from views
          step={60}
          showMultiDayTimes
          style={{ height: "80vh" }}
          toolbar={false} // Disable default toolbar
        />
      </div>
    </Tab.Pane>
  );
};

export default Reminder;
