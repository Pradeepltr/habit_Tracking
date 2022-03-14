// Import the functions you need from the SDKs you need
import { configure } from "@testing-library/react";
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAB1F22WFhu3r9-dOT_KLgPyqnv2iHPiEY",
  authDomain: "movieapp-6ca30.firebaseapp.com",
  databaseURL: "https://movieapp-6ca30-default-rtdb.firebaseio.com",
  projectId: "movieapp-6ca30",
  storageBucket: "movieapp-6ca30.appspot.com",
  messagingSenderId: "938157594798",
  appId: "1:938157594798:web:55497c6d1897f339dfb53f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const FirDb=getFirestore(app)
// export firebase configure
export {FirDb};
