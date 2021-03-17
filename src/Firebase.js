import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBqJvGSbE1-5rXHV29JIzatAiADu00aDx4",
  authDomain: "poevouchers.firebaseapp.com",
  projectId: "poevouchers",
  storageBucket: "poevouchers.appspot.com",
  messagingSenderId: "442496752280",
  appId: "1:442496752280:web:7e7e55e6f961c604e0ceed",
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const db = app.firestore();
export default app;
