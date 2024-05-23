import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import AddEvent from '../components/modals/AddEvent';

const DashboardUpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, 'events');
        const eventsSnapshot = await getDocs(eventsCollection);
        const eventsData = eventsSnapshot.docs.map(doc => {
          const data = doc.data();
          const startDate = data['start-date'].toDate();
          return {
            id: doc.id,
            name: data.name,
            description: data.description,
            startDate: startDate,
            startHour: startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            endDate: data['end-date'].toDate(),
          };
        });
        const sortedEvents = eventsData.sort((a, b) => a.startDate - b.startDate);
        setEvents(sortedEvents);
      } catch (error) {
        console.error('Error fetching events: ', error);
      }
    };

    fetchEvents();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='dashboard-upcoming-events'>
      <h3>Upcoming Events</h3>
      {events.map(event => (
        <Card key={event.id} sx={{ display: 'flex', marginBottom: 2, boxShadow: 8 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 1 , paddingLeft:'70px', paddingRight:'90px' }}>
            <Typography variant="body1">{event.startDate.toDateString()}</Typography>
            <Typography variant="body2" color="text.secondary">{event.startHour}</Typography>
          </Box>
          <CardContent>
            <Typography variant="h6">{event.name}</Typography>
          </CardContent>
        </Card>
      ))}
      <AddEvent open={open} handleClose={handleClose} />
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Event
      </Button>
    </div>
  );
};

export default DashboardUpcomingEvents;
