
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-33356.firebaseapp.com",
  projectId: "mern-auth-33356",
  storageBucket: "mern-auth-33356.appspot.com",
  messagingSenderId: "480904489895",
  appId: "1:480904489895:web:e8643098f092e8faf1e482"
};

 export const app = initializeApp(firebaseConfig);