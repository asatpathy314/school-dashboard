import React, {useState, useEffect} from 'react';
import Dir from '../components/Dir';
import Map from '../components/Map';

import { db } from "../../firebase";
import { addDoc, collection, getDocs, query, doc, getDoc, updateDoc, orderBy } from "firebase/firestore";

const TeacherDir = () => {
  const [teachersArray, setTeachersArray] = useState([]);

  async function getTeachers() {
    const collRef = collection(db, "teachers");
    const teacherSnapshot = await getDocs(query(collRef));
    let temp = [];
    teacherSnapshot.forEach((doc) => {
      temp.push({'fullName': doc.data()['name'], 'id': doc.id});
    });
    setTeachersArray(temp);
    console.log(temp);
    console.log(teachersArray);
}

  useEffect(() => {
    getTeachers();
  }, [])

  return (
    <div>
      {/* Replace div with component */}
      <Dir type="Teacher" comp={<Map ids={true} personNames={true} data={teachersArray}/>}></Dir>
    </div>
  )
}

export default TeacherDir