import { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    
    

    fetch("/events.json")
      .then((response) => response.json())
      .then((data) => {
      
        const formattedEvents = data.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        setEvents(formattedEvents);
      })
      .catch((error) => console.error("Error fetching events:", error));

    
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className=" w-full mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">Interview Calendar</h1>
        </div>
      </header>
      <main className="w-full mx-auto py-6 sm:px-6 lg:px-8">
        <Calendar events={events} />
      </main>
    </div>
  );
}

export default App;