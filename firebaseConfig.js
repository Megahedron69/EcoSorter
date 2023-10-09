import { initializeApp, getApp } from "firebase/app";
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCGkD-IQstnW3RvP6hDqf6UnNByN_RuVzI",
  authDomain: "ecosorter-f9a91.firebaseapp.com",
  projectId: "ecosorter-f9a91",
  storageBucket: "ecosorter-f9a91.appspot.com",
  messagingSenderId: "420358093793",
  appId: "1:420358093793:web:e18a84b4d9f1116d4530a0",
  measurementId: "G-J2KLFFZXEB",
};

const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export default app;
