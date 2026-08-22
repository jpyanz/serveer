import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import supabase from "../utils/supabase";
import { useOutletContext } from "react-router";

const Login = () => {
    const navigate = useNavigate();
    const { session } = useOutletContext();
    const [form, setForm] = useState({ email: "", password: "" });

    useEffect(() => {
        // if already loggedin redirect to their dashboard
        if (session) {
            navigate(`/dashboard/${session.user.user_metadata.role}`, {
                replace: true,
            });
        }
    }, [session, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { data, error } = await supabase.auth.signInWithPassword({
            email: form.email.trim(),
            password: form.password,
        });

        if (error) {
            alert(error.message);
        } else if (data.user) {
            const roleId = data.user.user_metadata.role;

            navigate("/dashboard/" + roleId, { replace: true });
        }
    };

    return (
        <section className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 py-16">
            <h1 className="text-3xl font-extrabold tracking-tight text-green-950">
                LOGIN
            </h1>

            <form
                onSubmit={handleSubmit}
                className="mt-8 flex w-full max-w-md flex-col gap-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                    className="w-full rounded-full border border-gray-200 bg-white px-5 py-3 text-base text-gray-800 placeholder:text-gray-500 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-700/20"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                    className="w-full rounded-full border border-gray-200 bg-white px-5 py-3 text-base text-gray-800 placeholder:text-gray-500 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-700/20"
                />

                <button
                    type="submit"
                    className="w-full cursor-pointer rounded-full bg-green-700 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-700/30 focus:ring-offset-2">
                    Continue
                </button>
            </form>

            <div className="my-8 flex w-full max-w-md items-center gap-4">
                <span className="h-px flex-1 bg-gray-200" />
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    OR
                </span>
                <span className="h-px flex-1 bg-gray-200" />
            </div>

            <Link
                to="/register/2"
                className="block w-full max-w-md rounded-full border border-green-700 bg-white px-6 py-3 text-center text-base font-semibold text-green-700 transition-colors hover:bg-green-700/5">
                Sign up instead
            </Link>
        </section>
    );
};

export default Login;
