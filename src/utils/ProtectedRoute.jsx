import { Navigate } from "react-router";
import { useOutletContext } from "react-router";

const ProtectedRoute = ({ children }) => {
    const { session } = useOutletContext();

    if (!session) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
