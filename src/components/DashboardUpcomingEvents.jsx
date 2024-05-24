import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import FormModal from './FormModal';

const DashboardUpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);

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

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleOpenRemove = () => {
    setOpenRemove(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleCloseRemove = () => {
    setOpenRemove(false);
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
      
      
      
      
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
      <FormModal modalType="addEvent" open={openAdd} handleClose={handleCloseAdd} handleClickOpen={handleOpenAdd} />
        <Button
          sx={{
            background: '#6246EA',
            border: '1px solid rgb(89, 89, 89)',
            textTransform: 'none',
            boxShadow: 'none',
            fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
            fontWeight:400,
            '&:hover': {
              boxShadow: 'none',
              backgroundColor: '#fffffe',
              color: '#2b2c34'
            },
          }}
          style={{float: "right"}}
          className="but"
          variant="contained"
          onClick={handleOpenAdd}
        >Add Event</Button>          
        
        <FormModal modalType="removeEvent" open={openRemove} handleClose={handleCloseRemove} handleClickOpen={handleOpenRemove} />
        <Button
          sx={{
            background: '#6246EA',
            border: '1px solid rgb(89, 89, 89)',
            textTransform: 'none',
            boxShadow: 'none',
            fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
            fontWeight:400,
            '&:hover': {
              boxShadow: 'none',
              backgroundColor: '#fffffe',
              color: '#2b2c34'
            },
          }}
          style={{float: "right"}}
          className="but"
          variant="contained"
          onClick={handleOpenRemove}
        >Remove Event</Button>
      </Box>
    </div>
  );
};

export default DashboardUpcomingEvents;
