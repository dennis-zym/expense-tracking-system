import React, { useState } from 'react';
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
import { useExpenseFunctions } from "../../../hooks/useExpenseFunction";
import { Button } from "baseui/button";
import { InnerContainer2, Wrapper } from "../../../styles/Layouts";

import { useGetAccountData } from "../../../hooks/useGetAccountData";

const ExpenseConsole = () => {

  const { accountData } = useGetAccountData();
  const { addExpense } = useExpenseFunctions();
  
  const [expenseTitle, setExpenseTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState('');

  const [validationErrors, setValidationErrors] = useState({
    expenseTitle: false,
    category: false,
    price: false,
    quantity: false,
    date: false,
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  //Set predefined input value for categories based on the department
  const getCategories = () => {
    if (accountData[0]?.department === "Procrument") {
      return [
        { value: 'Raw Material', label: 'Raw Material' },
        { value: 'Supplier Cost', label: 'Supplier Cost' },
        { value: 'Packaging Material', label: 'Packaging Material' },
      ];
    } else if (accountData[0]?.department === "Logistics and Distribution") {
      return [
        { value: 'Transportation Cost', label: 'Transportation Cost' },
        { value: 'Shipping Charges', label: 'Shipping Charges' },
        { value: 'Foreign Warehousing Fee', label: 'Foreign Warehousing Fee' },
      ];
    } else if (accountData[0]?.department === "General and Adminstrative") {
      return [
        { value: 'Salary', label: 'Salary' },
        { value: 'Utilities', label: 'Utilities' },
        { value: 'Insurance', label: 'Insurance' },
      ];
    }
    return []; // Default empty if no department is selected
  };

  const categories = getCategories();

  const onSubmit = (e) => {
    e.preventDefault();

    const newValidationErrors = {
      expenseTitle: !expenseTitle,
      category: !category,
      price: !price,
      quantity: !quantity,
      date: !date,
    };

    setValidationErrors(newValidationErrors);

    if (Object.values(newValidationErrors).some((error) => error)) {
      setErrorMessage('Please fill in all the fields');
      setSuccessMessage('');
      return;
    }

    try {
      addExpense({ 
        expenseTitle, 
        category, 
        price: Number(price), 
        quantity: Number(quantity), 
        date 
      });
      setSuccessMessage('New Expense added successfully!');
      setErrorMessage('');
      // Clear the form after submission
      setExpenseTitle('');
      setCategory('');
      setPrice('');
      setQuantity('');
      setDate('');
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to add expense.');
      setSuccessMessage('');
    }
  };

  return (
    <InnerContainer2 className="containerStyle">
    <form  onSubmit={onSubmit}>
      <Wrapper>
        <TextField
          style={{ width: '100%' }}
          type="text"
          label="Expense Title"
          value={expenseTitle}
          onChange={(e) => setExpenseTitle(e.target.value)}
          sx={{
            backgroundColor: 'white',
            borderColor: validationErrors.expenseTitle ? 'red' : '',
          }}
          error={validationErrors.expenseTitle}
        />
      </Wrapper> 
      <Wrapper>
        <TextField
          style={{ width: '100%' }}
          select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{
            backgroundColor: 'white',
            borderColor: validationErrors.category ? 'red' : '',
          }}
          error={validationErrors.category}
        >
          {categories.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Wrapper>
      <Wrapper>
        <TextField
          style={{ width: '100%' }}
          type="number"
          label="Price ($)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          sx={{
            backgroundColor: 'white',
            borderColor: validationErrors.price ? 'red' : '',
          }}
          error={validationErrors.price}
        />
      </Wrapper>
      <Wrapper>
        <TextField
          style={{ width: '100%' }}
          type="number"
          label="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          sx={{
            backgroundColor: 'white',
            borderColor: validationErrors.quantity ? 'red' : '',
          }}
          error={validationErrors.quantity}
        />
      </Wrapper> 
      <Wrapper>
        <TextField
          style={{ width: "100%" }}
          InputLabelProps={{ shrink: true }}
          type="date"
          label="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={{
            backgroundColor: 'white',
            borderColor: validationErrors.date ? 'red' : '',
          }}
          error={validationErrors.date}
        />
      </Wrapper>  
      <Wrapper>
      {errorMessage && <p className='errorMessage'>{errorMessage}</p>}
      {successMessage && <p className='successMessage'>{successMessage}</p>}
        <Button
          style={{ width: "100%" }}
          size="large"
          type="submit"
          overrides={{
            BaseButton: {
              style: ({ }) => ({
                backgroundColor: "#991d70",
                ':hover': {
                  backgroundColor: "#5e0f44",
                },
              }),
            },
          }}
        >
          Add Expense
        </Button>
      </Wrapper>  
    </form>
  </InnerContainer2>
  );
};

export default ExpenseConsole;
