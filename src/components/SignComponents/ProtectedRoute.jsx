import { useAuthContext } from "../../contexts/contexts";
import { Navigate, Outlet } from "react-router-dom";

export const UserProtectedRoute = ({ children }) => {
  const { user } = useAuthContext();

  if (user === null) return <Navigate to="/signinup" />;

  const allowedRoles = ["user", "admin"];
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/signinup" replace />;
  }

  return children ? children : <Outlet />;
};

export const AdminProtectedRoute = ({ children }) => {
  const { user, loading } = useAuthContext();

  if (loading) return <div>Loading...</div>;
  if (user === null) return <Navigate to="/signinup" replace />;
  if (user.role !== "admin") return <Navigate to="/dashboard" />;

  return children ? children : <Outlet />;
};
