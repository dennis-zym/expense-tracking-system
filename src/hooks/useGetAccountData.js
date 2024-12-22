import { useEffect, useState } from "react";
import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetAccountData = () => {
  const [accountData, setAccounts] = useState([]);
  const accountCollectionRef = collection(db, "accounts");
  const { email } = useGetUserInfo();

  const getAccounts = async () => {
    let unsubscribe;
    try {
      const queryAccounts = query(
        accountCollectionRef,
        where("email", "==", email),
        orderBy("createdAt")
      );
      unsubscribe = onSnapshot(queryAccounts, (snapshot) => {
        let docs = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          docs.push({ ...data, id });
        });
        setAccounts(docs);
      });
    } catch (err) {
      console.error(err);
    }
    return () => unsubscribe();
  };

  useEffect(() => {
    if (email) {
      getAccounts();
    }
  }, [email]);

  
  return { accountData };
};
