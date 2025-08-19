import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const app = getApps()[0] ?? initializeApp({
  apiKey: "AIzaSyB6WXPucosGzgkLKyYGHzgCN2rBWS9i8IA",
  authDomain: "middlemanerp.firebaseapp.com",
  projectId: "middlemanerp",
  storageBucket: "middlemanerp.firebasestorage.app",
  messagingSenderId: "997136674062",
  appId: "1:997136674062:web:408e40d13de9ef05f23b5f",
  measurementId: "G-3S0M4E8JBD"
});

export const fbAuth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
