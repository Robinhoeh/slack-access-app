// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtiE8ADTJyWhbywsnEuFXwTEbotRdJ7UY",
  authDomain: "slack-access-app.firebaseapp.com",
  projectId: "slack-access-app",
  storageBucket: "slack-access-app.firebasestorage.app",
  messagingSenderId: "645239423707",
  appId: "1:645239423707:web:026d93d938d7211d2742fe",
  measurementId: "G-L3VJBLT4EC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);