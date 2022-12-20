import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
function ProtectedRoutes({ allowedRoles }) {
  const { auth } = useAuth();
  const location = useLocation();
  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}

export default ProtectedRoutes;
