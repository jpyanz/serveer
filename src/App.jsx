import { Outlet } from "react-router";
import { useAuthSession } from "./utils/authSession";

const App = () => {
    // Get the Session from AuthSession.js
    const session = useAuthSession();

    return (
        <>
            <main className="min-h-screen bg-gray-50 font-sans text-gray-800 antialiased">
                {/* pass session to context prop to be used by the children */}
                <Outlet context={{ session }} />
            </main>
        </>
    );
};

export default App;
