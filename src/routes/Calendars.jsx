import React, { useState, useEffect } from 'react';
import Scheduler from 'react-mui-scheduler';
import { db } from '../../firebase';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import './../styles/Calendars.css';
import DashboardUpcomingEvents from '../components/DashboardUpcomingEvents';

const Calendars = () => {
  const [state] = useState({
    options: {
      transitionMode: 'zoom',
      startWeekOn: 'Sun',
      defaultMode: 'month',
      minWidth: 540,
      maxWidth: 540,
      minHeight: 540,
      maxHeight: 540,
    },
  });

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, 'events');
        const eventsSnapshot = await getDocs(eventsCollection);
        const eventsData = eventsSnapshot.docs.map(doc => {
          const data = doc.data();
          const startDate = data['start-date'].toDate();
          const endDate = data['end-date'].toDate();
          return {
            id: doc.id,
            label: data.name,
            description: data.description,
            color: '#f28f6a', // Use a default color or fetch it from your data if available
            groupLabel: 'Event Group', // Provide a default group label or fetch from your data if available
            startHour: startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
            endHour: endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
            date: startDate.toISOString().split('T')[0], // Ensure the date is in YYYY-MM-DD format
          };
        });
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching events: ', error);
      }
    };

    fetchEvents();
  }, []);

  const handleCellClick = (event, row, day) => {
    const selectedDateEvents = events.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day.getDate() &&
        eventDate.getMonth() === day.getMonth() &&
        eventDate.getFullYear() === day.getFullYear()
      );
    });
    setSelectedEvent(selectedDateEvents.length > 0 ? selectedDateEvents[0] : null);
  };

  const handleDialogClose = () => {
    setSelectedEvent(null);
  };

  return (
    <div>
      <div style={{ paddingTop: '20px' }}> 
        <DashboardUpcomingEvents />
      </div>
      <Scheduler
        locale="en"
        events={events}
        legacyStyle={false}
        options={state?.options}
        onCellClick={handleCellClick}
        renderDay={(day, row, column, selectedDate, isToday, locale) => {
          const dayEvents = events.filter(event => event.date === day.toISOString().split('T')[0]);
          return (
            <div className="date-cell" onClick={() => setSelectedEvent(dayEvents[0])}>
              {day.getDate()}
              <div className="tooltip">
                {dayEvents.map(event => (
                  <div key={event.id} style={{ color: event.color }}>
                    {event.label}
                  </div>
                ))}
              </div>
            </div>
          );
        }}
        renderHeader={(day, locale) => (
          <div style={{ backgroundColor: '#8a2be2', color: '#fff', padding: '8px', textAlign: 'center' }}>
            {day.format('ddd')}
          </div>
        )}
      />
      <Dialog open={selectedEvent !== null} onClose={handleDialogClose}>
        <DialogTitle>{selectedEvent && selectedEvent.label}</DialogTitle>
        <DialogContent>
          <Typography>{selectedEvent && selectedEvent.description}</Typography>
          <Typography>{selectedEvent && `Start: ${selectedEvent.startHour}`}</Typography>
          <Typography>{selectedEvent && `End: ${selectedEvent.endHour}`}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Calendars;