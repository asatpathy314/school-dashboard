import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import dayjs from 'dayjs';
import '../styles/dashboard/Dashboard.css'

const DashboardUpcomingEvents = ({forDashboard}) => {
  const [events, setEvents] = useState([]);

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
            name: data.name,
            description: data.description,
            startDate: startDate,
            startHour: startDate ? startDate.format('hh:mm A') : 'N/A',
            endDate: endDate ? endDate.format('YYYY-MM-DD') : 'N/A'
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
  let max = '0px';
  let cardWidth = '100%';
  if (forDashboard){
    max = '238px';
    cardWidth='205%';
  } else{
    max ='558px';
    cardWidth='135%';
  }
  return (
    <div>
      <h3>Upcoming Events</h3>
      <Box className="card-container" sx={{ overflowY: 'auto', maxHeight: max}}>
        <div className='event'>
          {events.map(event => (
            <Card
              key={event.id}
              sx={{
                display: 'flex',
                marginBottom: 0.5,
                boxShadow: 'none',
                border: '1px solid rgb(89, 89, 89)',
                width:cardWidth,
                height: '3rem'
              }}
            >
              <Box
                alignItems='center'>
                <p>{event.startDate ? event.startDate.format('D MMM') : 'Date not available'}</p>
              </Box>
              <CardContent
                alignItems='center'>
                <h3>{event.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </Box>
    </div>
  );
};

export default DashboardUpcomingEvents;
