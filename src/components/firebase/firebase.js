// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore'
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional




const firebaseConfig = {
  apiKey: "AIzaSyCvufccFNxFilBKmQdKWJLfgSmgksukyvk",
  authDomain: "sensesight-42d15.firebaseapp.com",
  projectId: "sensesight-42d15",
  storageBucket: "sensesight-42d15.appspot.com",
  messagingSenderId: "1067991417856",
  appId: "1:1067991417856:web:8f68f68e9b066d3b3904e5",
  measurementId: "G-QGFDDC6D5K"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const seriesRef = collection(db, "Series") ;
export const reviewsRef = collection(db, "Reviews") ;
export default app;
export {auth, provider}
