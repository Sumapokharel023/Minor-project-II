import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDIrRYJugGvxHx6wFvPKMi5GjBMuZoGNDA",
  authDomain: "gigmitra-3e510.firebaseapp.com",
  projectId: "gigmitra-3e510",
  storageBucket: "gigmitra-3e510.firebasestorage.app",
  messagingSenderId: "897749708069",
  appId: "1:897749708069:web:81878606dc0b9cc98cfecc"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);