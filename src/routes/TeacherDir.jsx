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
      
      await Promise.all(teacherSnapshot.docs.map(async (doc) => {
          const docData = doc.data();
          const id = doc.id;
          const classes = docData['classes'];
          
          // const classNames = await Promise.all(classes.map(async (classRef) => {
          //     const classDoc = await getDoc(classRef);
          //     return classDoc.data()['name'];
          // }));
  
          // temp.push({ 'fullName': docData['name'], 'id': docData['id'], 'classNames': classNames });
          temp.push({'fullName': docData['fullName'], 'id': docData['id'], 'email': docData['email']})
      }));
  
      console.log(temp);
      setTeachersArray(temp);
  }
  
  useEffect(() => {
    getTeachers();
  }, [])

  return (
    <div>
      {/* Replace div with component */}
      <Dir type="Teacher" comp={<Map ids={true} personNames={true} data={teachersArray} dataType={'Teacher'}/>}></Dir>
    </div>
  )
}

export default TeacherDir