import { GoogleAuthProvider, getAuth } from'firebase/auth'
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBITFOuF3NxYW4LRU_CtCDl6JnL65nlEMg",
  authDomain: "foodhunders-17.firebaseapp.com",
  projectId: "foodhunders-17",
  storageBucket: "foodhunders-17.appspot.com",
  messagingSenderId: "1022248883544",
  appId: "1:1022248883544:web:c84732367f13bf81ca012d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()
export default app;
