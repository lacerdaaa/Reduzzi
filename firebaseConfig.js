import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCNVvS3JxzHcfok0x9Y4wLFRZdPiUnN630",
  authDomain: "reduzzi-6eb49.firebaseapp.com",
  projectId: "reduzzi-6eb49",
  storageBucket: "reduzzi-6eb49.firebasestorage.app",
  messagingSenderId: "217112197945",
  appId: "1:217112197945:web:0f77a453364359dd6ec6e8",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);