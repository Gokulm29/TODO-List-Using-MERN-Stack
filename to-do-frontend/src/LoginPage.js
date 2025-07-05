// LoginPage.js
import React, { useState } from "react";
import { auth, provider, signInWithPopup } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      alert("Google login failed: " + error.message);
    }
  };

  // Email/Password Login
  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2 className="text-center mb-4">Login</h2>

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100 mb-3" onClick={handleEmailLogin}>
          Login
        </button>

        <hr />

        <button
          className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center"
          onClick={handleGoogleLogin}
        >
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
            alt="Google"
            width="20"
            className="me-2"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
