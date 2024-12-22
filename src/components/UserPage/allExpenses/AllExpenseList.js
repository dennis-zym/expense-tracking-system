import React from 'react';
import styled from 'styled-components';
import { useGetExpenses } from "../../../hooks/useGetExpenses";
import "../../../pages/auth/styles.css";

function AllExpenseHistory({ }) {
  const { departmentExpenses } = useGetExpenses();

  return (
    <Container className="containerStyle">
      <div>
        {departmentExpenses.map((expense) => {
          const { userName, expenseTitle, category, price, quantity, date } = expense;

          return (
            <ListContainer key={expense.id}>
              <RowContainer>
                <h4>Expense Title: {expenseTitle}</h4>
              </RowContainer>
                <RowContainer>
                  <p className='userWidth'><b>User: </b>{userName}</p>
                  <p className='priceWidth'><b>$: </b>{price}</p>
                  <p className='qtywidth'><b>QTY: </b>{quantity}</p>
                  <p className='dateWidth'><b>Date: </b>{date}</p>
                  <p className='catWidth'><b>CAT: </b>{category}</p>
                </RowContainer>
            </ListContainer>
          );
        })}
      </div>
    </Container>
  );
}

const Container = styled.nav`
  align-items: center; 
  width: 1000px;
  height: 570px;
`;

const ListContainer = styled.nav `
  width: 900px;
  background: white;
  border-radius: 20px;
  margin: 10px;
  padding-left: 30px; 
`;
const RowContainer = styled.nav `
  display: flex;
  flex-direction: row;

  div {
    display: flex;
    align-items: center;
    gap: 20px; 
  }
  h4 {
  margin-top: 8px;
  margin-bottom: 7px;
  gap: 2rem;
  font-size: 15px;
  color: rgba(34, 34, 96, 1);
  }

  p {
  margin-top: 1px;
  margin-bottom: 7px;
  }
  .userWidth {
    width: 200px;
  }
  .priceWidth {
    width: 130px;
  }

  .qtywidth {
    width: 110px;
  }

  .dateWidth {
    width: 170px;
  }

  .catWidth {
    width: 250px;
  }

  .padding {
    color: rgba(34, 34, 96, 0.6);
    margin-top: 7px;
    margin-bottom: 7px;
    font-size: 14px;
    }
`;

export default AllExpenseHistory;
