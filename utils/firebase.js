// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvVP2RRRl9a-_xIA0O4aHM9OWw6mGr1HQ",
  authDomain: "being-kreatibh.firebaseapp.com",
  projectId: "being-kreatibh",
  storageBucket: "being-kreatibh.appspot.com",
  messagingSenderId: "1025177772902",
  appId: "1:1025177772902:web:e953fedfc1671447c65ea7",
  measurementId: "G-9T1KSEGX5K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore(app);