import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyDulGJzH88qz_ndUz-HAZRhe2kajrxZdZc",
  authDomain: "applicationfinal-cff1d.firebaseapp.com",
  projectId: "applicationfinal-cff1d",
  storageBucket: "applicationfinal-cff1d.firebasestorage.app",
  messagingSenderId: "164252023978",
  appId: "1:164252023978:web:d6e93df07ea1fa3c82e4d3",
  measurementId: "G-SWRK16513T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export default db   