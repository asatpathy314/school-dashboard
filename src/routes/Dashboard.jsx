import React, { useState } from 'react'
import { Box } from '@mui/system'
import DashboardComponent from '../components/DashboardComponent'
import '../styles/dashboard/Dashboard.css'

const Dashboard = () => {

  const [data] = useState([
    { fullName: 'John Doe', id: '100001' },
    { fullName: 'Jane Smith', id: '100002' },
    { fullName: 'Michael Johnson', id: '100003' },
    { fullName: 'Emily Brown', id: '100004' },
    { fullName: 'William Taylor', id: '100005' },
    { fullName: 'Olivia Anderson', id: '100006' },
    { fullName: 'James Thomas', id: '100007' },
    { fullName: 'Emma Wilson', id: '100008' },
    { fullName: 'Alexander Martinez', id: '100009' },
    { fullName: 'Sophia Garcia', id: '100010' },
    { fullName: 'Benjamin Miller', id: '100011' },
    { fullName: 'Isabella Jackson', id: '100012' },
    { fullName: 'Daniel Davis', id: '100013' },
    { fullName: 'Mia White', id: '100014' },
    { fullName: 'Joseph Harris', id: '100015' },
    { fullName: 'Charlotte Clark', id: '100016' },
    { fullName: 'Samuel Lewis', id: '100017' },
    { fullName: 'Amelia Allen', id: '100018' },
    { fullName: 'David Young', id: '100019' },
    { fullName: 'Sofia King', id: '100020' },
    { fullName: 'Matthew Lee', id: '100021' },
    { fullName: 'Ava Wright', id: '100022' },
  ]);

  return (
    <>
      <h2 className='header'>Admin Dashboard</h2>
      <div className='dashboard'>
        <Box sx={{ 
          mt: -1,
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1,
          gridTemplateRows: 'auto',
          gridTemplateAreas: `"teachers classes classes students"
            "teachers classes classes students"
            "teachers classes classes students"
            "teachers upcoming-events upcoming-events students"` }}
        >
          <Box sx={{ gridArea: 'teachers' }}>
            <DashboardComponent data={data} which={'teacher'}/>
          </Box>
          <Box sx={{ gridArea: 'classes' }}>
            <DashboardComponent data={data} which={'class'} />
          </Box>
          <Box sx={{ gridArea: 'students' }}>
            <DashboardComponent data={data} which={'student'} />
          </Box>
          <Box sx={{ gridArea: 'upcoming-events' }}>
            <DashboardComponent data={data} which={'upcoming-events'} />
          </Box>
        </Box>
      </div>
      
    </>
  )
}

export default Dashboard;