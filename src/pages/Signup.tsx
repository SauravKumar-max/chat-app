import React, { useState, useEffect } from "react";
import {
  Stack,
  Typography,
  TextField,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { InputVlaueType } from "./pages.types";
import {
  buttonStyle,
  disabledButtonStyle,
  authContainer,
  authHeader,
} from "../muistyles";
import axios from "axios";

export function Signup() {
  const navigate = useNavigate();
  const {
    authState: { token },
    loginUserWithCredentials,
  } = useAuth();
  const [spinner, setSpinner] = useState(false);
  const [checkForm, setCheckForm] = useState(false);
  const [inputValue, setInputValue] = useState<InputVlaueType>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (token) {
      navigate("/");
      setSpinner(false);
    }
  }, [token, navigate]);

  useEffect(() => {
    const { name, email, password, confirmPassword } = inputValue;
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      if (password === confirmPassword) {
        return setCheckForm(true);
      }
    }
    return setCheckForm(false);
  }, [inputValue]);

  async function signupHandler() {
    setSpinner(true);
    try {
      const api = process.env.REACT_APP_API_URL + "/user";
      console.log(api);
      const response = await axios.post(api, {
        newUser: {
          name: inputValue.name,
          email: inputValue.email,
          password: inputValue.password,
        },
      });
      if (response.status === 200) {
        loginUserWithCredentials(inputValue.email, inputValue.password);
      }
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <div>
      <Stack direction={"column"} alignItems={"center"} sx={authContainer}>
        <Typography variant="h2" sx={authHeader}>
          SignUp
        </Typography>
        <TextField
          id="Email"
          label="Email"
          variant="outlined"
          type="email"
          sx={{ m: 1, width: "100%" }}
          value={inputValue.email}
          onChange={(e) =>
            setInputValue((input) => ({ ...input, email: e.target.value }))
          }
        />
        <TextField
          id="Name"
          label="Name"
          variant="outlined"
          type="text"
          sx={{ m: 1, width: "100%" }}
          value={inputValue.name}
          onChange={(e) =>
            setInputValue((input) => ({ ...input, name: e.target.value }))
          }
        />

        <TextField
          id="Password"
          label="Password"
          variant="outlined"
          type="password"
          sx={{ m: 1, width: "100%" }}
          value={inputValue.password}
          onChange={(e) =>
            setInputValue((input) => ({ ...input, password: e.target.value }))
          }
        />
        <TextField
          id="Repeat-password"
          label="Re-Enter Password"
          variant="outlined"
          type="password"
          sx={{ m: 1, width: "100%" }}
          value={inputValue.confirmPassword}
          onChange={(e) =>
            setInputValue((input) => ({
              ...input,
              confirmPassword: e.target.value,
            }))
          }
        />
        <Button
          variant="contained"
          sx={checkForm ? buttonStyle : disabledButtonStyle}
          onClick={checkForm ? () => signupHandler() : () => null}
        >
          {spinner ? "Singingup" : "Signup"}
        </Button>
        <Typography
          sx={{ fontSize: "0.8rem", fontWeight: "bold", color: "text.primary" }}
        >
          Already have an account.
          <Typography
            component="span"
            sx={{
              fontSize: "0.8rem",
              fontWeight: "bold",
              color: "#3d41d7",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </Typography>
        </Typography>
      </Stack>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={spinner}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
