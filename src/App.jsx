import { Outlet } from "react-router";
import Loading from "./components/Loading";
import { useAuthSession } from "./utils/authSession";

const App = () => {
    // Get the Session from AuthSession.js
    const { session, loading } = useAuthSession();

    return (
        <>
            <main className="min-h-screen bg-gray-50 font-sans text-gray-800 antialiased">
                {/* hold every route until the stored session has resolved,
                    otherwise guards would run against a not-yet-known session */}
                {loading ? <Loading /> : <Outlet context={{ session }} />}
            </main>
        </>
    );
};

export default App;
