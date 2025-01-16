import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDMFSfvPid9vixJFvOLW2nX99cULWAII3k",
  authDomain: "indicareduzzi.firebaseapp.com",
  projectId: "indicareduzzi",
  storageBucket: "indicareduzzi.firebasestorage.app",
  messagingSenderId: "658481078702",
  appId: "1:658481078702:web:f3701d91325805eb38a83f",
  measurementId: "G-C2Q7033WQP"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);

//configurações do firebase para declarar as credenciais, inicializar o app, db e storage
