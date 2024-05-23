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
      // console.log(studentSnapshot)
      let temp = [];
      
      await Promise.all(studentSnapshot.docs.map(async (doc) => {
          const docData = doc.data();
          const classes = doc.data()['classes'];
          const id = doc.id;

          let grades = 0;
          let count = 0;
          // console.log(classes)
          const gradeSum = classes.forEach(classItem => {
            grades = classItem.grade + grades;
            count = count + 1;
          })
          const avgGrade = grades / count;

          temp.push({'fullName': docData['fullName'], 'id': docData['id'], 'grade': docData['grade'], 'averageGrade': avgGrade})
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