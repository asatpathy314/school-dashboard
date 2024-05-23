import { db } from "../../firebase.js";
import { doc, collection, getDocs, query, where, setDoc, updateDoc, arrayUnion } from "firebase/firestore"; 

/*
const exampleStudentOutputFromForm = {
    firstName: "John",
    lastName: "Snow",
    id: "skdxjcj9423m2",
    classes: [
        {
            label: "Mrs. Johnson's 4th Grade Mathematics Class"
        }
    ],
    grade: "4th Grade"
}

exampleStudentDocumentInDatabase = {
    classes: {
        0: {
            class: _DocumentReference,
            grade: number
        }
    },
    firstName: string,
    lastName: string,
    fullName: string,
    id: string,
    grade: string,
}

exampleClassObjectInDatabase = {
    name: string
    grade: string
    subject: string
    teacher: _DocumentReference
    students: {
        0: {
            student: _DocumentReference,
        }
        1: {
            student: _DocumentReference,
        }
    }
}


*/
function generateUUID() {
    return crypto.randomUUID();
}


export const addStudent = async (student) => {
    const classesToUpdate = [];
    const uuid = generateUUID();

    for (let index = 0; index < student.classes.length; index++) {
        const q = query(collection(db, "classes"), where("name", "==", student.classes[index].label));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const classDocument = querySnapshot.docs[0];
            classesToUpdate.push(doc(db, '/classes/'+classDocument.id));
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
            grade: 100.00
        }))
    };

    // Create a new document for the student in the 'students' collection
    await setDoc(doc(db, "students"), studentData);

    // Update each class document to include the new student in its 'students' array
    for (const classRef of classesToUpdate) {
        await updateDoc(classRef, {
            students: arrayUnion(doc(db, "students", uuid))
        });
    }
}