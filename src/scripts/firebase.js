// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFWBBWIStAaHks8LE8i5NZlK0bzlzTBd4",
  authDomain: "proyecto2daw-ea39f.firebaseapp.com",
  projectId: "proyecto2daw-ea39f",
  storageBucket: "proyecto2daw-ea39f.appspot.com",
  messagingSenderId: "539974542367",
  appId: "1:539974542367:web:eac4111d122ee62517e12a",
  measurementId: "G-10KTHGQ1YK"
};

//Conectamos con la base de datos
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
//CRUD

export const saveData = (ref,objeto) => addDoc(collection(db,ref),objeto)
export const getDataCollection = (ref) => getDocs(collection(db,ref))

//Sobre una collection 
export const getDataChanged_collection = ( ref, callBack) => onSnapshot(collection(db,ref),callBack)
//Sobre un documento
export const getDataChanged_document = (ref, document, callBack) => onSnapshot(doc(db,ref, document),callBack)
export const deleteData = (id, ref) => deleteDoc(doc(db,ref,id))
export const getData = (id, ref) => getDoc(doc(db,ref,id))
export const updateData = (id, ref,objeto) => updateDoc(doc(db,ref,id),objeto)