import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import StudentDir from './routes/StudentDir.jsx';
import TeacherDir from './routes/TeacherDir.jsx';
import Classes from './routes/Classes.jsx';
import Class from './routes/Class.jsx';
import Dashboard from './routes/Dashboard.jsx';
import Calendars from './routes/Calendars.jsx';
import Dev from './routes/Dev.jsx';
import Navbar from './components/Navbar.jsx';
import LandingPage from './routes/LandingPage';

// Component to conditionally render the Navbar
const App = () => {
  const location = useLocation();
  const hideNavbarPaths = ["/"]; // List of paths where you want to hide the Navbar

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/class/:id" element={<Class />} />
        <Route path="/class-directory" element={<Classes />} />
        <Route path="/student-directory" element={<StudentDir />} />
        <Route path="/teacher-directory" element={<TeacherDir />} />
        <Route path="/calendar" element={<Calendars />} />
        <Route path="/testing" element={<Dev />} />
      </Routes>
    </>
  );
};

// Main render
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);


// import React, {useEffect} from 'react'
// import ReactDOM from 'react-dom/client'
// import './styles/index.css'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import StudentDir from './routes/StudentDir.jsx'
// import TeacherDir from './routes/TeacherDir.jsx'
// import Classes from './routes/Classes.jsx'
// import Class from './routes/Class.jsx'
// import Dashboard from './routes/Dashboard.jsx'
// import Calendars from './routes/Calendars.jsx'
// import Dev from './routes/Dev.jsx'
// import Navbar from './components/Navbar.jsx'
// import LandingPage from './routes/LandingPage'

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <LandingPage/>
//   },
//   {
//     path: "/dashboard",
//     element: <Dashboard/>
//   },
//   {
//     path: "/class/:id",
//     element: <Class/>
//   },
//   {
//     path: "/class-directory",
//     element: <Classes/>,
//   },
//   {
//     path: "/student-directory",
//     element: <StudentDir/>
//   },
//   {
//     path: "/teacher-directory",
//     element: <TeacherDir/>
//   },
//   {
//     path: "/calendar",
//     element: <Calendars/>
//   },
//   // This should be removed in prod.
//   {
//     path: "/testing",
//     element: <Dev />
//   }
// ])

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <>
//     <Navbar/>
//     <RouterProvider router={router}/>
//   </>
// )
