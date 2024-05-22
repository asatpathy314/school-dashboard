import React, {useState, useEffect} from 'react';
import Dir from '../components/Dir';
import Map from '../components/Map'


import { db } from "../../firebase";
import { addDoc, collection, getDocs, query, doc, getDoc, updateDoc, orderBy, average } from "firebase/firestore";

const Classes = () => {
  const [classesArray, setClassesArray] = useState([]);

  async function getTeachers() {
    const collRef = collection(db, "classes");
    const classSnapshot = await getDocs(query(collRef));
    let temp = [];

    await Promise.all(classSnapshot.docs.map(async (doc) =>  {
      try {
        const id = doc.id;
        const students = doc.data()['students'];
        let grade = 0;
        
        for (const stuRef of students) {
          const stuDoc = await getDoc(stuRef);
          // console.log('stu', stuRef);
          const classes = stuDoc.data()['classes'];
          classes.forEach((c) => {
            // console.log(c['class'].id, id)
            if (c['class'].id === id) {
              grade = grade + c['grade'];
            }
          })
        }

        const avg = grade / students.length;

        const teacherRef = doc.data()['teacher']
        // console.log('tea', teacherRef);
        const teacherDoc = await getDoc(teacherRef);
        // console.log('tdoc', teacherDoc.data()['name'], teacherDoc.id, id);
        // console.log(avg);

        temp.push({'id': doc.id, 'className': doc.data()['name'], 'averageGrade': avg + '%', 'fullName': teacherDoc.data()['name']});
        // console.log(temp);
      } catch {
        console.log("a");
      }
    }));

    setClassesArray(temp);
    console.log('hiii', temp);
    console.log('hello', classesArray);
}

  useEffect(() => {
    getTeachers();
  }, [])

  const data = [
    { fullName: 'John Doe', id: '123456' },
    { fullName: 'Jane Smith', id: '234567' },
    { fullName: 'Michael Johnson', id: '345678' },
    { fullName: 'Emily Brown', id: '456789' },
    { fullName: 'William Taylor', id: '567890' },
  ];

  return (
    <div>
      {/* Replace div with component */}
      <Dir type="Class" comp={<Map ids={true} classNames={true} averageGrades={true} personNames={true} data={classesArray}/>}></Dir>
    </div>
  )
}

export default Classes