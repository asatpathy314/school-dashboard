import { db } from "../../firebase.js";
import { doc, collection, addDoc, deleteDoc, updateDoc, query, where, getDocs } from "firebase/firestore";

/**
 * Adds an event to the Firestore database.
 * If the event document already exists, it updates the existing document with new data.
 * If the event document does not exist, it creates a new document with auto-generated id.
 *
 * @param {Object} event - The event object containing the event's information.
 * @param {string} event.name - The name of the event.
 * @param {string} event.description - The description of the event.
 * @param {string} event.startDate - The start date of the event in ISO format.
 * @param {string} event.endDate - The end date of the event in ISO format.
 *
 * @example
 * // Example input:
 * {
 *     "name": "asdfasdf",
 *     "description": "asdf",
 *     "startDate": "2024-05-02T04:00:00.000Z",
 *     "endDate": "2024-05-03T04:00:00.000Z"
 * }
 */
export const addEvent = async (event) => {
  try {
    // Create a reference to the events collection
    const eventsCollectionRef = collection(db, "events");

    // Check if the event already exists by name
    const eventQuery = query(eventsCollectionRef, where("name", "==", event.name));
    const querySnapshot = await getDocs(eventQuery);

    if (!querySnapshot.empty) {
      // Document exists, update the existing document with new data
      const eventDoc = querySnapshot.docs[0];
      const eventRef = eventDoc.ref;
      await updateDoc(eventRef, {
        name: event.name,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
      });
      console.log("Event information updated.");
    } else {
      // Document does not exist, create a new document with an auto-generated ID
      await addDoc(eventsCollectionRef, {
        name: event.name,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
      });
      console.log("New event added.");
    }
  } catch (error) {
    console.error("Error adding or updating event: ", error);
  }
};


/**
 * Removes events from the Firestore database based on their names.
 *
 * @param {Array} events - An array of event objects.
 * @param {string} events[].label - The name of the event.
 *
 * @example
 * // Example input:
 * [
 *     {
 *         "label": "New Year's Event"
 *     },
 *     {
 *         "label": "Easter Party"
 *     }
 * ]
 */
export const removeEvent = async (events) => {
  console.log(events)
  for (let i = 0; i < events.length; i++) {
    // Create a query to find the event by name
    const q = query(collection(db, "events"), where("name", "==", events[i].label));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // If the event exists, delete the document
      const eventDocument = querySnapshot.docs[0];
      await deleteDoc(doc(db, "events", eventDocument.id));
      console.log("Event document located at " + eventDocument.id + " has been deleted.");
    } else {
      // If no event is found with the given name, log a message
      console.log("No document found for event: " + events[i].label);
    }
  }
};