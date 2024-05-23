import { db } from "../../firebase.js";
import { doc, getDoc, setDoc, query, collection, where, getDocs, deleteDoc } from "firebase/firestore";

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
  // Create a reference to the teacher document based on the teacher's id
  const teacherRef = doc(db, "teachers", teacher.id);

  // Try to retrieve the document from Firestore
  const docSnap = await getDoc(teacherRef);

  // Check if the document exists
  if (docSnap.exists()) {
    // Document exists, update the existing document with new data
    await setDoc(
      teacherRef,
      {
        firstName: teacher["firstName"],
        lastName: teacher["lastName"],
        id: teacher["id"],
        title: teacher["title"],
        email: teacher["email"],
        fullName: teacher["firstName"] + " " + teacher["lastName"],
      },
      { merge: true }
    ); // Use merge option to update existing fields and add new fields
    console.log("Teacher information updated.");
  } else {
    // Document does not exist, create a new document
    await setDoc(teacherRef, {
      firstName: teacher["firstName"],
      lastName: teacher["lastName"],
      id: teacher["id"],
      title: teacher["title"],
      email: teacher["email"],
      fullName: teacher["firstName"] + " " + teacher["lastName"],
    });
    console.log("New teacher added.");
  }
};

/* 
example input
[
    {
        "label": "Noah White"
    },
    {
        "label": "Emma Garcia"
    }
]
*/

/**
 * Removes teachers from the Firestore database.
 * 
 * @param {Array} teachers - An array of teacher objects to be removed.
 * @param {string} teachers[].label - The full name of the teacher to be removed.
 *
 * @example
 * // Example input:
 * [
 *     {
 *         "label": "Noah White"
 *     },
 *     {
 *         "label": "Emma Garcia"
 *     }
 * ]
 */

export const removeTeacher = async (teachers) => {
  for (const teacher of teachers) {
    // Create a query to find the teacher document based on the full name
    const teacherQuery = query(
      collection(db, "teachers"),
      where("fullName", "==", teacher.label)
    );
    const querySnapshot = await getDocs(teacherQuery);

    if (querySnapshot.empty) {
      console.error(`Teacher not found: ${teacher.label}`);
      continue;
    }

    // Assuming there is only one document with the given fullName
    const teacherDoc = querySnapshot.docs[0];
    const teacherRef = teacherDoc.ref;

    // Delete the teacher document
    await deleteDoc(teacherRef);
    console.log(`Teacher ${teacher.label} removed successfully.`);
  }
};