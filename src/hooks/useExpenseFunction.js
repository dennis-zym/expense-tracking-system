import { collection, serverTimestamp, setDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";
import { useGetAccountData } from "./useGetAccountData";

export const useExpenseFunctions = () => {
  const expenseCollectionRef = collection(db, "expenses");
  const { userID, email } = useGetUserInfo();
  const { accountData } = useGetAccountData();

  const currentUser = accountData.find(account => account.email === email);
  const userName = currentUser ? currentUser.userName : '';

  const addExpense = async ({
    expenseTitle,
    category,
    price,
    quantity,
    date,
  }) => {
    const newDocRef = doc(expenseCollectionRef);
    await setDoc(newDocRef, {
      expenseID: newDocRef.id,
      userID,
      userName,
      expenseTitle,
      category,
      price,
      quantity,
      date,
      createdAt: serverTimestamp(),
    });
  };

  const deleteExpense = async (expenseID) => {
    const expenseDocRef = doc(db, "expenses", expenseID);
    await deleteDoc(expenseDocRef);
  };

  const editExpense = async (expenseID, updatedData) => {
    const expenseDocRef = doc(db, "expenses", expenseID);
    await updateDoc(expenseDocRef, {
      ...updatedData,
      updatedAt: serverTimestamp(),
    });
  };

  return { addExpense, deleteExpense, editExpense };
};
