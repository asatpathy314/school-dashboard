import { useState, useEffect } from 'react'
import DashboardComponent from '../components/DashboardComponent'
import DashboardUpcomingEvents from '../components/DashboardUpcomingEvents';
import '../styles/dashboard/Dashboard.css'
import { collection, getDocs, query, getDoc } from "firebase/firestore";
import { db } from '../../firebase';
import { Box, Grid } from '@mui/material'
import dayjs from 'dayjs';
import DashButton from '../components/DashButton'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [teachersArray, setTeachersArray] = useState([]);
  const [studentsArray, setStudentsArray] = useState([]);
  const [classesArray, setClassesArray] = useState([]);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const eventsCollection = collection(db, 'events');
      const eventsSnapshot = await getDocs(eventsCollection);
      const eventsData = eventsSnapshot.docs.map(doc => {
        const data = doc.data();
        const startDate = data.startDate ? dayjs(data.startDate) : null;
        const endDate = data.endDate ? dayjs(data.endDate) : null;
        return {
          id: doc.id,
          name: data.name,
          description: data.description,
          startDate: startDate,
          startHour: startDate ? startDate.format('hh:mm A') : 'N/A',
          endDate: endDate ? endDate.format('YYYY-MM-DD') : 'N/A'
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
        // console.log(doc.data());
        const id = doc.id;
        const students = doc.data()['students'];
        let gradeSum = 0;
        let avg = 0;

        const valStudents = []
          
          await Promise.all(students.map(async (s) => {
            const cDoc = await getDoc(s);
            // console.log(cDoc.data())
            if (cDoc.data() && cDoc.data().fullName) {
              valStudents.push({'label': cDoc.data()['fullName']});
            }
          }))

        
        if (students.length > 0) {
          for (const stuRef of students) {
            const stuDoc = await getDoc(stuRef);
            const stuData = stuDoc.data();
            if (stuData && stuData['classes']) {
              const classes = stuData['classes'];
                classes.forEach((c) => {
                  if (c['class'].id === id) {
                    gradeSum += c['grade'];
                  }
                });
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

        if (teacherDoc && teacherDoc.data() && teacherDoc.data()['fullName']) {
          temp.push({
            'teacher': teacherDoc.data()['fullName'], 
            'grade': doc.data()['grade'], 
            'subject': doc.data()['subject'],
            'id': doc.id, 
            'className': doc.data()['name'], 
            'averageGrade': avg, 
            'fullName': teacherDoc.data()['fullName'],
            'students': valStudents});
        } else {
          temp.push({
            'teacher': 'NO TEACHER', 
            'grade': doc.data()['grade'], 
            'subject': doc.data()['subject'],
            'id': doc.id, 
            'className': doc.data()['name'], 
            'averageGrade': avg, 
            'fullName': 'NO TEACHER',
            'students': valStudents});
        }
        
      } catch (error) {
        console.log("Error fetching class data: ", error, doc.id);
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
      <div >
      <Box 
        sx={{ flexGrow: 1 }}
        margin={2}>
        <Grid container 
          alignItems="stretch"
          columnSpacing={2}
          rowSpacing={2}>
          <Grid item xs = {12} sm={3}>
            <DashboardComponent data={teachersArray} which={'teacher'}/>
          </Grid>
          <Grid container item xs={12} sm ={6}
            rowSpacing ={2}>
            <Grid item xs = {12}>
              <DashboardComponent data={classesArray} which={'class'} />
            </Grid>
            <Grid item xs={12}>
              <div className='dashboard'>
                <DashboardUpcomingEvents forDashboard={true}/>
                <div className='see-more'>
                  <DashButton onClickMethod={() => navigate('/calendar')} buttonText={'See More'}/>
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid item xs = {12} sm={3}>
            <DashboardComponent data={studentsArray} which={'student'} />
          </Grid>
        </Grid>
      </Box>
        {/* <Box sx={{ 
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
          <Box sx={{ gridArea: 'upcoming-events', mb: 2 }}>
            <DashboardComponent data={events} which={'upcoming-events'}/>
          </Box>
        </Box> */}
      </div>
      
    </>
  )
}

export default Dashboard;