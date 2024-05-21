import React from 'react'
import { Box } from '@mui/system'

const Dashboard = () => {
  return (
    <>
      <h1>Admin Dashboard</h1>
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 1,
        gridTemplateRows: 'auto',
        gridTemplateAreas: `"teachers classes classes students"
          "teachers classes classes students"
          "teachers classes classes students"
          "teachers upcoming-events upcoming-events students"` }}
      >
        <Box sx={{ gridArea: 'teachers' }}>This is where the Teacher's section will be</Box>
        <Box sx={{ gridArea: 'classes' }}>This is where the classes section will be</Box>
        <Box sx={{ gridArea: 'students' }}>This is where the Student's section will be</Box>
        <Box sx={{ gridArea: 'upcoming-events' }}>This is where the Upcoming Events section will be</Box>
      </Box>
    </>
  )
}

export default Dashboard;