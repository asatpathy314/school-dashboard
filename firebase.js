// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const VITE_API_KEY="AIzaSyCSgJeCBTbSptKaJN7CcaZMY5ol8F5cjYU"
const VITE_AUTH_DOMAIN = "school-dashboard-3b6e6.firebaseapp.com"
const VITE_PROJECT_ID= "school-dashboard-3b6e6"
const VITE_STORAGE_BUCKET = "school-dashboard-3b6e6.appspot.com"
const VITE_MESSAGING_SENDER_ID = "1006719491047"
const VITE_APP_ID = "1:1006719491047:web:ce30b2dc2ea65957dcbb42"
const VITE_MEASUREMENT_ID =" G-S4BM27Y48T"

const firebaseConfig = {
    apiKey: VITE_API_KEY,
    authDomain: VITE_AUTH_DOMAIN,
    projectId: VITE_PROJECT_ID,
    storageBucket: VITE_STORAGE_BUCKET,
    messagingSenderId: VITE_MESSAGING_SENDER_ID,
    appId: VITE_APP_ID,
    measurementId: VITE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}