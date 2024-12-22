import { auth } from "../../config/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useState } from "react";
import "./styles.css";
import TextField from "@mui/material/TextField";
import { DisplayMedium } from "baseui/typography";
import { Button } from "baseui/button";
import { SignInContainer, HeadingWrapper, SignInWrapper } from "../../styles/Layouts";

export const Auth = () => {
  const navigate = useNavigate();
  const { isAuth, email: storedEmail } = useGetUserInfo();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signInWithEmail = async () => {
    if (!email || !password) {
      setError("Please fill in all the fields.");
      return;
    }

    try {
      const results = await signInWithEmailAndPassword(auth, email, password);
      const authInfo = {
        userID: results.user.uid,
        userName: results.user.userName,
        name: results.user.displayName,
        isAuth: true,
        email: results.user.email,
      };
      localStorage.setItem("auth", JSON.stringify(authInfo));

      if (email === "admin@gmail.com") {
        navigate("/adminPage");
      } else {
        navigate("/userPage");
      }
    } catch (error) {
      setError("Incorrect email or password.");
    }
  };

  if (isAuth) {
    if (storedEmail === "admin@gmail.com") {
      return <Navigate to="/adminPage" />;
    } else {
      return <Navigate to="/userPage" />;
    }
  }

  return (
    <SignInContainer>
      <HeadingWrapper>
        <DisplayMedium style={{ color: "#991d70" }}>
          Expense Tracking System
        </DisplayMedium>
      </HeadingWrapper>
      <SignInWrapper>
        <TextField
          style={{ width: "300px" }}
          name="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="filled"
          error={!email && !!error} // Highlight field if empty
        />
      </SignInWrapper>
      <SignInWrapper>
        <TextField
          style={{ width: "300px" }}
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="filled"
          error={!password && !!error} // Highlight field if empty
        />
      </SignInWrapper>
      {error && <p className="error">{error}</p>}
      <SignInWrapper>
        <Button
          style={{ width: "300px" }}
          size="large"
          onClick={signInWithEmail}
          overrides={{
            BaseButton: {
              style: () => ({
                backgroundColor: "#991d70",
                ":hover": {
                  backgroundColor: "#5e0f44",
                },
              }),
            },
          }}
        >
          Login
        </Button>
      </SignInWrapper>
    </SignInContainer>
  );
};

