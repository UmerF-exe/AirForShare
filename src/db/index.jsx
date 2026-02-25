import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, remove } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { data } from "react-router-dom";

const firebaseConfig = {
  
};


const app = initializeApp(firebaseConfig);
const database = getDatabase();
const storage = getStorage();

export { app, database, ref, set, onValue, remove, storage, storageRef, uploadBytesResumable, getDownloadURL };