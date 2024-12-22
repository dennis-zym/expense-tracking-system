import { useGetExpenses } from "../../../hooks/useGetExpenses";
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js'; // Import registerables
import styled from 'styled-components';

// Register all necessary components
Chart.register(...registerables);

const TotalExpensesChart = () => {
  const { departmentExpenses } = useGetExpenses();
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {

    const processData = (departmentExpenses) => {
      const expensesByQuarterAndCategory = {};

      departmentExpenses.forEach((expense) => {
        const date = new Date(expense.date);
        const year = date.getFullYear();
        const quarter = `Q${Math.floor(date.getMonth() / 3) + 1} ${year}`;
        const category = expense.category;
        const price = parseFloat(expense.price);
        const quantity = parseFloat(expense.quantity);

        if (isNaN(price) || isNaN(quantity)) {
          console.error(`Invalid price or quantity: ${expense.price}, ${expense.quantity}`); // Debugging log
          return;
        }

        const totalExpense = price * quantity;

        if (!expensesByQuarterAndCategory[quarter]) {
          expensesByQuarterAndCategory[quarter] = {};
        }

        if (!expensesByQuarterAndCategory[quarter][category]) {
          expensesByQuarterAndCategory[quarter][category] = 0;
        }

        expensesByQuarterAndCategory[quarter][category] += totalExpense;
      });

      return expensesByQuarterAndCategory;
    };

    const formatChartData = (processedData) => {
      const quarters = Object.keys(processedData);
      quarters.sort((a, b) => {
        const [qA, yA] = a.split(' ');
        const [qB, yB] = b.split(' ');
        return new Date(`${yA}-${qA[1] * 3}-01`) - new Date(`${yB}-${qB[1] * 3}-01`);
      });

      const categories = Array.from(new Set(quarters.flatMap(quarter => Object.keys(processedData[quarter]))));

      const datasets = categories.map(category => ({
        label: category,
        data: quarters.map(quarter => processedData[quarter][category] || 0),
        backgroundColor: getRandomColor(),
      }));

      return {
        labels: quarters,
        datasets: datasets,
      };
    };

    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
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
        <h4>Total Expenses by Quarter and Category</h4>
        <Bar
          data={chartData}
          options={{
            maintainAspectRatio: false,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Quarters',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Total Expense in $',
                },
              },
            },
          }}
        />
      </ChartContainer>
    </A>
  );
};

export default TotalExpensesChart;

const ChartContainer = styled.div`
  height: 220px;
  width: 145vh;
`;

const A = styled.nav`
  h4 {
    margin-top: 1px;
    margin-bottom: 1px;
    color: #991d70;
  }
`;
