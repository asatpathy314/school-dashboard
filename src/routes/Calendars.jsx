import React, { useState, useEffect } from 'react';
import { db } from './../../firebase.jsx';
import Scheduler from 'react-mui-scheduler';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const Calendars = () => {
  const [events, setEvents] = useState([]);
  const [state] = useState({
    options: {
      transitionMode: "zoom",
      startWeekOn: "Mon",
      defaultMode: "month",
      minWidth: 540,
      maxWidth: 540,
      minHeight: 540,
      maxHeight: 540
    },
    toolbarProps: {
      showSearchBar: true,
      showSwitchModeButtons: true,
      showDatePicker: true
    }
  });
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const snapshot = await db.collection('events').get();
        const eventsData = snapshot.docs.map(doc => {
          const data = doc.data();
          const startDate = data['start-date'].toDate();
          const endDate = data['end-date'].toDate();
          return {
            id: doc.id,
            label: data.name,
            description: data.description,
            startHour: startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            endHour: endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            date: startDate.toISOString().split('T')[0], 
            color: "#099ce5" 
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

    if (selectedDateEvents.length > 0) {
      setSelectedEvent(selectedDateEvents[0]);
    } else {
      setSelectedEvent(null);
    }
  };

  const handleDialogClose = () => {
    setSelectedEvent(null);
  };

  return (
    <div>
      <Scheduler
        locale="en"
        events={events}
        legacyStyle={false}
        options={state?.options}
        alertProps={state?.alertProps}
        toolbarProps={state?.toolbarProps}
        onCellClick={handleCellClick}
      />
      <Dialog open={selectedEvent !== null} onClose={handleDialogClose}>
        <DialogTitle>{selectedEvent && selectedEvent.label}</DialogTitle>
        <DialogContent>
          <Typography>{selectedEvent && selectedEvent.description}</Typography>
          <Typography>{selectedEvent && `Start: ${selectedEvent.startHour}`}</Typography>
          <Typography>{selectedEvent && `End: ${selectedEvent.endHour}`}</Typography>
          {/* Add more event details as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Calendars;
