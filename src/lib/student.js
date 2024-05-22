import { db } from "../../../firebase.js";
import { doc, collection, getDoc, getDocs, query, where } from "firebase/firestore"; 

const exampleStudent = {
    "firstName": "John",
    "lastName": "Snow",
    "id": "skdxjcj9423m2",
    "classes": [
        {
            "label": "Mrs. Johnson's 4th Grade Mathematics Class"
        }
    ],
    "grade": "4th Grade"
}

const addStudent = async (student) => {
    const classesToUpdate = [];
    for (let index = 0; index < student.classes.length; index++) {
        const q = query(collection(db, "classes"), where("name", "==", student.classes[index].label));
        const querySnapshot = await getDocs(q);
        const classDocument = querySnapshot.docs[0];
        const classRef = doc(db, '/classes/'+classDocument.id);
        const classSnapshot = await getDoc(classRef);
        student.classes[index] = {class: doc(db, '/classes/'+classDocument.id)};
    }
}