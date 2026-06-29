import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authContext";
import { getDashboardPath } from "./authRoutes";

function ProtectedRoute({ roles }) {
  const { isAuthenticated, isRestoring, user } = useAuth();

  if (isRestoring) {
    return (
      <div
        className="flex min-h-screen items-center justify-center bg-background"
        role="status"
      >
        <span className="font-label-md text-on-surface-variant">
          restoring session...
        </span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to={getDashboardPath(user.role)} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
