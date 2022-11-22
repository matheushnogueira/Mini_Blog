import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDQvnvxH4Y1ecob-U_HvQ7c1p9duG2zlP0",
  authDomain: "miniblog-d90ff.firebaseapp.com",
  projectId: "miniblog-d90ff",
  storageBucket: "miniblog-d90ff.appspot.com",
  messagingSenderId: "436839273423",
  appId: "1:436839273423:web:38367d09a79da903be38ba"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db}