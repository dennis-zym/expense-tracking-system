import { useGetExpenses } from "../../../hooks/useGetExpenses";
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const QoQExpenseGrowthChart = () => {
  const { departmentExpenses } = useGetExpenses();
  const [tableData, setTableData] = useState([]);

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
          expensesByQuarter[quarter] = 0;
        }

        expensesByQuarter[quarter] += totalExpense;
      });

      return expensesByQuarter;
    };

    const calculateQoQGrowth = (processedData) => {
      const quarters = Object.keys(processedData);
      quarters.sort((a, b) => {
        const [qA, yA] = a.split(' ');
        const [qB, yB] = b.split(' ');
        return new Date(`${yA}-${qA[1] * 3}-01`) - new Date(`${yB}-${qB[1] * 3}-01`);
      });

      const tableData = quarters.map((quarter, index) => {
        const totalExpense = processedData[quarter];
        const previousQuarterExpense = index > 0 ? processedData[quarters[index - 1]] : null;
        const QoQGrowth = previousQuarterExpense ? ((totalExpense - previousQuarterExpense) / previousQuarterExpense) * 100 : null;
        return {
          quarter,
          totalExpense,
          previousQuarterExpense,
          QoQGrowth,
        };
      });

      return tableData;
    };

    if (departmentExpenses && departmentExpenses.length > 0) {
      const processedData = processData(departmentExpenses);
      const tableData = calculateQoQGrowth(processedData);
      setTableData(tableData);
    } else {
      setTableData([]);
    }
  }, [departmentExpenses]);

  return (
    <A>
      <TableContainer className="chartTitle">
        <h4>Quarter over Quarter Expense Growth Rate</h4>
        <div className="tableOverFlow">
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Quarter</th>
              <th>Total Expenses</th>
              <th>PQ Expenses</th>
              <th>QoQ Expense Growth %</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data, index) => (
              <tr key={index}>
                <td>{data.quarter.split(' ')[1]}</td>
                <td>{data.quarter.split(' ')[0]}</td>
                <td>${data.totalExpense.toFixed(2)}</td>
                <td>{data.previousQuarterExpense ? `$${data.previousQuarterExpense.toFixed(2)}` : 'N/A'}</td>
                <td>{data.QoQGrowth !== null ? `${data.QoQGrowth.toFixed(2)}%` : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        
      </TableContainer>
    </A>
    
  );
};

export default QoQExpenseGrowthChart;
const A = styled.nav`
  h4 {
    margin-top: 1px;
    margin-bottom: 1px;
    color: #991d70;
  }
  
`;
const TableContainer = styled.div`
  height: 220px;
  .tableOverFlow {
    overflow: auto;
    border: 1px solid #ddd;
  }
  table {
    border-collapse: collapse;
  }
  th, td {
    font-size: 12px;
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  th {
    background-color: #f2f2f2;
  }
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
`;
