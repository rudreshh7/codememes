import React from "react";
import { auth, provider } from "../lib/firebase.js";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate("/");
  };
  return (
    <div>
      <p>Sign in With Google to Continue</p>
      <button onClick={signInWithGoogle}>Sign in With Google</button>
    </div>
  );
};

export default LoginPage;
