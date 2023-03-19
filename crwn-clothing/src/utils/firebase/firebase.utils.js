import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query, 
  getDocs
} from "firebase/firestore";

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

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd, 
  field = 'title'
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  const arr = Array.from(objectsToAdd);

  arr.forEach((object) => {
    const docRef = doc(collectionRef, object[field].toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories'); 
  const q  = query(collectionRef); 

  const querySnapshot = await getDocs(q); 
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data(); 
    acc[title.toLowerCase()] = items ; 
    return acc ; 
  }, {} ); 

  return categoryMap; 
}; 

export const createUserDocumentFromAuth = async (
  userAuth,
  additinoalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additinoalInformation,
      });
    } catch (error) {
      console.log("error occurred while creating the user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListner = (callback) =>
  onAuthStateChanged(auth, callback);
