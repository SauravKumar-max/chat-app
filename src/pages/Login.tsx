import React, { useState, useEffect } from "react";
import {
  Stack,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import {
  buttonStyle,
  disabledButtonStyle,
  authContainer,
  authHeader,
  authError,
} from "../muistyles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ForumIcon from "@mui/icons-material/Forum";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {
    authState: { token },
    spinner,
    loginUserWithCredentials,
    errorMessage,
  } = useAuth();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  function loginHandler() {
    loginUserWithCredentials(email, password);
  }

  function emailChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function passwordChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  return (
    <div>
      <Stack
        direction={"row"}
        alignItems={"center"}
        sx={{ margin: "1rem 2rem" }}
      >
        <IconButton size="large" edge="start" color="primary" aria-label="menu">
          <ForumIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: "bold", color: "#3d41d7" }}
        >
          BlendChat
        </Typography>
      </Stack>

      <Stack direction={"column"} alignItems={"center"} sx={authContainer}>
        <Typography variant="h2" sx={authHeader}>
          LogIn
        </Typography>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="email"
          sx={{ m: 1, width: "100%" }}
          value={email}
          required={true}
          onChange={emailChangeHandler}
        />
        <FormControl variant="outlined" sx={{ m: 1, width: "100%" }}>
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={passwordChangeHandler}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((show) => !show)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        {errorMessage && (
          <Typography sx={authError}>Error: {errorMessage}</Typography>
        )}

        <Button
          variant="contained"
          sx={email && password ? buttonStyle : disabledButtonStyle}
          onClick={email && password ? () => loginHandler() : () => null}
        >
          {spinner ? "Logging..." : "Login"}
        </Button>
        <Typography
          sx={{ fontSize: "0.8rem", fontWeight: "bold", color: "text.primary" }}
        >
          Don't have an account.
          <Typography
            component="span"
            sx={{
              fontSize: "0.8rem",
              fontWeight: "bold",
              color: "#3d41d7",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => navigate("/signup")}
          >
            {" "}
            SignUp
          </Typography>
        </Typography>
        <Typography
          sx={{
            fontSize: "0.8rem",
            fontWeight: "bold",
            color: "#3d41d7",
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={() => {
            setEmail("guest123@gmail.com");
            setPassword("Guest@123");
          }}
        >
          Fill Guest Credentials
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
