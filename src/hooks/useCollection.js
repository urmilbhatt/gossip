import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, where } from '@firebase/firestore'; 
import { db } from '../firebase';

export default function useCollection(path, orderByQuery, whereQueryArr = []) {
    const [documents, setDocuments] = useState([]);
    
    const [queryField, queryOperator, queryValue] = whereQueryArr;

    useEffect(() => {
      const messagesRef = collection(db, path);

      let queryRef = messagesRef;
      if (orderByQuery) {
        queryRef = query(messagesRef, orderBy(orderByQuery))
      }

      if (queryField) {
        queryRef = query(messagesRef, where(queryField, queryOperator, queryValue))
      }

      if (orderByQuery && queryField) {
        queryRef = query(
          messagesRef,
          orderBy(orderByQuery),
          where(queryField, queryOperator, queryValue)
        );
      }

      return onSnapshot(
        queryRef,
        (snapshot) => {
          const docs = [];
          snapshot.forEach(doc => {
            docs.push({
              ...doc.data(),
              id: doc.id,
            });
          });
          setDocuments(docs);
      }, (error) => {
        console.error(error);
      });
    }, [path, orderByQuery, queryField, queryOperator, queryValue]);
    
    return documents;
  }
