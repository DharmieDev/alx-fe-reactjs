import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // store the attempted route for after login
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  // user is authenticated; render the child route(s)
  return <Outlet />;
}
