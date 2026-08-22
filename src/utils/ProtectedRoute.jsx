import { Navigate, useOutletContext } from "react-router";

const ProtectedRoute = ({ children }) => {
    const { session } = useOutletContext();

    if (!session) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
