import { useEffect, useState } from "react";
import { Button, InputGroup, FormControl, Tab, Modal } from "react-bootstrap";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const CalendarTracking = () => {
  const localizer = momentLocalizer(moment);
  const [view, setView] = useState("month"); // Default view is 'month'
  const currentDate = new Date();
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [selectedEvent, setSelectedEvent] = useState(null); // Track selected event

  const events = [
    {
      title: "Order Due: Thai Hao",
      dueDate: new Date(2024, 9, 14), // November is month 10 (zero-indexed)
      createDate: new Date(2024, 9, 10),
    },
    {
      title: "Order Due: Huyen Nguyen",
      dueDate: new Date(2024, 9, 17),
      createDate: new Date(2024, 9, 12),
    },
    {
      title: "Order Due: Kevin",
      dueDate: new Date(2024, 9, 22),
      createDate: new Date(2024, 9, 16),
    },
    {
      title: "Order Due: Shu Shu",
      dueDate: new Date(2024, 9, 22),
      createDate: new Date(2024, 9, 16),
    },
  ];

  // Function to filter only events that are due or created in the current month
  const filterEventsForCurrentMonth = () => {
    const firstDayOfMonth = moment(currentDate).startOf("month").toDate();
    const lastDayOfMonth = moment(currentDate).endOf("month").toDate();

    return events.reduce((acc, event) => {
      // Add both dueDate and createDate as separate events for the calendar
      if (event.dueDate >= firstDayOfMonth && event.dueDate <= lastDayOfMonth) {
        acc.push({
          title: `Due: ${event.title}`,
          start: event.dueDate,
          end: event.dueDate,
          allDay: true,
          type: "dueDate", // Custom field to identify the event type
        });
      }
      if (event.createDate >= firstDayOfMonth && event.createDate <= lastDayOfMonth) {
        acc.push({
          title: `Created: ${event.title}`,
          start: event.createDate,
          end: event.createDate,
          allDay: true,
          type: "createDate", // Custom field to identify the event type
        });
      }
      return acc;
    }, []);
  };

  const filteredEvents = filterEventsForCurrentMonth();

  // Handle event click
  const handleEventClick = (event) => {
    setSelectedEvent(event); // Set selected event details
    setShowModal(true); // Show the modal with event details
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  // Customize the event style
  const eventStyleGetter = (event) => {
    let backgroundColor = "#3174ad"; // Default color

    if (event.type === "dueDate") {
      backgroundColor = "#f44336"; // Red for due dates
    } else if (event.type === "createDate") {
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
    <div>

      <Calendar
        localizer={localizer}
        events={filteredEvents}
        view={view} // Use the dynamic view state
        date={currentDate}
        step={60}
        showMultiDayTimes
        style={{ height: "80vh" }}
        onSelectEvent={handleEventClick} // Add event handler for clicks
        eventPropGetter={eventStyleGetter} // Add event style customization
        toolbar={false} // Disable default toolbar
      />


      {/* Modal for event details */}
      <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Order Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedEvent && (
              <>
                <p><strong>Title:</strong> {selectedEvent.title}</p>
                <p><strong>Date:</strong> {moment(selectedEvent.start).format("YYYY-MM-DD")}</p>
                <p><strong>Details:</strong> {selectedEvent.details}</p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
    
  );
};

export default CalendarTracking;
