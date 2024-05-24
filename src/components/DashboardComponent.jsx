import React from 'react';
import '../styles/dashboard/Dashboard.css';
import { Card, CardContent, Typography, Box } from '@mui/material';
import Map from './Map';
// import Button from '@mui/material/Button'
import DashButton from './DashButton'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs';

const DashboardComponent = ({ data, which }) => {
  const navigate = useNavigate();

  let content;

  const handleMove = (which) => {
    switch (which) {
      case 'teacher':
        navigate('/teacher-directory');
        break;
      case 'student':
        navigate('/student-directory');
        break;
      case 'class':
        navigate('/class-directory');
        break;
      default:
        navigate('/calendar')
        break;
    }
  }

  switch (which) {
    case 'teacher':
      content = (
        <div className='dashboard'>
          <h3 className='h3'>Teachers</h3>
          <Map ids={true} personNames={true} email={true} data={data} forDashboard={true} dataType="Teacher" />
          <DashButton onClickMethod={() => handleMove(which)} buttonText={'See More'}/>
        </div>
      );
      break;
    case 'student':
      content = (
        <div className='dashboard'>
          <h3 className='h3'>Students</h3>
          <Map ids={true} personNames={true} studentGrades={true} data={data} forDashboard={true} dataType="Student" />
          <DashButton onClickMethod={() => handleMove(which)} buttonText={'See More'}/>
        </div>
      );
      break;
    case 'class':
      content = (
        <div className='dashboard'>
          <h3 className='h3'>Classes</h3>
          <Map ids={true} classNames={true} data={data} averageGrades={true} forDashboard={true} dataType="Class" />
          <DashButton onClickMethod={() => handleMove(which)} buttonText={'See More'}/>
        </div>
      );
      break;
    default:
      content = (
        <div className="dashboard">
          <h3>Upcoming Events</h3>
          <Box className="card-container">
            {data.map(event => (
              <Card key={event.id} className="event-card">
                <Box>
                  <Typography variant="body1">
                    {event.startDate ? dayjs(event.startDate).format('dddd, MMMM D, YYYY') : 'Date not available'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">{event.startHour}</Typography>
                </Box>
                <CardContent>
                  <Typography variant="h6">{event.name}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
          <DashButton onClickMethod={() => handleMove(which)} buttonText="See More" />
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