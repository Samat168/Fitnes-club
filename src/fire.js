import firebase from "firebase/compat/app";
import "firebase/compat/app";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcz5_hmWtZhYtG8bIkCkkUJ_ZCmDV7mX0",
  authDomain: "register-react-9e0ba.firebaseapp.com",
  projectId: "register-react-9e0ba",
  storageBucket: "register-react-9e0ba.firebasestorage.app",
  messagingSenderId: "9982294287",
  appId: "1:9982294287:web:d770a1071d2d587102a67a",
  measurementId: "G-4RFBZWP5V9",
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
export default fire;
