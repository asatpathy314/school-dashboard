import React, { useState, useEffect } from 'react'
import DashboardComponent from '../components/DashboardComponent'
import '../styles/dashboard/Dashboard.css'
import { addDoc, collection, getDocs, query, doc, getDoc, updateDoc, orderBy } from "firebase/firestore";
import { db } from '../../firebase';
import { Box } from '@mui/material'

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [teachersArray, setTeachersArray] = useState([]);
  const [studentsArray, setStudentsArray] = useState([]);
  const [classesArray, setClassesArray] = useState([]);

  const fetchEvents = async () => {
    try {
      const eventsCollection = collection(db, 'events');
      const eventsSnapshot = await getDocs(eventsCollection);
      const eventsData = eventsSnapshot.docs.map(doc => {
        const data = doc.data();
        const startDate = data['start-date'].toDate();
        return {
          id: doc.id,
          name: data.name,
          description: data.description,
          startDate: startDate,
          startHour: startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          endDate: data['end-date'].toDate(),
        };
      });
      const sortedEvents = eventsData.sort((a, b) => a.startDate - b.startDate);
      setEvents(sortedEvents);
    } catch (error) {
      console.error('Error fetching events: ', error);
    }
  };

  async function getTeachers() {
    const collRef = collection(db, "teachers");
    const teacherSnapshot = await getDocs(query(collRef));
    let temp = [];
    
    await Promise.all(teacherSnapshot.docs.map(async (doc) => {
        const docData = doc.data();
        const id = doc.id;
        const classes = docData['classes'];
        temp.push({'fullName': docData['fullName'], 'id': docData['id'], 'email': docData['email']})
    }));
    setTeachersArray(temp);
}

  async function getStudents() {
    const collRef = collection(db, "students");
    const studentSnapshot = await getDocs(query(collRef));
    let temp = [];
    
    await Promise.all(studentSnapshot.docs.map(async (doc) => {
        const docData = doc.data();
        const classes = doc.data()['classes'];
        const id = doc.id;

        let grades = 0;
        let count = 0;
        const gradeSum = classes.forEach(classItem => {
          grades = classItem.grade + grades;
          count = count + 1;
        })
        const avgGrade = grades / count;

        temp.push({'fullName': docData['fullName'], 'id': docData['id'], 'grade': docData['grade'], 'averageGrade': avgGrade})
    }));
  setStudentsArray(temp);
  }

  async function getClasses() {
    const collRef = collection(db, "classes");
    const classSnapshot = await getDocs(query(collRef));
    let temp = [];

    await Promise.all(classSnapshot.docs.map(async (doc) =>  {
      try {
        // console.log("hi")
        const id = doc.id;
        const students = doc.data()['students'];
        let gradeSum = 0;
        let avg = 0;    

        // console.log(students.length)
        if (students.length > 0) {
          for (const stuRef of students) {
            if (stuRef) {
              const stuDoc = await getDoc(stuRef);
              if (stuDoc.data() != undefined) {
                const classes = stuDoc.data()['classes'];
                classes.forEach((c) => {
                  gradeSum = gradeSum + c['grade'];
                })
              } else {
                continue;
              } 
            }
          }
          avg = gradeSum / students.length;
          avg = avg.toFixed(2);
        } else {
          avg = 'N/A';
        }

        // console.log(gradeSum)
        // console.log(avg);

        const teacherRef = doc.data()['teacher']
        const teacherDoc = await getDoc(teacherRef);

        temp.push({'id': doc.id, 'className': doc.data()['name'], 'averageGrade': avg, 'fullName': teacherDoc.data()['fullName']});
      } catch (error) {
        console.log("Error fetching class data: ", error);
      }
    }));

    setClassesArray(temp);
  }

  useEffect(() => {
    fetchEvents();
    getTeachers();
    getStudents();
    getClasses();
  }, []);


  return (
    <>
      <h2 className='header'>Admin Dashboard</h2>
      <div className='dashboard'>
        <Box sx={{ 
          mt: 1,
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1,
          gridTemplateRows: 'auto',
          gridTemplateAreas: `"teachers classes classes students"
            "teachers classes classes students"
            "teachers classes classes students"
            "teachers upcoming-events upcoming-events students"` }}
        >
          <Box sx={{ gridArea: 'teachers', ml: 5 }}>
            <DashboardComponent data={teachersArray} which={'teacher'}/>
          </Box>
          <Box sx={{ gridArea: 'classes' }}>
            <DashboardComponent data={classesArray} which={'class'} />
          </Box>
          <Box sx={{ gridArea: 'students', mr: 5 }}>
            <DashboardComponent data={studentsArray} which={'student'} />
          </Box>
          <Box sx={{ gridArea: 'upcoming-events' }}>
            <DashboardComponent data={events} which={'upcoming-events'}/>
          </Box>
        </Box>
      </div>
      
    </>
  )
}

export default Dashboard;