import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const PrivateRoute = () => {
  const auth = useAuth();
  const token = auth?.token;

  if (!token) return <Navigate to="/" />;
  return <Outlet />;
};

export default PrivateRoute;
