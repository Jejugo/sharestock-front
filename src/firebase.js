// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApV5D3FLttjYjlA7PExm-E7dTrf1BimBM",
  authDomain: "sharestock-app.firebaseapp.com",
  projectId: "sharestock-app",
  storageBucket: "sharestock-app.appspot.com",
  messagingSenderId: "571999392036",
  appId: "1:571999392036:web:703f66a957acfb1869a3b1",
  measurementId: "G-F13HGEFG33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app)