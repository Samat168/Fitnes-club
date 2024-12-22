import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import AuthContextProvider from "./context/AuthContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDcz5_hmWtZhYtG8bIkCkkUJ_ZCmDV7mX0",
  authDomain: "register-react-9e0ba.firebaseapp.com",
  projectId: "register-react-9e0ba",
  storageBucket: "register-react-9e0ba.firebasestorage.app",
  messagingSenderId: "9982294287",
  appId: "1:9982294287:web:d770a1071d2d587102a67a",
  measurementId: "G-4RFBZWP5V9",
});

export const Context = createContext(null);
const auth = firebase.auth();
const firestore = firebase.firestore();

root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <Context.Provider
        value={{
          firebase,
          auth,
          firestore,
        }}
      >
        <App />
      </Context.Provider>
    </AuthContextProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
