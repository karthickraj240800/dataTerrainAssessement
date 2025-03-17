import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridDay from "@fullcalendar/timegrid";
import MeetingPopUp from "./MeetingPopUp";
import "./calendar.css";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Fetch events from JSON
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/calendarfromtoenddate.json");
        const data = await response.json();

        let formattedEvents = data.map((event) => ({
          id: event.id,
          title: event.summary,
          start: event.start,
          end: event.end,
          extendedProps: {
            interviewer: event.user_det?.handled_by?.firstName || "Unknown",
            email: event.user_det?.handled_by?.userEmail || "N/A",
            candidate: `${event.user_det?.candidate?.candidate_firstName || ""} ${event.user_det?.candidate?.candidate_lastName || ""}`,
            jobTitle: event.job_id?.jobRequest_Title || "N/A",
            jobRole: event.job_id?.jobRequest_Role || "N/A",
            jobSkills: event.job_id?.jobRequest_KeySkills || "N/A",
            link: event.link || "#",
            Header: event.summary,
            start: event.start,
            end: event.end,
          },
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Handle Event Click
  const handleEventClick = (eventData) => {
    if (!eventData || !eventData.extendedProps) {
      console.error("No extendedProps found for event:", eventData);
      return;
    }

    setSelectedEvent(eventData.extendedProps);
    setIsPopupOpen(true);
  };

  // Render Events with Responsive Design
  const renderEventContent = (eventInfo) => {

    return (
      <div
        className="event-card cursor-pointer bg-white border-l-4 border-blue-600 shadow-md p-3 rounded-lg hover:shadow-lg transition-all"
        onClick={() => handleEventClick(eventInfo.event)}
        style={{ minHeight: "60px", whiteSpace: "normal" }} // Fix height issue
      >
        <h3 className="font-bold text-black text-xs sm:text-base">
          {eventInfo.event.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-700">
          {eventInfo.event.extendedProps?.jobTitle}
        </p>
        <p className="text-xs sm:text-sm text-gray-700">
          Interviewer: {eventInfo.event.extendedProps?.interviewer}
        </p>
        <p className="text-xs sm:text-sm text-gray-700">
          {new Date(eventInfo.event.start).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}{" "}
          -{" "}
          {new Date(eventInfo.event.end).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
      </div>
    );
  };

  return (
    <>
      <div className="border border-gray-300 shadow-md p-4 rounded-lg bg-gray-100">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, timeGridDay]}
          initialView="dayGridMonth"
          events={events}
          eventContent={renderEventContent}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          height="auto"
          views={{
            timeGridWeek: {
              slotEventOverlap: false, // Prevent overlapping events
              eventMaxStack: 2, // Limit max stacked events per row
            },
          }}
        />
      </div>

      {/* Popup for Event Details */}
      {isPopupOpen && selectedEvent && (
        <MeetingPopUp
          event={selectedEvent}
          onClose={() => {
            setIsPopupOpen(false);
            setSelectedEvent(null);
          }}
        />
      )}
    </>
  );
};

export default Calendar;
