import { useState, useEffect } from 'react';
import { doc, onSnapshot } from '@firebase/firestore';
import { db } from '../firebase';

export default function useDoc(path) {
    const [documents, setDocuments] = useState(null);

    useEffect(() => {
        const docRef = doc(db, path);

        return onSnapshot(
            docRef,
            (snapshot) => {
                const user = {
                    ...snapshot.data(),
                    id: snapshot.id
                }
                setDocuments(user);
            }
        )
    }, [path]);
    
    return documents;
}