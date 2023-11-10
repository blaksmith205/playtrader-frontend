// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhrBfirnAh4apUSsT3hjAkyJ5DlDid118",
  authDomain: "playtrader-6ca58.firebaseapp.com",
  projectId: "playtrader-6ca58",
  storageBucket: "playtrader-6ca58.appspot.com",
  messagingSenderId: "690235275386",
  appId: "1:690235275386:web:efd52fa9eda942f93da3c3",
  measurementId: "G-V7MZBTMQZH"
};

const initFirebase = () => {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);
}

export default initFirebase;
