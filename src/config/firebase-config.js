import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCuGERcCN5xVmMlD2ZVFUMCBlimoy5yJlQ",
  authDomain: "fir-6f34e.firebaseapp.com",
  projectId: "fir-6f34e",
  storageBucket: "fir-6f34e.firebasestorage.app",
  messagingSenderId: "211803360469",
  appId: "1:211803360469:web:fc0c5ce7afb824d455e65c",
  measurementId: "G-62TFKDR2MJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const database = getDatabase(app);

