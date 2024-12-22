import React from 'react';
import styled from 'styled-components';
import TotalExpensesChart from './TotalExpanseChart';
import AverageExpensesChart from './AverageExpenseChart';
import QoQExpenseGrowthChart from './ExpenseGrowthRateChart';
import ExpensesCard from './ExpenseCards';


function Dashboard() {
    return (
        <Container>
          <InnerContainer>
            <CardContainer>
              <ExpensesCard/>
            </CardContainer>
            <HeaderContainer>
              <Header>Expense <br /> Dashboard</Header>
            </HeaderContainer>
          </InnerContainer>
          <InnerContainer>
            <TotalExpensesChart/>
          </InnerContainer>
          <ChartsContainer>
            <AverageExpensesChart/>
            <QoQExpenseGrowthChart/>
          </ChartsContainer>
        </Container>
    );
}

export default Dashboard;

const Container = styled.div`
  height: 560px;
  width: 1060px;
  display: flex;
  flex-direction: column;
  padding-left: 15px;
`;

const InnerContainer =styled.div`
margin-bottom: 30px;
display: flex;
flex-direction: row;
justify-content: center; /* Center content */
gap: 1.5rem; 
`;

const HeaderContainer =styled.div`
width: 50vh;  
`;

const CardContainer =styled.div`

width: 100vh;  
`;

const Header = styled.h1`
    margin-top: 1px;
    margin-bottom: 1px;
  font-size: 33px;
  font-weight: 605;
  color: #991d70;
  text-align: end; /* Center the header */
`;

const ChartsContainer = styled.div`

  display: flex;
  gap: 1.5rem; 
  justify-content: center; /* Center content */
`;

