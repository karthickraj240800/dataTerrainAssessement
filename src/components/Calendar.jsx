import { useState } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventModal from './EventModal';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Calendar = ({ events }) => {
  console.log(events);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: "#2563eb",
        color: "white",
        padding: "8px",
        borderRadius: "5px",
        whiteSpace: "normal", 
        wordWrap: "break-word",
        minHeight: "100px", 
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
       
      },
    };
  };
  const CustomEvent = ({ event }) => {
    const startTime = new Date(event.start).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  
    const endTime = new Date(event.end).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return (
      <div className="bg-blue-600 text-white p-2 rounded-lg shadow-lg z-10">
        <p className="font-bold">{event.summary}</p>
        <p className="text-sm">Job: {event.job_id.jobRequest_Title}</p>
        <p>{startTime} -  {endTime}</p>
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
            eventPropGetter={eventStyleGetter}
            views={['month', 'week', 'day']}
            components={{
              event: CustomEvent, 
            }}
          />
          {showModal && (
            <EventModal
              event={selectedEvent}
              onClose={() => setShowModal(false)}
            />
          )}
        </div>
        );
};

        export default Calendar;