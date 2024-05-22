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
      console.log(studentSnapshot)
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
        
          temp.push({'fullName': docData['name'], 'id': docData['id'], 'grade': docData['grade'], 'averageGrade': avgGrade})
      }));
    setStudentsArray(temp);
  }
  
  useEffect(() => {
    getStudents();
  }, [])

  return (
    <div>
      <Dir type="Student" comp={<Map ids={true} personNames={true} studentGrades={true} averageGrade={true} data={studentsArray}/>}></Dir>
    </div>
  )
}

export default StudentDir

import React, {useState, useEffect} from 'react';
// import Dir from '../components/Dir';
// import Map from '../components/Map';

// import { db } from "../../firebase";
// import { addDoc, collection, getDocs, query, doc, getDoc, updateDoc, orderBy } from "firebase/firestore";

// const StudentDir = () => {
//   const [studentsArray, setStudentsArray] = useState([]);

//   async function getTeachers() {
//     const collRef = collection(db, "students");
//     const teacherSnapshot = await getDocs(query(collRef));
//     let temp = [];
//     teacherSnapshot.forEach((doc) => {
//       temp.push({'fullName': doc.data()['name'], 'id': doc.data()['id'], 'grade': doc.data()['grade']});
//     });
//     setStudentsArray(temp);
//     console.log(temp);
//     console.log(studentsArray);
// }

//   useEffect(() => {
//     getTeachers();
//   }, [])


//   return (
//     <div>
//       {/* Replace div with component */}
//       <Dir type="Student" comp={<Map ids={true} personNames={true} studentGrades={true} data={studentsArray}/>}></Dir>
//     </div>
//   )
// }

// export default StudentDir