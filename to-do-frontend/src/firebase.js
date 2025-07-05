import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword, // ✅ added
  createUserWithEmailAndPassword, // (optional if you want signup too)
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyADQMY6mA-UvEjE3tAhkZbVCot2hSztf0c",
  authDomain: "todo-6d4d4.firebaseapp.com",
  projectId: "todo-6d4d4",
  storageBucket: "todo-6d4d4.firebasestorage.app",
  messagingSenderId: "637964630690",
  appId: "1:637964630690:web:a77b5316c0856a3bcbb5fb",
  measurementId: "G-CEFFT1FJPP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ✅ Export all needed methods
export {
  auth,
  provider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword, // optional for signup
  signOut
};
