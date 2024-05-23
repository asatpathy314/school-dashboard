import React from 'react';
import '../styles/dashboard/Dashboard.css';
import { Card, CardContent, Typography, Box } from '@mui/material';
import Map from './Map';

const DashboardComponent = ({ data, which }) => {
  let content;

  switch (which) {
    case 'teacher':
      content = (
        <div className='dashboard-left-right'>
          <h3 className='h3'>Teachers</h3>
          <Map ids={true} personNames={true} email={true} data={data} forDashboard={true} />
        </div>
      );
      break;
    case 'student':
      content = (
        <div className='dashboard-left-right'>
          <h3 className='h3'>Students</h3>
          <Map ids={true} personNames={true} studentGrades={true} data={data} averageGrades={true} forDashboard={true} />
        </div>
      );
      break;
    case 'class':
      content = (
        <div className='dashboard-classes'>
          <h3 className='h3'>Classes</h3>
        </div>
      );
      break;
    default:
      content = (
        <div className='dashboard-upcoming-events'>
          <h3 className='h3'>Upcoming Events</h3>
          <Box className="card-container">
            {data.map(event => (
              <Card key={event.id} className="event-card">
                <Box className="event-date">
                  <Typography variant="body1">{event.startDate.toDateString()}</Typography>
                  <Typography variant="body2" color="text.secondary">{event.startHour}</Typography>
                </Box>
                <CardContent>
                  <Typography variant="h6">{event.name}</Typography>
                </CardContent>
              </Card>
            ))}  
          </Box>
        </div>
        // <div className='dashboard-upcoming-events'>
        //   <h3 className='h3'>Upcoming Events</h3>
        //   <Box sx={{ maxHeight: '20vh', 
        //     overflowY: 'auto',
        //   }}>
        //       {data.map(event => (
        //         <Card key={event.id} sx={{ 
        //           display: 'flex', 
        //           mr: 4, 
        //           ml: 6,
        //           mb: 3,
        //           mt: 1,
        //           boxShadow: 8,
        //           width: '40vw',
        //         }}>
        //           <Box sx={{ 
        //             display: 'flex', 
        //             flexDirection: 'column', 
        //             justifyContent: 'center', 
        //             // alignItems: 'center', 
        //             padding: 2,
        //           }}>
        //             <Typography variant="body1">{event.startDate.toDateString()}</Typography>
        //             <Typography variant="body2" color="text.secondary" >{event.startHour}</Typography>
        //           </Box>
        //           <CardContent>
        //             <Typography variant="h6">{event.name}</Typography>
        //           </CardContent>
        //         </Card>
        //       ))}  
        //   </Box> 
        // </div>
      );
  }

  return <>{content}</>;
};

export default DashboardComponent;