import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import Dir from '../components/Dir';
import Map from '../components/Map';
import { db } from "../../firebase";
import { addDoc, collection, getDocs, query, doc, getDoc, updateDoc, orderBy, average } from "firebase/firestore";

const Class = () => {
  const [studentsArray, setStudentsArray] = useState([]);
  const {id} = useParams();

  async function getStudents() {
    const classRef = doc(db, "classes", id);
    const classDoc = await getDoc(classRef);
    const students = classDoc.data()['students'];

    let temp = [];

    await Promise.all(students.map(async (stuRef) => {
      const stuDoc = await getDoc(stuRef);
      const classes = stuDoc.data()['classes'];
      let grade = null;
      for (const c of classes) {
        // console.log(stuRef, c['class'].id, id)
        if (c['class'].id === id) {
          grade = c['grade'];
        }
      }
      temp = [...temp, {'id': stuDoc.data()['id'], 'classGrade': grade + '%', 'grade': stuDoc.data()['grade'], 'fullName': stuDoc.data()['fullName']}];
      console.log(temp);
    }))
    setStudentsArray(temp);
  }

  useEffect(() => {
    getStudents();
  }, [])
  
  return (
    <>
      <div>
        <Dir type="Student" comp={<Map id={true} classGrade={true} personNames={true} studentGrades={true} data={studentsArray}/>}></Dir>
      </div>  
    </>
  )
}

export default Class