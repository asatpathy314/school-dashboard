import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import Dir from '../components/Dir';
import Map from '../components/Map';
import { db } from "../../firebase";
import { addDoc, collection, getDocs, query, doc, getDoc, updateDoc, orderBy, average } from "firebase/firestore";

const Class = () => {
  const [studentsArray, setStudentsArray] = useState([]);
  const [className, setClassName] = useState('');
  const {id} = useParams();

  async function getStudents() {
    const classRef = doc(db, "classes", id);
    const classDoc = await getDoc(classRef);
    const students = classDoc.data()['students'];
    setClassName(classDoc.data()['name'])

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
      temp = [...temp, {
        'id': stuDoc.data()['id'], 
        'docId': stuDoc.id, 
        'classGrade': grade + '%', 
        'grade': stuDoc.data()['grade'], 
        'fullName': stuDoc.data()['fullName']}];
    }))
    setStudentsArray(temp);
  }

  useEffect(() => {
    getStudents();
  }, [])

  const handleSaveGrade = async (upRow) => {
    const grade = parseInt(upRow['classGrade'].split('%'));
    console.log(grade);
    const stuId = upRow['docId'];
    console.log(id);
    if (0 <= grade && 100 >= grade) {
      const stuDocRef = doc(db, 'students', stuId);
      const stuData = (await getDoc(stuDocRef)).data();
      let classes = stuData['classes']
      console.log()
      for (let i = 0; i < classes.length; i++) {
        console.log(classes[i]['class'].id, id);
        if (classes[i]['class'].id === id) {
          console.log(id);
          classes[i]['grade'] = grade;
        }
      }
      console.log(classes);
      await updateDoc(stuDocRef, {'classes': classes});
    }
}
  
  return (
    <>
      <div>
        <Dir 
          type="indClass" name={className} comp={
            <Map 
              id={true} 
              classGrade={true} 
              personNames={true} 
              studentGrades={true} 
              data={studentsArray} 
              dataType="indClass"
              handleSaveGrade={handleSaveGrade}/>
          } />
      </div>  
    </>
  )
}

export default Class