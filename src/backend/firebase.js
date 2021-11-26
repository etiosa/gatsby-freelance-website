// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBx_grtrAfwbr8EaHxXECXYHpgX7iQVRhY",
  authDomain: "freelancewebsite-bdd13.firebaseapp.com",
  projectId: "freelancewebsite-bdd13",
  storageBucket: "freelancewebsite-bdd13.appspot.com",
  messagingSenderId: "67006628591",
  appId: "1:67006628591:web:0647dabbb50d1f5369911a",
  measurementId: "G-9YJZV9RRZ4",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const firestore = getFirestore()
export { collection, addDoc, firestore, serverTimestamp }
