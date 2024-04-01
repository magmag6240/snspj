import firebase from 'firebase/app';
import 'firebase/auth';

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyC4nh2OiBi7m2NJEwy10a25Y44DUYdg4Wg",
        authDomain: "snsnuxtpj.firebaseapp.com",
        databaseURL: "https://snsnuxtpj-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "snsnuxtpj",
        storageBucket: "snsnuxtpj.appspot.com",
        messagingSenderId: "10992917222",
        appId: "1:10992917222:web:fe1ac61722d7000185b927",
        measurementId: "G-G6R4WWJBPD"
    });
}

export default firebase;
export const auth = firebase.auth();