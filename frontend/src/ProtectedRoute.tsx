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
    // Nếu vai trò hiện tại không thuộc danh sách các vai trò được phép
    if (!allowedRoles.includes(currentRole)) {
        return <Navigate to="/403" replace />;
    }

    // Nếu được phép, render nội dung trang
    return children;
}
