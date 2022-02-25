import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDdP7kBJnzGGbDYZiR1oT1tyn8Hpqya1SE',
  authDomain: 'findapp-7c0c5.firebaseapp.com',
  projectId: 'findapp-7c0c5',
  storageBucket: 'findapp-7c0c5.appspot.com',
  messagingSenderId: '888311010954',
  appId: '1:888311010954:web:560b36079b674acc2a7f73',
  measurementId: 'G-HZ3QVLSHW5',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const auth = getAuth();
export const db = getFirestore(app);
