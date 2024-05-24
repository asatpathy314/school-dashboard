// import React, {useState, useEffect} from 'react';
import Dir from '../components/Dir';
import Map from '../components/Map';
import { db } from "../../firebase";
import { addDoc, collection, getDocs, query, doc, getDoc, updateDoc, orderBy } from "firebase/firestore";

const StudentDir = () => {
  const [studentsArray, setStudentsArray] = useState([]);

    async function getStudents() {
      const collRef = collection(db, "students");
      const studentSnapshot = await getDocs(query(collRef));
      let temp = [];
      
      await Promise.all(studentSnapshot.docs.map(async (doc) => {
          const docData = doc.data();
          const classes = doc.data()['classes'];
          const id = doc.id;

          const valClasses = []
          
          await Promise.all(classes.map(async (c) => {
            const cDoc = await getDoc(c['class']);
            valClasses.push({'label': cDoc.data()['name']});
          }))

          let grades = 0;
          let count = 0;
          const gradeSum = classes.forEach(classItem => {
            grades = classItem.grade + grades;
            count = count + 1;
          })
          let avgGrade = grades / count;
          if (isNaN(avgGrade)) {
            avgGrade = 'NOT IN A CLASS';
          }

          const name = docData['fullName'];
          const splitName = name.split(' ');


          temp.push({
            'firstName' : splitName[0], 
            'lastName' : splitName[1], 
            'fullName': docData['fullName'], 
            'id': docData['id'], 
            'grade': docData['grade'], 
            'averageGrade': avgGrade,
            'classes' : valClasses})
      }));
    setStudentsArray(temp);
  }
  
  useEffect(() => {
    getStudents();
  }, [])

  return (
    <div>
      <Dir type="Student" 
        comp={<Map ids={true} 
        personNames={true} 
        studentGrades={true} 
        averageGrades={true} 
        data={studentsArray}
        dataType={'Student'}
        />}>
      </Dir>
    </div>
  )
}

export default StudentDir

import React, {useState, useEffect} from 'react';