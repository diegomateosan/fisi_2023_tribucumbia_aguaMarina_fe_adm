// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDBuTSFbK0sHCybcrYmTRK3RJxXQxP1wk",
  authDomain: "uploading-image-file.firebaseapp.com",
  projectId: "uploading-image-file",
  storageBucket: "uploading-image-file.appspot.com",
  messagingSenderId: "862168547575",
  appId: "1:862168547575:web:b4b01b5989eff7d4c893f2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
