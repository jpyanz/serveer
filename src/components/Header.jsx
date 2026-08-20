import { NavLink, useNavigate } from "react-router";
import supabase from "../utils/supabase";
import { useOutletContext } from "react-router";

const Header = () => {
    // Get the session from App.jsx context via useOutletContext
    const { session } = useOutletContext();

    const navigate = useNavigate();

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();

        navigate("/", { replace: true });

        if (error) {
            console.log(error.message);

            return;
        }
    };

    return (
        <header className="sticky top-0 z-50 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-gray-200 bg-white px-6 py-3 sm:h-[70px] sm:flex-nowrap sm:gap-x-6 sm:py-0">
            <NavLink
                to="/"
                className="text-xl font-extrabold tracking-tight text-green-950 transition-colors hover:text-green-700">
                Serveer
            </NavLink>

            {session ? (
                <>
                    <NavLink
                        to={`/dashboard/${session.user.user_metadata.role}`}
                        className="ml-auto text-sm font-semibold text-gray-900 transition-colors hover:text-green-700 sm:text-base">
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/profile"
                        className="text-sm font-semibold text-gray-900 transition-colors hover:text-green-700 sm:text-base">
                        Profile
                    </NavLink>
                    <button
                        type="button"
                        onClick={handleSignOut}
                        className="cursor-pointer text-sm font-semibold text-gray-900 transition-colors hover:text-green-700 sm:text-base">
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <NavLink
                        to="/login"
                        className="ml-auto whitespace-nowrap text-sm font-semibold text-gray-900 transition-colors hover:text-green-700 sm:text-base">
                        Sign up / Log in
                    </NavLink>
                    <NavLink
                        to="/register/3"
                        className="ml-auto whitespace-nowrap rounded-full border border-green-700 sm:ml-0 bg-white px-4 py-2 text-sm font-semibold text-green-700 transition-colors hover:bg-green-700/5 sm:px-5 sm:text-base">
                        Register Business / Service
                    </NavLink>
                </>
            )}
        </header>
    );
};

export default Header;
