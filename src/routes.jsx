import { createBrowserRouter } from "react-router";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ServeeDashboard from "./pages/ServeeDashboard.jsx";
import ClientDashboard from "./pages/ClientDashboard.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";

const dashboards = [
    { path: "1", Component: AdminDashboard },
    { path: "2", Component: ClientDashboard },
    { path: "3", Component: ServeeDashboard },
];

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register/:roleId",
                element: <Register />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
            {
                path: "dashboard",
                children: dashboards.map(({ path, Component }) => ({
                    path,
                    element: (
                        <ProtectedRoute>
                            <Component />
                        </ProtectedRoute>
                    ),
                })),
            },
            { path: "*", element: <NotFound /> },
        ],
    },
]);

export default router;
