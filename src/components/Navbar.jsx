import '../styles/navbar.css';

const Navbar = () => {
  return (
    <div className='barList'>
      <ul>
          <li><a href="/">Dashboard</a></li>
          <li><a href="class-directory">Classes</a></li>
          <li><a href="student-directory">Student Directory</a></li>
          <li><a href="teacher-directory">Teacher Directory</a></li>
          <li><a href="calendar">Calendar</a></li>
          
      </ul>
    </div>
  )
}

export default Navbar;