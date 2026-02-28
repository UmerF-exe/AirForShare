import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, remove } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { data } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyBCIOc7k1HxFHBDKpQgXnekIt56BWCQRgY",
  authDomain: "smit-react-batch10.firebaseapp.com",
  databaseURL: "https://smit-react-batch10-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smit-react-batch10",
  storageBucket: "smit-react-batch10.firebasestorage.app",
  messagingSenderId: "804833254161",
  appId: "1:804833254161:web:91f39857f4a8576ec28ab0",
  measurementId: "G-1E1R6HVE71"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase();
const storage = getStorage();

export { app, database, ref, set, onValue, remove, storage, storageRef, uploadBytesResumable, getDownloadURL };