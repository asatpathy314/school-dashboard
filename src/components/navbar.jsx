import React from 'react';
import '../styles/navbar.css';

const Navbar = () => {
  return (
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="dashboard">Dashboard</a></li>
        <li><a href="studentDir">Student Directory</a></li>
        <li><a href="teacherDir">Teacher Directory</a></li>
        <li><a href="calendar">Calendar</a></li>
        
    </ul>
  )
}

export default Navbar;