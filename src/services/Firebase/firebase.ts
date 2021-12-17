// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // import firebase from "firebase/compat/app";
// import { getDatabase, ref } from "firebase/database";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";
import "firebase/auth";
// import {
//   getAuth,
//   setPersistence,
//   browserLocalPersistence,
// } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyD_DlFa_PRnkkc65XlY2HjBVqAKS9GABd0",
  authDomain: "gbm-challenge-ipc.firebaseapp.com",
  projectId: "gbm-challenge-ipc",
  databaseURL: "https://gbm-challenge-ipc-default-rtdb.firebaseio.com",
  storageBucket: "gbm-challenge-ipc.appspot.com",
  messagingSenderId: "589948537249",
  appId: "1:589948537249:web:d970366fce7b1bc23323e0",
};

// Initialize Firebase
// export const fbApp = firebase.initializeApp(firebaseConfig);
export const fbApp = firebase.initializeApp(firebaseConfig);
export const persistence = firebase.auth.Auth.Persistence.LOCAL;
export const fb = firebase;
export const fbAuth = fb.auth();
fbAuth.setPersistence(persistence);
