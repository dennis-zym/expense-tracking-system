import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import { useGetExpenses } from "../../../hooks/useGetExpenses";
import { useExpenseFunctions } from "../../../hooks/useExpenseFunction"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { InnerContainer2, Wrapper } from "../../../styles/Layouts";
import { Button } from "baseui/button";
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import { useGetAccountData } from "../../../hooks/useGetAccountData";

function MyExpenseHistory() {

  const { accountData } = useGetAccountData();

  const { deleteExpense, editExpense } = useExpenseFunctions();
  const { userExpenses } = useGetExpenses();
  const [currentExpense, setCurrentExpense] = useState(null);
  const [formData, setFormData] = useState({
    expenseTitle: '',
    category: '',
    price: '',
    quantity: '',
    date: '',
  });

  // State to handle success message
  const [editSuccess, setEditSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({
    expenseTitle: false,
    category: false,
    price: false,
    quantity: false,
    date: false,
  });

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Reset validation error for this field
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  const handleEditExpense = async (e) => {
    e.preventDefault();
  
    // Validation: Check if all fields are filled
    const newValidationErrors = {
      expenseTitle: !formData.expenseTitle,
      category: !formData.category,
      price: !formData.price,
      quantity: !formData.quantity,
      date: !formData.date,
    };

    setValidationErrors(newValidationErrors);

    if (Object.values(newValidationErrors).some((error) => error)) {
      setEditSuccess(false);
      setErrorMessage('Please fill in all the fields'); 
      return;
    }
  
    try {
      await editExpense(currentExpense.expenseID, formData);
      setEditSuccess(true);
      setErrorMessage('');
    } catch (err) {
      console.error(err);
      setEditSuccess(false);
      setErrorMessage('Failed to edit expense.');
    }
  };
  
  const handleDeleteExpense = async (expenseID) => {
    try {
      await deleteExpense(expenseID);
    } catch (err) {
      console.error(err);
    }
  };

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setEditSuccess(false); 
  };

  const openEditModal = (expense) => {
    setCurrentExpense(expense);
    setFormData({
      expenseTitle: expense.expenseTitle,
      category: expense.category,
      price: expense.price,
      quantity: expense.quantity,
      date: expense.date,
    });
    setOpen(true);
    setEditSuccess(false); 
  };

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
    return []; 
  };

  const categories = getCategories();

  return (
    <Container className="containerStyle">
      <div>
        {userExpenses.map((expense) => {
          const { expenseID, expenseTitle, category, price, quantity, date } = expense;
          return (
            <ListContainer key={expenseID}>
              <InnerContainer>
                <RowContainer>
                  <h4>Expense Title: {expenseTitle}</h4>
                </RowContainer>
                <RowContainer>
                <p className='priceWidth'><b>$:</b> {price}</p>
                <p className='qtywidth'><b>QTY:</b> {quantity}</p>
                <p className='dateWidth'><b>Date:</b> {date}</p>
                <p className='catWidth'><b>CAT:</b> {category}</p>
                </RowContainer>
              </InnerContainer>
              <InnerContainer>
                <RowContainer>
                  <div>
                    <DeleteIcon icon={faPenToSquare} onClick={() => openEditModal(expense)} />
                    <DeleteIcon icon={faTrash} onClick={() => handleDeleteExpense(expenseID)} />
                  </div>
                </RowContainer>
              </InnerContainer>
            </ListContainer>
          );
        })}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      > 
      <ModelStyle>
        <InnerContainer2>
        <form onSubmit={handleEditExpense}>
          <p className='headerStyle1'>Edit Expense</p>

          <Wrapper>
          <TextField
           style={{ width: "100%" }}
              type="text"
              label="Expense Title"
              name="expenseTitle"
              value={formData.expenseTitle}
              onChange={handleEditFormChange}
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
              id=""
              select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleEditFormChange}
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
           style={{ width: "100%" }}
              type="number"
              name="price"
              label="Price"
              value={formData.price}
              onChange={handleEditFormChange}
              sx={{
                backgroundColor: 'white',
                borderColor: validationErrors.price ? 'red' : '',
              }}
              error={validationErrors.price}
            />
          </Wrapper>  
          <Wrapper>
          <TextField
           style={{ width: "100%" }}
              type="number"
              label="Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleEditFormChange}
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
              name="date"
              value={formData.date}
              onChange={handleEditFormChange}
              sx={{
                backgroundColor: 'white',
                borderColor: validationErrors.date ? 'red' : '',
              }}
              error={validationErrors.date}
            />
          </Wrapper>
          
          <Wrapper>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            {editSuccess && <SuccessMessage>Edit is successful!</SuccessMessage>}
          </Wrapper>
          <Wrapper>
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
            Edit Expense
            </Button>
          </Wrapper>  
          <Wrapper>
          <p onClick={handleClose}>Close</p>
          </Wrapper>
        </form>
        </InnerContainer2>
      </ModelStyle>
      </Modal>
    </Container>
  );
}

export default MyExpenseHistory;

const DeleteIcon = styled(FontAwesomeIcon)`
font-size: 20px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.3);
  }
`;

const ModelStyle = styled.nav`
font-family: "Poppins", sans-serif;
font-weight: 600;
 position: absolute;
  top: 50%;
  left: 50%;
  align-items: center;
  transform: translate(-50%, -50%);
  background: white;
  border: 2px solid #000;
  box-shadow: 24px;
  padding: 16px;
  display: flex;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  flex-direction: column;
  gap: 2rem;
`

const ListContainer = styled.nav `
  width: 750px;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  margin: 10px;
  padding-left: 30px 
`;

const InnerContainer = styled.nav `
  padding-right: 20px;
  display: flex;
  flex-direction: column;
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
  margin-top: 1px;
  margin-bottom: 1px;
  gap: 2rem;
  font-size: 15px;
  color: rgba(34, 34, 96, 1);
  }

  p {
  margin-top: 1px;
  margin-bottom: 3px;
  }

  .priceWidth {
    width: 120px;
  }

  .qtywidth {
    width: 90px;
  }

  .dateWidth {
    width: 170px;
  }

  .catWidth {
    width: 250px;
  }

`;

const Container = styled.nav`
  width: 800px;
  height: 575px;
`;

const SuccessMessage = styled.p`
  color: green;
  margin-bottom: 10px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 10px;
`;

