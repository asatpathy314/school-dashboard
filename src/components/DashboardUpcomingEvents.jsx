import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const DashboardUpcomingEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, 'events');
        const eventsSnapshot = await getDocs(eventsCollection);
        const eventsData = eventsSnapshot.docs.map(doc => {
          const data = doc.data();
          const startDate = data['start-date'].toDate();
          console.log(data);
          return {
            name: data.name,
            description: data.description,
            startDate: startDate,
            startHour: startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            endDate: data['end-date'].toDate(),
          };
        });
        console.log(eventsData);
        const sortedEvents = eventsData.sort((a, b) => a.startDate - b.startDate);
        setEvents(sortedEvents);
      } catch (error) {
        console.error('Error fetching events: ', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className='dashboard-upcoming-events'>
      <h3>Upcoming Events</h3>
      {events.map(event => (
        <Card key={event.id} sx={{ display: 'flex', marginBottom: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 1 }}>
            <Typography variant="body1">{event.startDate.toDateString()}</Typography>
            <Typography variant="body2" color="text.secondary" >{event.startHour}</Typography>
          </Box>
          <CardContent>
            <Typography variant="h6">{event.name}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardUpcomingEvents;
