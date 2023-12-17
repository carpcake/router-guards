// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyArDF6IN0azIJaxFgSpBCmF0jQSr4_QhTo",
  authDomain: "routeguards.firebaseapp.com",
  projectId: "routeguards",
  storageBucket: "routeguards.appspot.com",
  messagingSenderId: "825386861286",
  appId: "1:825386861286:web:fd334fa251fb22d3bbb127",
  measurementId: "G-LWKVDQJHWQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Connect to Emulators
if (import.meta.env.DEV && !auth.emulatorConfig) {
  connectAuthEmulator(auth, "http://localhost:9099");
}

export { auth };
