import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../authProvider";

const PrivateRoute = () => {
  const auth = useAuth();
  const token = auth?.token;

  if (!token) return <Navigate to="/" />;
  return <Outlet />;
};

export default PrivateRoute;
