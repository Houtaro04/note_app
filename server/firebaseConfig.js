// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase-admin/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAD30lKAiQoCG3-IYDXJhcT2CPfNE0C1OI",
  authDomain: "note-app-vanh.firebaseapp.com",
  projectId: "note-app-vanh",
  storageBucket: "note-app-vanh.firebasestorage.app",
  messagingSenderId: "205159095967",
  appId: "1:205159095967:web:3f577932d7f97393400caa",
  measurementId: "G-1CT2RL0VCS"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
