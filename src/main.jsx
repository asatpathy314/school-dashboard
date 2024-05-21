import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import StudentDir from './routes/StudenDir.jsx'
import TeacherDir from './routes/Teacher.jsx'
import Home from './routes/Home.jsx'
import Class from './routes/Class.jsx'
import Dashboard from './routes/Dashboard.jsx'
import Calendars from './routes/Calendars.jsx'
import Dev from './routes/Dev.jsx'
import Navbar from './components/Navbar.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/class",
    // when firebase is set up loop through all possible classes and add route to that class using children (I added an example id)
    children: [
      {
        path: "wejifhwejh",
        elem: <Class id="wejifhwejh"></Class>
      }
    ],
    element: <Home/>
  },
  {
    path: "/dashboard",
    element: <Dashboard/>
  },
  {
    path: "/studentDir",
    element: <StudentDir/>
  },
  {
    path: "/teacherDir",
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
