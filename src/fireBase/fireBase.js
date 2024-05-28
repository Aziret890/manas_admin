import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCg7wOB8yWzmBDSLm-NkDA2YHeCr2FRT38",
  authDomain: "manasadmin-8a816.firebaseapp.com",
  projectId: "manasadmin-8a816",
  storageBucket: "manasadmin-8a816.appspot.com",
  messagingSenderId: "247478068503",
  appId: "1:247478068503:web:48c7d4e214a859ded7c352",
  measurementId: "G-JK7ZY51YQZ",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app);
