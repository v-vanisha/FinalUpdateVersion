// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from 'firebase/firestore';

  //final firebase 
  const firebaseConfig = {
    apiKey: "AIzaSyCYhGUn4Zeaf-zACZ4B2orvNdJWq9HFdTQ",
    authDomain: "nexumbest.firebaseapp.com",
    projectId: "nexumbest",
    storageBucket: "nexumbest.appspot.com",
    messagingSenderId: "333151438394",
    appId: "1:333151438394:web:83bbd93114bb78ee1e5703"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();
const db = getFirestore();
export { auth, storage, db };
export default app;