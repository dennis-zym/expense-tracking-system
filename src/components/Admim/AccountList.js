import React from 'react';
import styled from 'styled-components';
import { useGetAccounts } from "../../hooks/useGetAccountList";
import { useAccountFunctions } from "../../hooks/useAccountFunctions"; // Import the hook
import "../../pages/auth/styles.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


function AccountList({ }) {
  const { getAccounts } = useGetAccounts();
  const { deleteAccount } = useAccountFunctions(); 

  const handleDeleteAccount = async (accountId) => {
    try {
      await deleteAccount(accountId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container className="containerStyle">
      <div>
        {getAccounts.map((account) => {
          const { id, userName, email, phoneNumber, department } = account;
          return (
            <ListContainer key={id}>
              <RowContainer>
                <ColumnContainer>
                  <h4 > {userName}</h4>
                  <p><b>Email:</b> {email}</p>
                </ColumnContainer>
                <ColumnContainer>
                  <h4>{department}</h4>
                  <p><b>Phone Number:</b> {phoneNumber}</p>
                </ColumnContainer>
                
              </RowContainer>
              <RowContainer>
              <DeleteIcon icon={faTrash} onClick={() => handleDeleteAccount(id)}/>
              </RowContainer>
            </ListContainer>
          );
        })}
      </div>
    </Container>
  );
}

export default AccountList;

const Container = styled.nav`
  width: 800px;
  height: 570px;
`;

const DeleteIcon = styled(FontAwesomeIcon)`
font-size: 18px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.3);
  }
`;

const ListContainer = styled.nav `
  align-items: center;
  width: 730px;
  height: 60px;
  background: white;
  display: flex;
  justify-content: space-between;
  border-radius: 20px;
  margin: 10px;
  padding-left: 30px 
`;

const RowContainer = styled.nav `
  padding-right: 30px;
  display: flex;
  flex-direction: row;

`;
const ColumnContainer = styled.nav `
  width: 270px;

  h4 {
  margin-top: 1px;
  margin-bottom: 1px;
  font-size: 15px;
  color: rgba(34, 34, 96, 1);
  }

  p {
      color: rgba(34, 34, 96, 0.6);
      margin-top: 1px;
      margin-bottom: 1px;
      font-size: 14px;
    }
`;

