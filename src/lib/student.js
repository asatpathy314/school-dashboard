import { db } from "../../firebase.js";
import { getByFullName } from "./class.js";
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

/**
 * Adds a student to the database if it doesn't exist. Otherwise, updates the student's information.
 * @param {Object} student - The student object to be added.
 * @param {string} student.id - The ID of the student.
 * @param {string} student.firstName - The first name of the student.
 * @param {string} student.lastName - The last name of the student.
 * @param {string} student.grade - The grade of the student.
 * @param {Array} student.classes - An array of classes the student is enrolled in.
 */
export const addStudent = async (student) => {
  const studentRef = doc(collection(db, "students"));
  const studentDoc = await getByFullName(student.firstName + " " + student.lastName, "students")

  const classesToUpdate = [];

  for (let index = 0; index < student.classes.length; index++) {
    const q = query(
      collection(db, "classes"),
      where("name", "==", student.classes[index].label)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const classDocument = querySnapshot.docs[0];
      classesToUpdate.push(doc(db, "/classes/" + classDocument.id));
    }
  }

  const studentData = {
    firstName: student.firstName,
    lastName: student.lastName,
    fullName: `${student.firstName} ${student.lastName}`,
    id: student.id,
    grade: student.grade,
    classes: classesToUpdate.map((classRef, index) => ({
      class: classRef,
      grade: 100.0,
    })),
  };

  // If the student exists, update their information
  if (studentDoc !== null) {
    await updateDoc(doc(db, "students", studentDoc.id), studentData);
  } else {
    // If the student does not exist, create a new document
    await setDoc(studentRef, studentData);
  }

  // Update each class document to include the new or updated student in its 'students' array
  for (const classRef of classesToUpdate) {
    await updateDoc(classRef, {
      students: arrayUnion(studentRef),
    });
  }
};

/**
 * Removes students from the 'students' collection based on their names.
 * @param {Object} studentsToRemove - An object containing an array of student objects to remove. Key label, data fullName.
 * @param {Array} studentsToRemove.students - An array of students to remove.
 * @param {string} studentsToRemove.students[].label - The name of the student to remove.
 * @returns {Promise<void>} - A promise that resolves when all students have been removed.
 */
export const removeStudent = async (studentsToRemove) => {
  // Assuming 'students' collection stores the students with a 'name' field
  const studentsCollectionRef = collection(db, "students");
  // console.log(studentsToRemove);
  for (const student of studentsToRemove.students) {
    // Create a query to find the student document by their name
    const q = query(studentsCollectionRef, where("fullName", "==", student.label));
    const querySnapshot = await getDocs(q);

    // Assuming each name is unique and only returns one document
    if (!querySnapshot.empty) {
      const studentDocument = querySnapshot.docs[0];
      // Delete the found student document
      await deleteDoc(doc(db, "students", studentDocument.id));
      console.log(`Deleted student: ${student.label}`);
    } else {
      console.log(`Student not found: ${student.label}`);
    }
  }
};
