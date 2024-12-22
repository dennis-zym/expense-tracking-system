import { useState, useMemo } from "react";
import {MainLayout, InnerLayout} from '../../styles/Layouts'
import UserNav from '../../components/UserPage/UserNav'
import "./styles.css";
import { auth } from "../../config/firebase-config";

import MyExpense from '../../components/UserPage/myExpense/Main';
import AllExpense from '../../components/UserPage/allExpenses/Main';
import Dashboard from '../../components/UserPage/dashboard/Main';

export const UserPage = () => {
  const [active, setActive] = useState(1)

  // const global = useGlobalContext()
  // console.log(global);

  const displayData = () => {
    switch(active){
      case 1:
        return <MyExpense />
      case 2:
        return <AllExpense />
      case 3:
        return <Dashboard />
    }
  }
  return (
    <>
      <MainLayout>
      <UserNav active={active} setActive={setActive} />
        <main>
          {displayData()}
        </main>
      </MainLayout>
    </>
  );
};
