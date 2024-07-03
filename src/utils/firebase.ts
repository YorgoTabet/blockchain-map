import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCMh-GJtXlRrVyppSf3rkU9ujAAnYrRY-s",
    authDomain: "blockchain-map-13142.firebaseapp.com",
    projectId: "blockchain-map-13142",
    storageBucket: "blockchain-map-13142.appspot.com",
    messagingSenderId: "695352938628",
    appId: "1:695352938628:web:faee9ccbfaa78d594072d1"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const fireStoreDb = getFirestore(firebaseApp);
