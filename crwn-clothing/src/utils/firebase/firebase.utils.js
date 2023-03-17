import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCmINJxz5u-722b5QUzhWb5PI7BNyNwzlM",
  authDomain: "crwn-clothing-db-862a2.firebaseapp.com",
  projectId: "crwn-clothing-db-862a2",
  storageBucket: "crwn-clothing-db-862a2.appspot.com",
  messagingSenderId: "516963724134",
  appId: "1:516963724134:web:4c8105c926dd9b6b3636a7",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
