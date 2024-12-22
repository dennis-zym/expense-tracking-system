import { useGetExpenses } from "../../../hooks/useGetExpenses";
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import styled from 'styled-components';

// Register all necessary components
Chart.register(...registerables);

const AverageExpensesChart = () => {
  const { departmentExpenses } = useGetExpenses();
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    console.log("Expenses: ", departmentExpenses); // Debugging log

    const processData = (departmentExpenses) => {
      const expensesByQuarter = {};

      departmentExpenses.forEach((expense) => {
        const date = new Date(expense.date);
        const year = date.getFullYear();
        const quarter = `Q${Math.floor(date.getMonth() / 3) + 1} ${year}`;
        const price = parseFloat(expense.price);
        const quantity = parseFloat(expense.quantity);

        if (isNaN(price) || isNaN(quantity)) {
          console.error(`Invalid price or quantity: ${expense.price}, ${expense.quantity}`); // Debugging log
          return;
        }

        const totalExpense = price * quantity;

        if (!expensesByQuarter[quarter]) {
          expensesByQuarter[quarter] = { total: 0, count: 0 };
        }

        expensesByQuarter[quarter].total += totalExpense;
        expensesByQuarter[quarter].count += 1;
      });

      return expensesByQuarter;
    };

    const formatChartData = (processedData) => {
      const quarters = Object.keys(processedData);
      quarters.sort((a, b) => {
        const [qA, yA] = a.split(' ');
        const [qB, yB] = b.split(' ');
        return new Date(`${yA}-${qA[1] * 3}-01`) - new Date(`${yB}-${qB[1] * 3}-01`);
      });

      const data = quarters.map(quarter => {
        const quarterData = processedData[quarter];
        return quarterData.total / quarterData.count;
      });

      return {
        labels: quarters,
        datasets: [
          {
            label: 'Average Expense',
            data: data,
          }
        ],
      };
    };

    if (departmentExpenses && departmentExpenses.length > 0) {
      const processedData = processData(departmentExpenses);
      const formattedData = formatChartData(processedData);
      setChartData(formattedData);
    } else {
      setChartData({ labels: [], datasets: [] });
    }
  }, [departmentExpenses]);

  return (
    <A>
      <ChartContainer className="chartTitle">
        <h4>Average Expenses by Quarter and Year</h4>
        <Line
          data={chartData}
          options={{
            maintainAspectRatio: false,
            scales: {
             
              y: {
                title: {
                  display: true,
                  text: 'Average Expense in $',
                },
              },
            },
          }}
        />
      </ChartContainer>
    </A>
  );
};

export default AverageExpensesChart;

const ChartContainer = styled.div`
margin-top: 12px;
  height: 220px;
  width: 70vh;
`;

const A = styled.nav`
  h4 {
    margin-top: 1px;
    margin-bottom: 1px;
    color: #991d70;
  }
`;
