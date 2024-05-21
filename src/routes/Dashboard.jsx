import React from 'react'
import { Box } from '@mui/system'
import DashboardTeachers from '../components/DashboardTeachers'
import DashboardClasses from '../components/DashboardClasses'
import DashboardStudents from '../components/DashboardStudents'
import DashboardUpcomingEvents from '../components/DashboardUpcomingEvents'
import '../styles/dashboard/Dashboard.css'

const Dashboard = () => {
  return (
    <>
      <h1 className='header'>Admin Dashboard</h1>
      <div className='dashboard'>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1,
          minHeight: 500,
          gridTemplateRows: 'auto',
          gridTemplateAreas: `"teachers classes classes students"
            "teachers classes classes students"
            "teachers classes classes students"
            "teachers upcoming-events upcoming-events students"` }}
        >
          <Box sx={{ gridArea: 'teachers' }}>
            <DashboardTeachers />
          </Box>
          <Box sx={{ gridArea: 'classes' }}>
            <DashboardClasses />
          </Box>
          <Box sx={{ gridArea: 'students' }}>
            <DashboardStudents />
          </Box>
          <Box sx={{ gridArea: 'upcoming-events' }}>
            <DashboardUpcomingEvents />
          </Box>
        </Box>
      </div>
      
    </>
  )
}

export default Dashboard;