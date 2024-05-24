import { useState, useEffect } from 'react';
import Scheduler from 'react-mui-scheduler';
import { db } from '../../firebase';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import './../styles/Calendars.css';
import DashboardUpcomingEvents from '../components/DashboardUpcomingEvents';
import { Grid, Box } from '@mui/material'
import FormModal from '../components/FormModal';

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
  const [openAdd, setOpenAdd] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

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
  const handleBack = () => {
    navigate('/dashboard');
}

  const handleCellClick = (event, row, day) => {
    const clickedDay = dayjs(day.format('YYYY-MM-DD'));
    const selectedDateEvents = events.filter(event => {
      const eventDate = dayjs(event.date);
      return eventDate.isSame(clickedDay, 'day');
    });
    setSelectedEvent(selectedDateEvents.length > 0 ? selectedDateEvents[0] : null);
  };

  const handleDialogClose = () => {
    setSelectedEvent(null);
  };

  return (
    <>
      <h2>Calendar</h2>
      <div className='grid'>
        <div className='home-button-container'>
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
              variant="contained"
              onClick={handleBack}
          >Home</Button> 
        </div>
        <div >
        <Grid container spacing ={2}>
        <Grid item xs={12} sm ={4}>
          <div className="calendar-container"> 
            <DashboardUpcomingEvents forDashboard={false}/>
          </div>
        </Grid>
        <Grid item xs={12} sm = {8}>
          <div className="calendar-container">
            <Scheduler
              locale="en"
              key = {events.length}
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
        </Grid>
      </Grid>
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
      <div className='add-remove-button-container'>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <FormModal modalType="addEvent" open={openAdd} handleClose={handleCloseAdd} handleClickOpen={handleOpenAdd} />
        <Button
          sx={{
            background: '#6246EA',
            border: '1px solid rgb(89, 89, 89)',
            textTransform: 'none',
            boxShadow: 'none',
            fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
            fontWeight: 400,
            '&:hover': {
              boxShadow: 'none',
              backgroundColor: '#fffffe',
              color: '#2b2c34'
            },
          }}
          style={{ float: "right" }}
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
            fontWeight: 400,
            '&:hover': {
              boxShadow: 'none',
              backgroundColor: '#fffffe',
              color: '#2b2c34'
            },
          }}
          style={{ float: "right" }}
          className="but"
          variant="contained"
          onClick={handleOpenRemove}
        >Remove Event</Button>
      </Box>
      </div>
      </div>
    </>
  );
};

export default Calendars;
