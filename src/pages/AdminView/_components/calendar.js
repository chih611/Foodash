import { useEffect, useState } from "react";
import { Button, InputGroup, FormControl, Tab, Modal } from "react-bootstrap";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomModal from "./modal";
import OrderDetails from "../_pages/order_details";

const CalendarTracking = (props) => {
  const {
    events,
    showModal,
    setShowModal,
    selectedEvent,
    setSelectedEvent,
    handleEventClick,
  } = props;
  const localizer = momentLocalizer(moment);
  const currentDate = new Date();

  // Function to filter only events that are due or created in the current month
  const filterEventsForCurrentMonth = () => {
    const firstDayOfMonth = moment(currentDate).startOf("month").toDate();
    const lastDayOfMonth = moment(currentDate).endOf("month").toDate();

    return events?.reduce((acc, event) => {
      // Add both Duedate and createDate as separate events for the calendar
      const dueDate = moment(event.Duedate);
      const createDate = moment(event["Create Date"]);
      if (dueDate >= firstDayOfMonth && dueDate <= lastDayOfMonth) {
        acc.push({
          title: `Due: ${event["Full Name"]} - ${event.ID}`,
          start: dueDate,
          end: dueDate,
          Id: event.ID,
          type: "Duedate", // Custom field to identify the event type
        });
      }
      if (createDate >= firstDayOfMonth && createDate <= lastDayOfMonth) {
        acc.push({
          title: `Created: ${event["Full Name"]} - ${event.ID}`,
          start: createDate,
          end: createDate,
          Id: event.ID,
          type: "Create Date", // Custom field to identify the event type
        });
      }
      return acc;
    }, []);
  };

  const filteredEvents = filterEventsForCurrentMonth();

  // // Close the modal
  // const handleCloseModal = () => {
  //   setShowModal(false);
  //   setSelectedEvent(null);
  // };

  // Customize the event style
  const eventStyleGetter = (event) => {
    let backgroundColor = "#3174ad"; // Default color

    if (event.type === "Duedate") {
      backgroundColor = "#f44336"; // Red for due dates
    } else if (event.type === "Create Date") {
      backgroundColor = "#4caf50"; // Green for created dates
    }

    const style = {
      backgroundColor,
      borderRadius: "5px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    };
    return {
      style,
    };
  };

  return (
    <>
      <Calendar
        localizer={localizer}
        events={filteredEvents}
        defaultView="month" // Use the dynamic view state
        step={60}
        // showMultiDayTimes
        className="calendar_heigh"
        onSelectEvent={handleEventClick} // Add event handler for clicks
        eventPropGetter={eventStyleGetter} // Add event style customization
        toolbar={false} // Disable default toolbar
        popup
      />

      <CustomModal
        setOpen={setShowModal}
        open={showModal}
        selectedId={selectedEvent?.Id}
        headerTitle="Order"
      >
        <OrderDetails {...props} />
      </CustomModal>
    </>
  );
};

export default CalendarTracking;
