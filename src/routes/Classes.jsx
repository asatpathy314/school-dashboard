import React, {useState, useEffect} from 'react';
import Dir from '../components/Dir';
import Map from '../components/Map'
import { db } from "../../firebase";
import { addDoc, collection, getDocs, query, doc, getDoc, updateDoc, orderBy, average } from "firebase/firestore";

const Classes = () => {
  const [classesArray, setClassesArray] = useState([]);

  async function getClasses() {
    const collRef = collection(db, "classes");
    const classSnapshot = await getDocs(query(collRef));
    let temp = [];

    await Promise.all(classSnapshot.docs.map(async (doc) =>  {
      try {
        // console.log("hi")
        const id = doc.id;
        const students = doc.data()['students'];
        let gradeSum = 0;
        let avg = 0;
        
        console.log(students.length)
        if (students.length > 0) {
          for (const stuRef of students) {
            const stuDoc = await getDoc(stuRef);
            const classes = stuDoc.data()['classes'];
            classes.forEach((c) => {
              gradeSum = gradeSum + c['grade'];
            })
          }
          avg = gradeSum / students.length;
          avg = avg.toFixed(2);
        } else {
          avg = 'N/A';
        }

        // console.log(gradeSum)
        
        console.log(avg);

        const teacherRef = doc.data()['teacher']
        const teacherDoc = await getDoc(teacherRef);

        temp.push({'id': doc.id, 'className': doc.data()['name'], 'averageGrade': avg, 'fullName': teacherDoc.data()['fullName']});
      } catch (error) {
        console.log("Error fetching class data: ", error);
      }
    }));

    setClassesArray(temp);
}

  useEffect(() => {
    getClasses();
  }, [])

  return (
    <div>
      {/* Replace div with component */}
      <Dir type="Class" comp={<Map 
        ids={true} 
        classNames={true} 
        averageGrades={true} 
        personNames={true} 
        data={classesArray} 
        dataType={'Class'}/>}>
      </Dir>
    </div>
  )
}

export default Classes