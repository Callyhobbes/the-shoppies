// firebase.js
import firebase from 'firebase/app';
import 'firebase/database';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBDxJ2gCQOSjKVEgWaZhyGZY0s1jzBY2Oc",
  authDomain: "the-shoppies-1edfe.firebaseapp.com",
  projectId: "the-shoppies-1edfe",
  storageBucket: "the-shoppies-1edfe.appspot.com",
  messagingSenderId: "828709457093",
  appId: "1:828709457093:web:68712c5df2d11e72b374ac"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
