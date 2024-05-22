import '../styles/navbar.css';

const Navbar = () => {
  return (
    <div className='barList'>
      <ul>
          <li><a href="/">Dashboard</a></li>
          <li><a href="/classes">Classes</a></li>
          <li><a href="studentDir">Student Directory</a></li>
          <li><a href="teacherDir">Teacher Directory</a></li>
          <li><a href="calendar">Calendar</a></li>
          
      </ul>
    </div>
  )
}

export default Navbar;