import React, { useState, useEffect } from 'react';
import Scheduler from 'react-mui-scheduler';
import { db } from '../../firebase';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import dayjs from 'dayjs';
import './../styles/Calendars.css';
import DashboardUpcomingEvents from '../components/DashboardUpcomingEvents';

const Calendars = () => {
  const [state] = useState({
    options: {
      transitionMode: 'zoom',
      startWeekOn: 'Sun',
      defaultMode: 'month',
      color: '#8a2be2',
      minWidth: 540,
      maxWidth: 540,
      minHeight: 540,
      maxHeight: 540,
    },
    toolbarProps: {
      showSearchBar: false,
      showSwitchModeButtons: true,
      showDatePicker: true,
    }
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
          const startDate = data.startDate ? dayjs(data.startDate) : null;
          const endDate = data.endDate ? dayjs(data.endDate) : null;
          return {
            id: doc.id,
            label: data.name,
            description: data.description,
            color: '#f28f6a',
            groupLabel: 'School Wide Event',
            startHour: startDate ? startDate.format('hh:mm A') : 'N/A',
            endHour: endDate ? endDate.format('hh:mm A') : 'N/A',
            date: startDate ? startDate.format('YYYY-MM-DD') : 'N/A',
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
      const eventDate = dayjs(event.date);
      return (
        eventDate.date() === day.date() &&
        eventDate.month() === day.month() &&
        eventDate.year() === day.year()
      );
    });
    setSelectedEvent(selectedDateEvents.length > 0 ? selectedDateEvents[0] : null);
  };

  const handleDialogClose = () => {
    setSelectedEvent(null);
  };

  return (
    <div>
      <div style={{ paddingTop: '20px', paddingBottom: '20px', paddingRight: '30px', paddingLeft: '30px' }}> 
        <DashboardUpcomingEvents />
      </div>
      <div className="calendar-container">
        <Scheduler
          locale="en"
          key={events.length}
          events={events}
          legacyStyle={false}
          options={state?.options}
          toolbarProps={state?.toolbarProps}
          onCellClick={handleCellClick}
          renderDay={(day, row, column, selectedDate, isToday, locale) => {
            const dayEvents = events.filter(event => event.date === day.format('YYYY-MM-DD'));
            return (
              <div className="date-cell" onClick={() => setSelectedEvent(dayEvents[0])}>
                {day.date()}
                <div className="tooltip always-visible">
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
      </div>
      <Dialog open={!!selectedEvent} onClose={handleDialogClose}>
        <DialogTitle>{selectedEvent?.label}</DialogTitle>
        <DialogContent>
          <Typography>{selectedEvent?.description}</Typography>
          <Typography>Start: {selectedEvent?.startHour}</Typography>
          <Typography>End: {selectedEvent?.endHour}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Calendars;
