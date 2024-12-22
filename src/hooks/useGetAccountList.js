import { useEffect, useState } from "react";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase-config";

export const useGetAccounts = () => {
  const [getAccounts, setAccounts] = useState([]);
  useEffect(() => {
    const accountCollectionRef = collection(db, "accounts");
    const getAccounts = async () => {
      try {
        const queryAccounts = query(accountCollectionRef);
        const unsubscribe = onSnapshot(queryAccounts, (snapshot) => {
          const accountsList = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
          }));
          setAccounts(accountsList);
        });
        return () => unsubscribe();
      } catch (err) {
        console.error(err);
      }
    };
    getAccounts();
  }, []);
  return { getAccounts };
};
