import React from 'react'
import '../styles/dashboard/Dashboard.css'
import Map from './Map'

const DashboardComponent = ({ data, which }) => {


    if (which == 'teacher') {
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

    if (which == 'student') {
        return (
            <>
                <div className='dashboard-students'>
                    <h3 className='h3'>Students</h3>
                </div>
            </>
        )
    }

    if (which == 'class') {
        return (
            <>
                <div className='dashboard-classes'>
                    <h3 className='h3'>Classes</h3>
                </div>
            </>
        )
    }

    return (
        <>
            <div className='dashboard-upcoming-events'>
                <h3 className='h3'>Upcoming Events</h3>
            </div>
        </>
    )

}

export default DashboardComponent