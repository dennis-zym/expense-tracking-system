import React, { useEffect } from 'react'
import styled from 'styled-components'
import ExpenseConsole from './AddExpenseForm'
import MyExpenseHistory from './MyExpenseList'
function MyExpense() {
    

    return (
        <>
        <Container>
            <p className='headerStyle2'> My Expense History </p>
            <p className='headerStyle1'> Expense </p>
          </Container>
          <Container>
          <MyExpenseHistory />
          <ExpenseConsole />
          </Container>
        </>
        
    );
}
export default MyExpense
const Container = styled.nav `
  display: flex;
  justify-content: space-between;
  gap: 1.3rem;
`;