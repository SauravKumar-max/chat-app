import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import {
  ProviderProps,
  AuthContextType,
  UserToken,
  ServerError,
  User,
} from "./context.types";
import axios, { AxiosError } from "axios";
import {
  getUserDetails,
  getTokenFromLocalStroage,
  setupAuthHeaderForServiceCalls,
  getAllUsers,
} from "../utils";
import { authReducer } from "../reducer/authReducer";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: ProviderProps) {
  const { isUserLoggedIn, token: savedToken } = getTokenFromLocalStroage();
  const [spinner, setSpinner] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [allUsers, setAllUsers] = useState<User[] | null>(null);

  const authInitialState = {
    login: isUserLoggedIn,
    token: savedToken,
    userDetails: null,
  };

  const [authState, dispatchAuth] = useReducer(authReducer, authInitialState);

  setupAuthHeaderForServiceCalls(authState.token);

  useEffect(() => {
    (async () => {
      if (authState.token) {
        const userDetails = await getUserDetails();
        if ("user" in userDetails) {
          const { user } = userDetails;
          dispatchAuth({ type: "ADD_USER_DETAILS", payload: user });
        }
      }
    })();
  }, [authState.token]);

  useEffect(() => {
    (async () => {
      if (authState.token) {
        const allUsers = await getAllUsers();
        if ("users" in allUsers) {
          const { users } = allUsers;
          setAllUsers(users);
        }
      }
    })();
  }, [authState.token]);

  async function loginUserWithCredentials(email: string, password: string) {
    setSpinner(true);
    try {
      const api = process.env.REACT_APP_API_URL + "/user/login";
      const response = await axios.post<UserToken>(api, {
        user: { email, password },
      });
      if (response.status === 200) {
        loginUser(response.data);
        setSpinner(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setSpinner(false);
        const serverError = error as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          setErrorMessage(serverError.response.data.message);
        }
      }
    }
  }

  function loginUser(data: UserToken) {
    dispatchAuth({ type: "SET_TOKEN", payload: data.token });
    dispatchAuth({ type: "SET_LOGIN", payload: true });
    localStorage?.setItem(
      "login",
      JSON.stringify({ isUserLoggedIn: true, token: data.token })
    );
  }

  return (
    <AuthContext.Provider
      value={{
        loginUserWithCredentials,
        spinner,
        errorMessage,
        dispatchAuth,
        authState,
        allUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
