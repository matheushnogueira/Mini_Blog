import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGQFwepOlmSl2bS5ztRH-bAoCxQiJFZ54",
  authDomain: "miniblog-b7782.firebaseapp.com",
  projectId: "miniblog-b7782",
  storageBucket: "miniblog-b7782.appspot.com",
  messagingSenderId: "564128844288",
  appId: "1:564128844288:web:7d1d1e930a6be15a8b66e5"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db}