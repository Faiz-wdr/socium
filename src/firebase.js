// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAh0WEXeOtgUH4b9NunVOofzm5Rptenqps",
  authDomain: "authentication-app-a3c6d.firebaseapp.com",
  databaseURL: "https://authentication-app-a3c6d-default-rtdb.firebaseio.com",
  projectId: "authentication-app-a3c6d",
  storageBucket: "authentication-app-a3c6d.appspot.com",
  messagingSenderId: "377671058548",
  appId: "1:377671058548:web:9a23e5fd3194795b5c7d21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =  getAuth(app);
export const db = getFirestore(app);