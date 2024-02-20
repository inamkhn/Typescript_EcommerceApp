// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC1spYVx3cB5vj0c2N0ZFaXBWYm5VRHSH4",
  authDomain: "realestate-f9ffd.firebaseapp.com",
  projectId: "realestate-f9ffd",
  storageBucket: "realestate-f9ffd.appspot.com",
  messagingSenderId: "287786470128",
  appId: "1:287786470128:web:7bca80eeefc0b2cc1a1035",
  measurementId: "G-PF6XBGMNLY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)