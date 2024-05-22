import { db } from "../../../firebase.js";
import { doc, collection, getDocs } from "firebase/firestore"; 

/**
 * Retrieves all objects from a specified collection in Firebase Firestore.
 * @param {string} collectionName - The name of the collection to retrieve objects from.
 * @returns {Array} - An array of objects retrieved from the collection.
 */
export const retrieveObjects = async (collectionName) => {
    const retrievedCollection = await getDocs(collection(db, collectionName))
    const allObjects = []
    if (!retrievedCollection.empty) {
        retrievedCollection.forEach((doc) => {
            allObjects.push (
                {
                    docid: doc.id,
                    ...doc.data()
                }
            )
        })
    }
    else {
        console.log(collectionName + ' is not a collection!')
    }
    return allObjects   
}

export const retrieveListByField = (fieldName, arrayOfObjects) => {
    const filteredList = arrayOfObjects.filter(obj => 
        Object.hasOwn ? Object.hasOwn(obj, fieldName) : Object.prototype.hasOwnProperty.call(obj, fieldName)
    );
    const fieldValueList = filteredList.map(obj => obj[fieldName]);
    return fieldValueList;
}

export const retrieveListByLabel = (fieldName, arrayOfObjects) => {
    const filteredList = arrayOfObjects.filter(obj => 
        Object.hasOwn ? Object.hasOwn(obj, fieldName) : Object.prototype.hasOwnProperty.call(obj, fieldName)
    );
    return filteredList.map(obj => {
        return {label: obj[fieldName]};
    });
}