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
    console.log(classSnapshot);
    let temp = [];

    await Promise.all(classSnapshot.docs.map(async (doc) =>  {
      try {
        console.log("hi")
        const id = doc.id;
        const students = doc.data()['students'];
        let grade = 0;
        
        for (const stuRef of students) {
          const stuDoc = await getDoc(stuRef);
          const classes = stuDoc.data()['classes'];
          classes.forEach((c) => {
            if (c['class'].id === id) {
              grade = grade + c['grade'];
            }
          })
        }

        const avg = grade / students.length;
        console.log(avg)

        const teacherRef = doc.data()['teacher']
        const teacherDoc = await getDoc(teacherRef);

        temp.push({'id': doc.id, 'className': doc.data()['name'], 'averageGrade': avg + '%', 'fullName': teacherDoc.data()['fullName']});
        console.log('hiiiiiii', temp)
      } catch {
        console.log("a");
      }
    }));

    setClassesArray(temp);
}

  useEffect(() => {
    getTeachers();
  }, [])

  return (
    <div>
      {/* Replace div with component */}
      <Dir type="Class" comp={<Map ids={true} classNames={true} averageGrades={true} personNames={true} data={classesArray} dataType={'Class'}/>}></Dir>
    </div>
  )
}

export default Classes