import React from 'react'
import '../styles/dashboard/DashboardTeachers.css'
import Map from './Map'

const DashboardTeachers = () => {
  
  const data = [
    { fullName: 'John Doe', id: '123456' },
    { fullName: 'Jane Smith', id: '234567' },
    { fullName: 'Michael Johnson', id: '345678' },
    { fullName: 'Emily Brown', id: '456789' },
    { fullName: 'William Taylor', id: '567890' },
    { fullName: 'Olivia Anderson', id: '678901' },
    { fullName: 'James Thomas', id: '789012' },
    { fullName: 'Emma Wilson', id: '890123' },
    { fullName: 'Alexander Martinez', id: '901234' },
    { fullName: 'Sophia Garcia', id: '012345' },
    { fullName: 'Benjamin Miller', id: '123456' },
    { fullName: 'Isabella Jackson', id: '234567' },
    { fullName: 'Daniel Davis', id: '345678' },
    { fullName: 'Mia White', id: '456789' },
    { fullName: 'Joseph Harris', id: '567890' },
    { fullName: 'Charlotte Clark', id: '678901' },
    { fullName: 'Samuel Lewis', id: '789012' },
    { fullName: 'Amelia Allen', id: '890123' },
    { fullName: 'David Young', id: '901234' },
    { fullName: 'Sofia King', id: '012345' },
    { fullName: 'Matthew Lee', id: '123456' },
    { fullName: 'Ava Wright', id: '234567' },
  ];

  const rows = [
    { fullName: 'Snow', id: 35, gender:"female"},
    { fullName: 'Lannister', id: 42 },
    { fullName: 'Lannister', id: 45 },
  ];

  return (
    <>
        <div className='dashboard-teachers'>
            <h3>Teachers</h3>
            <input placeholder="Search by name..."></input>
            <Map ids={true} personNames={true} data={data}/>
        </div>
    </>
  )
}

export default DashboardTeachers