// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAME45e-85ca3KcylGWNceT2WFd3Yn42ps",
  authDomain: "adgen-mcm---ad-generator.firebaseapp.com",
  projectId: "adgen-mcm---ad-generator",
  storageBucket: "adgen-mcm---ad-generator.firebasestorage.app",
  messagingSenderId: "340851760898",
  appId: "1:340851760898:web:0ed56b613a48fe36fbec1b",
  measurementId: "G-YM4NSQ126N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);