import React from 'react';
import styled from 'styled-components';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase-config';
import { useNavigate } from 'react-router-dom';
import { useGetAccountData } from "../../hooks/useGetAccountData";
import { menuItems } from '../../utils/menuItems';

import {NavStyled} from '../../styles/Layouts'

function UserNav({ active, setActive }) {
  const navigate = useNavigate();
  const { accountData } = useGetAccountData();

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
      {accountData.map((account) => {
          const { id, userName, department } = account;
          return (
            <div key={id}>
              <h1>{userName}</h1>
              <h4>{department}</h4>
            </div>
          );
        })}
      <MenuItem>
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`menu-item ${active === item.id ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.title}</span>
          </div>
        ))}
      </MenuItem>
      <h3 className="bottom-nav" onClick={signUserOut}>
        Sign Out
      </h3>
    </NavStyled>
  );
}
export default UserNav;

const MenuItem = styled.nav`
  display: flex;
  flex-direction: column;
    .menu-item {
      display: flex;
      align-items: center;
      padding-top: 1rem;
      border-radius: 8px;
      cursor: pointer;
      color: rgba(0, 0, 96, 1);
      transition: all 0.3s ease;
      font-size: 18px;

      span {
        color: rgba(34, 34, 96, 0.6);
      }

      &:hover {
      font-weight: 600;
        span {
          color: rgba(0, 34, 96, 0.3);
        }
      }

      &.active {
      font-weight: 700;
        span {
          color: rgba(0, 34, 96, 1);
        }
      }
    }
  }


`;