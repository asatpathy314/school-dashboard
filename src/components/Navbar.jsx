import '../styles/navbar.css';
import { useState } from 'react';
import Hamburger from 'hamburger-react';

const Navbar = () => {
  const [dropdownOpen, setdropdownOpen] = useState(false)
  function ShowDropdown(){
    if (dropdownOpen){
      return (<ul>
        <li><a href="/">Dashboard</a></li>
        <li><a href="/class-directory">Class Directory</a></li>
            <li><a href="student-directory">Student Directory</a></li>
            <li><a href="teacher-directory">Teacher Directory</a></li>
        <li><a href="calendar">Calendar</a></li>
    </ul>)
    }
    return <></>;
  }
  return (
    <>
      <div className='toggle-btn'>
        <Hamburger color= '#FFFFFF' toggled={dropdownOpen} toggle={setdropdownOpen} />
      </div>
      <div className='bar'>
        <ul>
            <li><a href="/">Dashboard</a></li>
            <li><a href="../class-directory">Class Directory</a></li>
            <li><a href="../student-directory">Student Directory</a></li>
            <li><a href="../teacher-directory">Teacher Directory</a></li>
            <li><a href="../calendar">Calendar</a></li>
        </ul>
      </div>
      <div className='dropdown-menu'>
        <ShowDropdown/>
      </div>
      </>
  )
}

export default Navbar;