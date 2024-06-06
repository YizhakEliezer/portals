import React, { useState } from "react";
import { auth, database, provider } from "../firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import Loading from "./Loading";
import googleLogo from '../google1Logo.svg';
import './main.css';
import logo from './Logo.png';



const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();











  const signInWithGoogle = () => {
    setIsLoading(true)
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result)
        navigate('/user');


      })
      .catch((error) => {
        console.log(error)
      })


  }




  if (isLoading) {
    return <Loading />;
  }


  return (
    <div>

      <div className="titel-container">
      </div>
      <div className="logo-container">
        <img src={logo} alt="logo" className="logo" />
      </div>


      <div className="container-login">
        <div className="main-eror">
          <div className="erorScreen">
            <h2>ברוכים הבאים למרכז השליטה של סטורנקסט<br/><br/>התחברו כדי להתחיל</h2>
            <button className="signin" onClick={signInWithGoogle}>
              <img src={googleLogo} className="googleLogo" alt="Google Logo" />Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Login;
