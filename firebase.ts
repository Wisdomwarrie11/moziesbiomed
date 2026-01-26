import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBBbSl4Qw8IUyqXC-h42o4OIMnuu-bNSow",
  authDomain: "moziesbiomed.firebaseapp.com",
  projectId: "moziesbiomed",
  storageBucket: "moziesbiomed.firebasestorage.app",
  messagingSenderId: "356991713390",
  appId: "1:356991713390:web:6f4947a51e6f644c08e67f"
};

// Initialize Firebase once and share the instance across services
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;