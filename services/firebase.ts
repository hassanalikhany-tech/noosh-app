
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAja246w3aHwF3HtHbkEJv6FzkXiZQeQFM",
  authDomain: "nooshapp-97b0wj.firebaseapp.com",
  projectId: "nooshapp-97b0wj",
  storageBucket: "nooshapp-97b0wj.firebasestorage.app",
  messagingSenderId: "777764892284",
  appId: "1:777764892284:web:754b85880ecb6f4d13e3f9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// تنظیم ماندگاری فقط برای نشست فعلی مرورگر
setPersistence(auth, browserSessionPersistence);
export const db = getFirestore(app);
