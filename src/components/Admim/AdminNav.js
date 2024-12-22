import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase-config';
import { useNavigate } from 'react-router-dom';

import {NavStyled} from '../../styles/Layouts'

function AdminNav() {
  const navigate = useNavigate();

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <NavStyled className="containerStyle">
      <div className="user-con">
        <div className="">
          <h1>Admin</h1>
          <h4>Adminstration</h4>
        </div>
      </div>
      
      <h3 className="bottom-nav" onClick={signUserOut}>
        Sign Out
      </h3>
    </NavStyled>
  );
}
export default AdminNav;
