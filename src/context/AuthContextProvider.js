import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fire from "../fire";

export const authContext = createContext();
export const useAuth = () => useContext(authContext);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPaswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  const navigate = useNavigate();

  const clearInputs = () => {
    setEmail("");
    setPasword("");
    setName("");
    setPhone("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPaswordError("");
    setName("");
    setPhone("");
  };

  const handleSignUp = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => navigate("/"))
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPaswordError(err.message);

          default:
            break;
        }
      });
  };
  console.log(fire);
  const handleLogin = () => {
    clearErrors();

    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => navigate("/"))
      .catch((err) => {
        switch (err.code) {
          case "auth/user-disabled":
          case "auth/invalid-email":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPaswordError(err.message);
            break;

          default:
            break;
        }
      });
  };

  const handleLogout = () => {
    fire.auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  console.log(user);

  const values = {
    email,
    password,
    user,
    name,

    emailError,
    passwordError,
    hasAccount,

    setEmail,
    setName,
    setPasword,
    setHasAccount,

    handleSignUp,
    handleLogin,
    handleLogout,
  };
  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
