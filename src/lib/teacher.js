import { db } from "../../../firebase.js";
import { doc, collection, getDocs, setDoc } from "firebase/firestore"; 

export const addTeacher = (data) => {
    setDoc(collection(db, "teachers"), {
        'firstName': data['firstName'],
        'lastName': data['lastName'],
        'id': data['id'],
        'title': data['pronoun'],
        'email': data['email'],
        'fullName': data['firstName'] + ' ' + data['lastName'],
        'classes': []
      });
}