import { Navigate } from "react-router-dom";
import { useAuth } from "../context";

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const { authState } = useAuth();
  const { login } = authState;
  return login ? children : <Navigate to="/login" state={{ from: "/" }} />;
}
