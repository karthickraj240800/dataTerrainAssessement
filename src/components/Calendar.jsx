import { useState } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventModal from "./EventModal";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Calendar = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentView, setCurrentView] = useState("month"); // Track view type

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  // Group events by date for Month View only
  const groupedEvents = events.reduce((acc, event) => {
    const eventDate = format(new Date(event.start), "yyyy-MM-dd");
    if (!acc[eventDate]) acc[eventDate] = [];
    acc[eventDate].push(event);
    return acc;
  }, {});

  // Custom Event Card (Month View: Show max 3 events per day)
  const CustomEvent = ({ event }) => {
    const eventDate = format(new Date(event.start), "yyyy-MM-dd");

    if (currentView === "month") {
      const eventsForDate = groupedEvents[eventDate] || [];
      return (
        <div className="flex flex-col space-y-2 gap-x-2">
          {eventsForDate.slice(0, 3).map((e, index) => (
            <div
              key={index}
              className="bg-blue-600 text-white  rounded-sm shadow-md cursor-pointer   flex flex-row"
              onClick={() => handleSelectEvent(e)}
            >
              <p className="text-[13px]">{e.summary} - {e.job_id.jobRequest_Title}</p>
            </div>
          ))}
          {eventsForDate.length > 3 && (
            <p className="text-gray-500 text-xs">+{eventsForDate.length - 3} more</p>
          )}
        </div>
      );
    }

    // ✅ Week & Day View: Show event separately with correct title
    return (
      <div
        className=" text-white rounded-lg shadow-lg cursor-pointer gap-x-2  h-[20px]"
        onClick={() => handleSelectEvent(event)}
      >
        <p className="text-[13px] pt-[2px] pb-[10px]">{event.summary} - {event.job_id.jobRequest_Title}</p>
        
      </div>
    );
  };

  return (
    <div className="h-screen p-4">
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100vh", width: "90vw" }}
        onSelectEvent={handleSelectEvent}
        views={["month", "week", "day"]}
        onView={(view) => setCurrentView(view)} // Track view changes
        components={{
          event: CustomEvent, 
        }}
      />
      {showModal && (
        <EventModal event={selectedEvent} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default Calendar;
