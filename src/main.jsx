import React, {useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import StudentDir from './routes/StudentDir.jsx'
import TeacherDir from './routes/TeacherDir.jsx'
import Classes from './routes/Classes.jsx'
import Class from './routes/Class.jsx'
import Dashboard from './routes/Dashboard.jsx'
import Calendars from './routes/Calendars.jsx'
import Dev from './routes/Dev.jsx'
import Navbar from './components/Navbar.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard/>
  },
  {
    path: "/class/:id",
    element: <Class/>
    // when firebase is set up loop through all possible classes and add route to that class using children (I added an example id)
  },
  {
    path: "/class-directory",
    element: <Classes/>,
    // children: [
    //   {
    //     path: ':/id',
    //     element: <Class />
    //   }
    // ]
  },
  {
    path: "/student-directory",
    element: <StudentDir/>
  },
  {
    path: "/teacher-directory",
    element: <TeacherDir/>
  },
  {
    path: "/calendar",
    element: <Calendars/>
  },
  // This should be removed in prod.
  {
    path: "/testing",
    element: <Dev />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Navbar/>
    <RouterProvider router={router}/>
  </>
)
