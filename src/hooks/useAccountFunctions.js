import { addDoc, collection, doc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAccountFunctions = () => {
  const accountCollectionRef = collection(db, "accounts");
  const { userID } = useGetUserInfo();
  const addAccount = async ({
    userName,
    email,
    phoneNumber,
    department,
  }) => {
    await addDoc(accountCollectionRef, {
      userID,
      userName,
      email,
      phoneNumber,
      department,
      createdAt: serverTimestamp(),
    });
  };
  const deleteAccount = async (accountId) => {
    const accountDocRef = doc(db, "accounts", accountId);
    await deleteDoc(accountDocRef);
  };
  return { addAccount, deleteAccount };
};
