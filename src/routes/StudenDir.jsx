import React, {useState, useEffect} from 'react';
import Dir from '../components/Dir';
import Map from '../components/Map';

import { db } from "../../firebase";
import { addDoc, collection, getDocs, query, doc, getDoc, updateDoc, orderBy } from "firebase/firestore";

const StudentDir = () => {
  const [studentsArray, setStudentsArray] = useState([]);

  async function getTeachers() {
    const collRef = collection(db, "students");
    const teacherSnapshot = await getDocs(query(collRef));
    let temp = [];
    teacherSnapshot.forEach((doc) => {
      temp.push({'fullName': doc.data()['fullName'], 'id': doc.data()['id'], 'grade': doc.data()['grade']});
    });
    setStudentsArray(temp);
    console.log(temp);
    console.log(studentsArray);
}

  useEffect(() => {
    getTeachers();
  }, [])


  return (
    <div>
      {/* Replace div with component */}
      <Dir type="Student" comp={<Map ids={true} personNames={true} studentGrades={true} data={studentsArray} dataType={'Student'}/>}></Dir>
    </div>
  )
}

export default StudentDir