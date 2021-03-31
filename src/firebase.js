import firebase from "firebase/app";
import "firebase/firestore";


// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDK256TdQLashcpLs0uCt1o1V8D9cDpFpE",
  authDomain: "react-crud-e00bb.firebaseapp.com",
  projectId: "react-crud-e00bb",
  storageBucket: "react-crud-e00bb.appspot.com",
  messagingSenderId: "733477402480",
  appId: "1:733477402480:web:178c755a5efb53889f81b5"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();

