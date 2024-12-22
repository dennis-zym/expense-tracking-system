import { useGetExpenses } from "../../../hooks/useGetExpenses";
import React from 'react';
import styled from 'styled-components';

const ExpensesCard = () => {
  const { departmentExpenses } = useGetExpenses();

  // 
  const expensesByQuarter = {};

  departmentExpenses.forEach((expense) => {
    const price = parseFloat(expense.price);
    const quantity = parseFloat(expense.quantity);

    if (!isNaN(price) && !isNaN(quantity)) {
      const totalExpense = price * quantity;
      const date = new Date(expense.date);
      const year = date.getFullYear();
      const quarter = `Q${Math.floor(date.getMonth() / 3) + 1} ${year}`;

      if (!expensesByQuarter[quarter]) {
        expensesByQuarter[quarter] = { total: 0, count: 0 };
      }

      expensesByQuarter[quarter].total += totalExpense;
      expensesByQuarter[quarter].count += 1;
    } else {
      console.error(`Invalid price or quantity: ${expense.price}, ${expense.quantity}`);
    }
  });

  // Calculate total expenses and quarterly averages
  const totalExpense = Object.values(expensesByQuarter).reduce((acc, quarter) => acc + quarter.total, 0);
  const quarterlyAverage = Object.keys(expensesByQuarter).length > 0 
    ? totalExpense / Object.keys(expensesByQuarter).length 
    : 0;

  // Function to format numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Container>
      <InnerContainer>
        <HeaderContainer>
          <h1>$ {formatNumber(totalExpense.toFixed(2))}</h1>
          <h4>Total Expense</h4>
        </HeaderContainer>
        <HeaderContainer>
          <h1>$ {formatNumber(quarterlyAverage.toFixed(2))}</h1>
          <h4>Quarterly Average Expense</h4>
        </HeaderContainer>
      </InnerContainer>
    </Container>
  );
};

export default ExpensesCard;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 15px;
  

  h4 {
    margin-top: 1px;
    margin-bottom: 1px;
    color: #991d70;
  }
    h1 {
    margin-top: 1px;
    margin-bottom: 1px;
  }
`;

const InnerContainer = styled.div`

  display: flex;
  flex-direction: row;
  text-align: center; /* Center the header */
  gap: 1.5rem; 
`;

const HeaderContainer = styled.div`

  border: 2.5px solid #D0D6D1;
  width: 50vh;  
  padding: 10px; /* Added padding for better spacing */
`;

