
// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import {
  getFirestore,
  serverTimestamp as firestoreServerTimestamp,
  doc,
  updateDoc,
} from '@firebase/firestore';
import {
  getDatabase, ref, set,
  onValue, onDisconnect, serverTimestamp
} from '@firebase/database';
import { getAuth } from '@firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDl5x_gd46kdCDEMxJpdOR9vaXvwNffF2k",
  authDomain: "chit-chat-app-13f76.firebaseapp.com",
  databaseURL: "https://chit-chat-app-13f76-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chit-chat-app-13f76",
  storageBucket: "chit-chat-app-13f76.appspot.com",
  messagingSenderId: "334086549874",
  appId: "1:334086549874:web:11ab0b0de1263fa2d5edeb"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const rtdb = getDatabase();

export function setupPresence(user) {
  const isOfflineForRTDB = {
    state: 'offline',
    lastChanged: serverTimestamp()
  }

  const isOnlineForRTDB = {
    state: 'online',
    lastChanged: serverTimestamp()
  }
  
  const isOfflineForFirestore = {
    state: 'offline',
    lastChanged: firestoreServerTimestamp()
  }

  const isOnlineForFirestore = {
    state: 'online',
    lastChanged: firestoreServerTimestamp()
  }

  const isConnectedRef = ref(rtdb, '.info/connected');
  
  const statusRef = ref(rtdb, `/status/${user.uid}`);

  const userDocRef = doc(db, `users/${user.uid}`);

  onValue(isConnectedRef, async (snapshot) => {
    if (snapshot.val() === true) {
      onDisconnect(statusRef).set(isOfflineForRTDB);
      set(statusRef, isOnlineForRTDB);
      await updateDoc(userDocRef, {
        status: isOnlineForFirestore,
      });
    } else {
      await updateDoc(userDocRef, {
        status: isOfflineForFirestore
      });
    }
  })
} 

export { db, auth };