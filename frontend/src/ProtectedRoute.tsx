import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    allowedRoles: string[];
    currentRole: string;
    children: JSX.Element;
}

export default function ProtectedRoute({
    allowedRoles,
    currentRole,
    children,
}: ProtectedRouteProps) {
    if (!allowedRoles.includes(currentRole)) {
        return <Navigate to="/403" replace />;
    } else return children;
}
