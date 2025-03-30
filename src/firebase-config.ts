// firebase-config.ts
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBAru-mfyRqfyEQQ7gqpfMNb1jIU6p2Yhg",
  authDomain: "studio-ed3d3.firebaseapp.com",
  projectId: "studio-ed3d3",
  storageBucket: "studio-ed3d3.firebasestorage.app",
  messagingSenderId: "567021990464",
  appId: "1:567021990464:web:7b6c226f2f1219b690a5a5",
  measurementId: "G-VTDVS4CDZL"
};

// Inicializar Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const analytics: Analytics = getAnalytics(app);
const db: Firestore = getFirestore(app);

export { app, analytics, db };
