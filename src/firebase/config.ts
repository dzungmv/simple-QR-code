// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyAixg0GB17WyJhX6M0uutWdLg2sokVyATk',
    authDomain: 'nextjs-b073c.firebaseapp.com',
    projectId: 'nextjs-b073c',
    storageBucket: 'nextjs-b073c.appspot.com',
    messagingSenderId: '422303263329',
    appId: '1:422303263329:web:e548fb46846a20fa43d820',
    measurementId: 'G-R0PEY1DNNP',
    databaseURL:
        'https://nextjs-b073c-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const database = getDatabase(app);

export default app;
export { auth, database };
