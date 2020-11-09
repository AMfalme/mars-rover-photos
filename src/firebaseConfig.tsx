import app from "firebase/app";
import firebase from "firebase/app";
// Required for side-effects
import "firebase/firestore";
import "firebase/database";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxstl_W5dOPpBe0f-vQ6f54aRI2zLWE08",
  authDomain: "mars-rover-photos-2ee07.firebaseapp.com",
  databaseURL: "https://mars-rover-photos-2ee07.firebaseio.com",
  projectId: "mars-rover-photos-2ee07",
  storageBucket: "mars-rover-photos-2ee07.appspot.com",
  messagingSenderId: "762400509843",
  appId: "1:762400509843:web:55b8e46f3c04b06d236266",
  measurementId: "G-7JFZ2BNTZ0",
};

export const firebaseApp = app.initializeApp(firebaseConfig);

export const fireStore = firebase.firestore();

export const db = firebase.database();
