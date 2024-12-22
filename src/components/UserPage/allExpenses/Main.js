import React, { useEffect } from 'react'
import styled from 'styled-components'
import RegisterBar from '../myExpense/AddExpenseForm'
import AllExpenseHistory from './AllExpenseList'
import {MainLayout} from '../../../styles/Layouts'
function AllExpense() {
    

    return (
        <Container>
        <InnerContainer>
            <header-style1> Department Expenses History </header-style1>
          </InnerContainer>
          <InnerContainer>
          <AllExpenseHistory />
          </InnerContainer>
        </Container>
        
    );
}
export default AllExpense

const Container = styled.nav `
  width: 150vh;
  align-items: center; 
`;
const InnerContainer = styled.nav `
  align-items: center; 
  display: flex;
  justify-content: center;
  gap: 1.3rem;
  
  header-style1 {
  font-size: 37px;
  font-weight: 605;
  color: #991d70;
  }
  header-style2 {
  font-size: 22px;
  font-weight: 605;
  color: #991d70;
  align-self: flex-end;
  }
`;