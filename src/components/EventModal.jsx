const EventModal = ({ event, onClose }) => {
  const handleJoin = () => {
    window.open(event.link, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{event.summary}</h2>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-gray-700 z-40  text-2xl font-bold"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <p className="font-semibold">Position:</p>
            <p>{event.job_id.jobRequest_Title}</p>
          </div>
          
          <div>
            <p className="font-semibold">Candidate:</p>
            <p>{`${event.user_det.candidate.candidate_firstName} ${event.user_det.candidate.candidate_lastName}`}</p>
          </div>
          
          <div>
            <p className="font-semibold">Interviewer:</p>
            <p>{`${event.user_det.handled_by.firstName} ${event.user_det.handled_by.lastName}`}</p>
          </div>
          
          <div>
            <p className="font-semibold">Time:</p>
            <p>
              <span className="font-medium">Start:</span>{" "}
              {new Date(event.start).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p>
              <span className="font-medium">End:</span>{" "}
              {new Date(event.end).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          <button
            onClick={handleJoin}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Join Meeting
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;