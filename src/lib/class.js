import { db } from "../../firebase.js";
import {
  doc,
  collection,
  getDocs,
  query,
  where,
  setDoc,
  updateDoc,
  arrayUnion,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

/*
Example form output object. (This will be the format of the input to addClass)
{
    teacher: "Noah White",
    grade: "Kindergarten",
    subject: "Homeroom",
    students: [
        {
            "label": "Joshua Moore"
        },
        {
            "label": "Daniel Martinez"
        },
        {
            "label": "Mia Anderson"
        }
    ]
}

Example class database object. (This will be the format of the document in the database)
{
    name: string, // The name of the class is generated as such. teacher.title +  teacher.lastName + "'s " + grade + " " + subject + " class"
    subject: string
    teacher: _DocumentReference
    students: _DocumentReference[]
}

Example teacher object. (This will be the format of the document in the database)

{
    firstName: "Noah" (string)
    lastName: "White" (string)
    fullName: "Noah White" (string)
    id: "012346" (string)
    email: "gmail@gmail.com" (string)
    title: "Mr." (string)
}
*/

/**
 * Adds a class to the database.
 * @param {Object} classData - The data of the class to be added.
 * @param {Object} classData.teacher - The teacher of the class.
 * @param {string} classData.teacher.title - The title of the teacher.
 * @param {string} classData.teacher.lastName - The last name of the teacher.
 * @param {string} classData.grade - The grade of the class.
 * @param {string} classData.subject - The subject of the class.
 * @param {Array} classData.students - The students in the class.
 * @returns {Promise<void>} - A promise that resolves when the class is added.
 */

const getByFullName = async (fullName, collectionName) => {
    // Create a query to find the document by fullName
    const q = query(
      collection(db, collectionName),
      where("fullName", "==", fullName)
    );
  
    // Execute the query
    const querySnapshot = await getDocs(q);
  
    // Check if the query returned any documents
    if (!querySnapshot.empty) {
      // Assuming there is only one document with the given fullName
      const retrievedDoc = querySnapshot.docs[0];
      return retrievedDoc;
    } else {
      console.log(`No document found with fullName: ${fullName}`);
      return null;
    }
  };
  
  export const addClass = async (classData) => {
    // Retrieve teacher data from the database.
    const teacherDoc = await getByFullName(classData.teacher, "teachers");
    if (teacherDoc === null) {
      console.error("Teacher not found.");
      return;
    }
    const teacher = teacherDoc.data();
  
    // Generate the class name
    const className = `${teacher.title} ${teacher.lastName}'s ${classData.grade} ${classData.subject} class`;
  
    // Create a query to find the class document by its name
    const classQuery = query(
      collection(db, "classes"),
      where("name", "==", className)
    );
    const classQuerySnapshot = await getDocs(classQuery);
  
    let classRef;
    if (!classQuerySnapshot.empty) {
      // If the class exists, get the document reference
      classRef = classQuerySnapshot.docs[0].ref;
      // Update the class document
      await updateDoc(classRef, {
        name: className,
        grade: classData.grade,
        subject: classData.subject,
        teacher: doc(db, "teachers", teacherDoc.id),
        students: await Promise.all(classData.students.map(async (student) => {
          const studentDoc = await getByFullName(student.label, "students");
          if (studentDoc === null) {
            console.error(`Student not found: ${student.label}`);
            return null;
          }
          return doc(db, "students", studentDoc.id);
        }).filter(ref => ref !== null)),
      });
    } else {
      // If the class does not exist, create a new document
      classRef = doc(collection(db, "classes"));
      await setDoc(classRef, {
        name: className,
        grade: classData.grade,
        subject: classData.subject,
        teacher: doc(db, "teachers", teacherDoc.id),
        students: await Promise.all(classData.students.map(async (student) => {
          const studentDoc = await getByFullName(student.label, "students");
          if (studentDoc === null) {
            console.error(`Student not found: ${student.label}`);
            return null;
          }
          return doc(db, "students", studentDoc.id);
        }).filter(ref => ref !== null)),
      });
    }
  
    // Iterate through the students and update their classes array
    for (const student of classData.students) {
      const studentDoc = await getByFullName(student.label, "students");
  
      if (studentDoc === null) {
        console.error(`Student not found: ${student.label}`);
        continue; // Skip to the next student
      }
  
      const studentData = studentDoc.data();
      const classExists = studentData.classes.some(
        (classItem) => classItem.class.id === classRef.id
      );
      const studentRef = doc(db, "students", studentDoc.id);
  
      if (!classExists) {
        await updateDoc(studentRef, {
          classes: arrayUnion({ class: classRef, grade: 100.0 }),
        });
      }
    }
  };