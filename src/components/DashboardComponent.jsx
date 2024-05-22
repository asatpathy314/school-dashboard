import React from 'react';
import '../styles/dashboard/Dashboard.css';
import Map from './Map';

const DashboardComponent = ({ data, which }) => {
  let content;

  switch (which) {
    case 'teacher':
      content = (
        <div className='dashboard-teachers'>
          <h3 className='h3'>Teachers</h3>
          <Map ids={true} personNames={true} data={data} />
        </div>
      );
      break;
    case 'student':
      content = (
        <div className='dashboard-students'>
          <h3 className='h3'>Students</h3>
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
        </div>
      );
  }

  return <>{content}</>;
};

export default DashboardComponent;