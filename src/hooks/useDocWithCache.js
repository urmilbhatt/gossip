import { useState, useEffect } from 'react';
import { doc, getDoc } from '@firebase/firestore';
import { db } from '../firebase';

const cache = {};
const pendingCache = {};

export default function useDocWithCache(path) {
    const [documents, setDocuments] = useState(cache[path]);

    useEffect(() => {
        if (documents) {
            return;
        } 

        let stillMounted  = true;
        const pending = pendingCache[path];
        const promise = pending || (pendingCache[path] = getDoc(doc(db, path)));

        promise.then((docSnap) => {
            if (stillMounted) {
                const user = {
                    ...docSnap.data(),
                    id: docSnap.id
                }
                setDocuments(user);
                cache[path] = user;
            }
        });

        return () => {
            stillMounted = false;
        }
    }, [path]);
    
    return documents;
}