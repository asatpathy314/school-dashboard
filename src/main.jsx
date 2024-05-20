import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import StudentDir from './roots/StudenDir.jsx'
import TeacherDir from './roots/Teacher.jsx'
import Home from './roots/Home.jsx'
import Class from './roots/Class.jsx'
import Dashboard from './roots/Dashboard.jsx'
import Calendar from './roots/Calendar.jsx'
import Navbar from './components/navbar.jsx'

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
    element: <Calendar/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Navbar/>
    <RouterProvider router={router}/>
  </>
)
