import React from 'react'
import '../styles/dashboard/DashboardTeachers.css'
import Map from './Map'

const DashboardTeachers = ({ data }) => {
  
  return (
    <>
        <div className='dashboard-teachers'>
            <h3 className='h3'>Teachers</h3>
            <input placeholder="Search by name..."></input>
            <Map ids={true} personNames={true} data={data}/>
        </div>
    </>
  )
}

export default DashboardTeachers