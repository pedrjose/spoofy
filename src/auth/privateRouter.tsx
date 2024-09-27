import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/auth/AuthContext";

const PrivateRoute = () => {
  const { authToken } = useAuthContext();
  const location = useLocation();

  return authToken ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

export default PrivateRoute;
