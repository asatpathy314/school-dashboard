import React, {useState, useEffect} from 'react';
import Dir from '../components/Dir';
import Map from '../components/Map'
import { db } from "../../firebase";
import { addDoc, collection, getDocs, query, doc, getDoc, updateDoc, orderBy, average } from "firebase/firestore";

const Classes = () => {
  const [classesArray, setClassesArray] = useState([]);

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
            'students': valStudents,
            'id': doc.id});
        } else {
          temp.push({
            'teacher': 'NO TEACHER', 
            'grade': doc.data()['grade'], 
            'subject': doc.data()['subject'],
            'id': doc.id, 
            'className': doc.data()['name'], 
            'averageGrade': avg, 
            'fullName': 'NO TEACHER',
            'students': valStudents,
            'id': doc.id});
        }
        
      } catch (error) {
        console.log("Error fetching class data: ", error, doc.id);
      }
    }));

    setClassesArray(temp);
  }

  useEffect(() => {
    getClasses();
  }, [])

  return (
    <div>
      {/* Replace div with component */}
      <Dir type="Class" comp={<Map 
        ids={true} 
        classNames={true} 
        averageGrades={true} 
        personNames={true} 
        students={true}
        data={classesArray} 
        dataType={'Class'}/>}>
      </Dir>
    </div>
  )
}

export default Classes