// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyDbZNrs92y_MN9146E7Ba1uFxnf6gxSEPs",
  authDomain: "lihawu-online-shop.firebaseapp.com",
  projectId: "lihawu-online-shop",
  storageBucket: "lihawu-online-shop.firebaseapp.com",
  messagingSenderId: "977919476110",
  appId: "1:977919476110:web:355329a23703154cd824df",
  measurementId: "G-BXTD31W7XX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore instance
const db = getFirestore(app);

// Export app and db for reuse in other modules
export { app, db };
