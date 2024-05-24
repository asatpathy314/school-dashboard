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
          const name = docData['fullName'];
          const splitName = name.split(' ');
          console.log(docData);
          temp.push({'firstName' : splitName[0], 'lastName' : splitName[1], 'fullName': docData['fullName'], 'id': docData['id'], 'email': docData['email'], 'title': docData['title']})
      }));
  
      // console.log(temp);
      setTeachersArray(temp);
  }
  
  useEffect(() => {
    getTeachers();
  }, [])

  return (
    <div>
      {/* Replace div with component */}
      <Dir type="Teacher" comp={<Map ids={true} personNames={true} data={teachersArray} dataType={'Teacher'} email={true}/>}></Dir>
    </div>
  )
}

export default TeacherDir