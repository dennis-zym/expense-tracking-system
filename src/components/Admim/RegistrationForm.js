import React, { useState } from 'react';
import { auth, db } from '../../config/firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
import { InnerContainer2, Wrapper } from "../../styles/Layouts";
import { useAccountFunctions } from "../../hooks/useAccountFunctions";
import { Button } from "baseui/button";

const RegistrationForm = () => {
  const { addAccount } = useAccountFunctions();
  const [email, setEmail] = useState('');
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [department, setDepartment] = useState('');

  const [validationErrors, setValidationErrors] = useState({
    userName: false,
    email: false,
    password: false,
    department: false,
    adminEmailError: false, // Added to track 'admin@gmail.com' error
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const departments = [
    { value: 'Procrument', label: 'Procrument' },
    { value: 'Logistics and Distribution', label: 'Logistics and Distribution' },
    { value: 'General and Adminstrative', label: 'General and Adminstrative' },
  ];

  const checkEmailExists = async (email) => {
    const accountCollectionRef = collection(db, "accounts");
    const emailQuery = query(accountCollectionRef, where("email", "==", email));
    const querySnapshot = await getDocs(emailQuery);
    return !querySnapshot.empty;
  };

  const createAccount = async (e) => {
    e.preventDefault();

    const newValidationErrors = {
      userName: !userName,
      email: !email,
      password: !password || password.length < 9,
      department: !department,
      adminEmailError: email === 'admin@gmail.com', // Check if email is 'admin@gmail.com'
    };

    setValidationErrors(newValidationErrors);

    if (Object.values(newValidationErrors).some((error) => error)) {
      if (newValidationErrors.adminEmailError) {
        setErrorMessage('Invalid email, please choose a different one.');
      } else if (password.length < 9) {
        setErrorMessage('Password must be at least 9 characters.');
      } else {
        setErrorMessage('Please fill in all the required fields.');
      }
      setSuccessMessage('');
      return;
    }

    // Check if email already exists
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      setErrorMessage('This email is already registered.');
      setSuccessMessage('');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User registered successfully:', user);
      setSuccessMessage('User registered successfully!');
      setErrorMessage('');

      // Add account to Firestore
      addAccount({
        userName,
        email,
        password,
        phoneNumber: phoneNumber ? Number(phoneNumber) : null,
        department,
      });

      // Clear the form after submission
      setUsername('');
      setEmail('');
      setPassword('');
      setPhoneNumber('');
      setDepartment('');
    } catch (err) {
      console.error('Error registering user:', err);
      setErrorMessage('Failed to register user.');
      setSuccessMessage('');
    }
  };

  return (
    <InnerContainer2 className="containerStyle">
      <form onSubmit={createAccount}>
        <Wrapper>
          <TextField
            style={{ width: '100%' }}
            type="text"
            label="User Name"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              backgroundColor: 'white',
              borderColor: validationErrors.userName ? 'red' : '',
            }}
            error={validationErrors.userName}
          />
        </Wrapper>
        <Wrapper>
          <TextField
            style={{ width: '100%' }}
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              backgroundColor: 'white',
              borderColor: validationErrors.email || validationErrors.adminEmailError ? 'red' : '',
            }}
            error={validationErrors.email || validationErrors.adminEmailError}
          />
        </Wrapper>
        <Wrapper>
          <TextField
            style={{ width: '100%' }}
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              backgroundColor: 'white',
              borderColor: validationErrors.password ? 'red' : '',
            }}
            error={validationErrors.password}
          />
        </Wrapper>
        <Wrapper>
          <TextField
            style={{ width: '100%' }}
            type="number"
            label="Phone Number (optional)"
            value={phoneNumber}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length <= 9) {
                setPhoneNumber(value);
              }
            }}
            sx={{
              backgroundColor: 'white',
            }}
          />
        </Wrapper>
        <Wrapper>
          <TextField
            style={{ width: '100%' }}
            select
            label="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            sx={{
              backgroundColor: 'white',
              borderColor: validationErrors.department ? 'red' : '',
            }}
            error={validationErrors.department}
          >
            {departments.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
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
                style: () => ({
                  backgroundColor: "#991d70",
                  ':hover': {
                    backgroundColor: "#5e0f44",
                  },
                }),
              },
            }}
          >
            Register
          </Button>
        </Wrapper>
      </form>
    </InnerContainer2>
  );
};

export default RegistrationForm;
