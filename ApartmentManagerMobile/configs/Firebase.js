import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider , signInWithPopup, sendPasswordResetEmail, signInWithEmailAndPassword, sendEmailVerification, createUserWithEmailAndPassword} from 'firebase/auth';

const firebaseConfig = { 
  apiKey : "AIzaSyDDl_73QhJ0RokMx6uPoArcYoHxLGWB934" , 
  authDomain : "chatapp-78174.firebaseapp.com" , 
  databaseURL : "https://chatapp-78174-default-rtdb.asia-southeast1.firebaseddatabase.app" , 
  projectId : "chatapp-78174" , 
  storageBucket : "chatapp-78174.appspot.com" , 
  messagingSenderId : "918576463068" , 
  appId : "1:918576463068:web:b9e3dc87a0dd9692980819" , 
  measurementId : "G-ZF7RFB3XXS" 
};



// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


export { db, auth, app, googleProvider, signInWithPopup , sendPasswordResetEmail, signInWithEmailAndPassword,sendEmailVerification,  createUserWithEmailAndPassword};
