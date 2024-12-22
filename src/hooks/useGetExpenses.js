import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";
import { useGetAccounts } from "./useGetAccountList";
import { useGetAccountData } from "./useGetAccountData";

export const useGetExpenses = () => {
  const [userExpenses, setUserExpenses] = useState([]);
  const [departmentExpenses, setFilteredExpenses] = useState([]);
  const { accountData } = useGetAccountData();
  const { getAccounts } = useGetAccounts();
  
  const expenseCollectionRef = collection(db, "expenses");
  const { userID } = useGetUserInfo();
  const getUserExpenses = () => {
    let unsubscribe;
    try {
      const queryUserExpenses = query(
        expenseCollectionRef,
        where("userID", "==", userID),
        orderBy("createdAt")
      );

      unsubscribe = onSnapshot(queryUserExpenses, (snapshot) => {
        let docs = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          docs.push({ ...data, id });
        });

        setUserExpenses(docs);
      });
    } catch (err) {
      console.error(err);
    }

    return () => unsubscribe();
  };

  const getFilteredExpenses = () => {
    let unsubscribe;
    try {
      const queryAllExpenses = query(
        expenseCollectionRef,
        orderBy("createdAt")
      );

      unsubscribe = onSnapshot(queryAllExpenses, (snapshot) => {
        let docs = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          docs.push({ ...data, id });
        });

        const currentUser = accountData.length ? accountData[0] : null;
        const currentUserDepartment = currentUser ? currentUser.department : null;

        if (currentUserDepartment) {
          const filteredDocs = docs.filter(expense => {
            const userAccount = getAccounts.find(account => account.userName === expense.userName);
            return userAccount && userAccount.department === currentUserDepartment;
          });

          setFilteredExpenses(filteredDocs);
        } else {
          setFilteredExpenses(docs);
        }
      });
    } catch (err) {
      console.error(err);
    }

    return () => unsubscribe();
  };

  useEffect(() => {
    if (userID) {
      getUserExpenses();
    }
  }, [userID]);

  useEffect(() => {
    if (accountData.length && getAccounts.length) {
      getFilteredExpenses();
    }
  }, [accountData, getAccounts]);

  return { userExpenses, departmentExpenses };
};
