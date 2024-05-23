import { db } from "../../firebase.js";
import { doc, collection, addDoc, getDocs, query, where, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { getByFullName } from "./class.js";

/**
 * Adds a teacher to the Firestore database.
 * If the teacher document already exists, it updates the existing document with new data.
 * If the teacher document does not exist, it creates a new document.
 *
 * @param {Object} teacher - The teacher object containing the teacher's information.
 * @param {string} teacher.firstName - The first name of the teacher.
 * @param {string} teacher.lastName - The last name of the teacher.
 * @param {string} teacher.id - The ID of the teacher.
 * @param {string} teacher.email - The email of the teacher.
 * @param {string} teacher.title - The title of the teacher.
 *
 * @example
 * // Example input:
 * {
 *     "firstName": "Jenkins",
 *     "lastName": "Long",
 *     "id": "asdf",
 *     "email": "asdfasdf@gmail.com",
 *     "title": "Mr."
 * }
 */
export const addTeacher = async (teacher) => {
  try {
    // Create a reference to the teachers collection
    const teachersCollectionRef = collection(db, "teachers");

    // Check if the teacher already exists by full name
    const docSnap = await getByFullName(`${teacher.firstName} ${teacher.lastName}`, "teachers");

    if (docSnap!==null) {
      const teacherRef = doc(db, "collection", docSnap.id)
      // Document exists, update the existing document with new data
      await updateDoc(teacherRef, {
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        id: teacher.id,
        title: teacher.title,
        email: teacher.email,
        fullName: `${teacher.firstName} ${teacher.lastName}`,
      });
      console.log("Teacher information updated.");
    } else {
      // Document does not exist, create a new document with an auto-generated ID
      await addDoc(teachersCollectionRef, {
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        id: teacher.id,
        title: teacher.title,
        email: teacher.email,
        fullName: `${teacher.firstName} ${teacher.lastName}`,
      });
      console.log("New teacher added.");
    }
  } catch (error) {
    console.error("Error adding or updating teacher: ", error);
  }
};

/**
 * Removes teachers from the Firestore database based on their full names.
 *
 * @param {Array} teachers - An array of teacher objects.
 * @param {string} teachers[].label - The full name of the teacher.
 *
 * @example
 * // Example input:
 * [
 *     {
 *         "label": "Jenkins Long"
 *     },
 *     {
 *         "label": "John Doe"
 *     }
 * ]
 */
export const removeTeacher = async (teachers) => {
  for (let i = 0; i < teachers.length; i++) {
    const q = query(collection(db, "teachers"), where("fullName", "==", teachers[i].label));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const teacherDocument = querySnapshot.docs[0];
      await deleteDoc(doc(db, "teachers", teacherDocument.id));
      console.log("Teacher document located at " + teacherDocument.id + " has been deleted.");
    } else {
      console.log("No document found for teacher: " + teachers[i].label);
    }
  }
};