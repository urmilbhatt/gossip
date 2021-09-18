import { useState, useEffect } from "react";
import { onAuthStateChanged  } from "firebase/auth";
import { auth, db, setupPresence } from "../firebase";
import { collection, doc, setDoc } from "@firebase/firestore";

export default function useAuth() {
    const [user, setUser] = useState(null);

    useEffect(() => {
      return onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          const user = {
              displayName: firebaseUser.displayName,
              photoUrl: firebaseUser.photoURL,
              uid: firebaseUser.uid
          }

          setUser(user);

          const usersRef = doc(collection(db, 'users'), user.uid);
          await setDoc(usersRef, user, { merge: true });
          
          setupPresence(user);
        } else {
          setUser(null);
        }
      })
    }, []);
    
    return user;
}