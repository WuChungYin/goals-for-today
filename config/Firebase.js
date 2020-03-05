import firebase from "firebase";
import "firebase/firestore";

import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  MESSAGE_SENDER_ID,
  APP_ID
} from "react-native-dotenv";

export const firebaseConfig = {
  apiKey: "AIzaSyBbQ9qFDVKmQU4gUHGnLaM1Th7AXtNmfWM",
  authDomain: "new-goals-ecaa1.firebaseapp.com",
  databaseURL: "https://new-goals-ecaa1.firebaseio.com",
  projectId: "new-goals-ecaa1",
  storageBucket: "new-goals-ecaa1.appspot.com",
  messagingSenderId: "591533529053",
  appId: "1:591533529053:web:478a18dc157f490850c834",
  measurementId: "G-X3D1F2ZFHQ"
};

const Firebase = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export default Firebase;
