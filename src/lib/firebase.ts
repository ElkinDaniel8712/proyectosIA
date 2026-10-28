import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDOzFQ5MhhtNHve7Z3h9iq_Q1SLiNq1d4",
  authDomain: "gen-lang-client-0454135713.firebaseapp.com",
  projectId: "gen-lang-client-0454135713",
  storageBucket: "gen-lang-client-0454135713.firebasestorage.app",
  messagingSenderId: "393280242352",
  appId: "1:393280242352:web:7b9949e0546af3ee473175",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
// We must specify the custom firestore databaseId if it is specified in our configuration
export const db = getFirestore(app, "ai-studio-radardeoportunid-a589f000-369d-4fb7-b46c-6e59d74abb8e");

export default app;
