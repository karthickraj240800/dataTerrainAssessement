import React from "react";

const MeetingPopUp = ({ event, onClose }) => {
  if (!event) return null;


  const startTime = event.start
    ? new Date(event.start).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "N/A";

  const endTime = event.end
    ? new Date(event.end).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "N/A";

  const eventDate = event.start
    ? new Date(event.start).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";
    

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-30 backdrop-blur-md z-50">
    <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-lg relative transition-transform transform scale-100">
      {/* Close Button */}
      <button className="absolute top-3 right-3 text-red-600 hover:text-red-500 text-3xl" onClick={onClose}>
       X
      </button>

      {/* Meeting Header */}
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{event?.Header || "N/A"}</h2>

      {/* Meeting Details */}
      <div className="space-y-3 text-gray-700">
        <p>
          <strong className="text-gray-900">Role:</strong> {event?.jobTitle || "N/A"}
        </p>
        <p>
          <strong className="text-gray-900">Candidate:</strong> {event?.candidate || "N/A"}
        </p>
        <p>
          <strong className="text-gray-900">Interviewer:</strong> {event?.interviewer || "N/A"}
        </p>
        <p>
          <strong className="text-gray-900">Date:</strong> {eventDate}
        </p>
        <p>
          <strong className="text-gray-900">Time:</strong> {startTime} - {endTime}
        </p>
        <p>
          <strong className="text-gray-900">Interview Via:</strong> Google Meet
        </p>
      </div>

      {/* Join Meeting Button */}
      <div className="mt-4 flex justify-center">
        <a
          href={event?.link || "#"}
          className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-black font-medium rounded-lg hover:bg-blue-100 transition-all"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="https://cdn4.iconfinder.com/data/icons/logos-brands-in-colors/48/google-meet-512.png" alt="Google Meet" className="h-6 w-6" />
          JOIN
        </a>
      </div>

      {/* Attachments Section */}
      <div className="mt-4 border-t pt-4">
        <p className="text-gray-900 font-semibold">Attachments:</p>
        <div className="mt-2 space-y-2">
          <a
            href="/path/to/resume.docx"
            download
            className="flex items-center justify-between p-2 border rounded-lg hover:bg-gray-100 transition-all"
          >
            <span>Resume.docx</span>
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m4-4-4 4m-4-4 4 4m-8 4h16"></path>
            </svg>
          </a>
          <a
            href="/path/to/aadhar.pdf"
            download
            className="flex items-center justify-between p-2 border rounded-lg hover:bg-gray-100 transition-all"
          >
            <span>Aadharcard.pdf</span>
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m4-4-4 4m-4-4 4 4m-8 4h16"></path>
            </svg>
          </a>
        </div>
      </div>

      {/* Close Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  </div>
  );
};

export default MeetingPopUp;
