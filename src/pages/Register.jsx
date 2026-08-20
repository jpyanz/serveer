import { useState } from "react";
import { Link, useParams } from "react-router";
import supabase from "../utils/supabase";

const InitialState = {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
    agreed_policy: false,
};

const Register = () => {
    const [form, setForm] = useState(InitialState);
    const [isRegistered, setIsRegistered] = useState(false);
    const { roleId } = useParams();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { error } = await supabase.auth.signUp({
            email: form.email.trim(),
            password: form.password,
            options: {
                data: {
                    first_name: form.first_name.trim(),
                    last_name: form.last_name.trim(),
                    phone_number: form.phone_number.trim(),
                    role: roleId,
                    agreed_policy: form.agreed_policy,
                },
            },
        });

        if (error) {
            console.log(error.message);
            return;
        }

        setIsRegistered(true);
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setForm((previous) => ({
            ...previous,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    if (isRegistered) {
        return (
            <section className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
                <h1 className="text-3xl font-extrabold tracking-tight text-green-950">
                    Check your email
                </h1>
                <p className="mt-3 max-w-md text-base text-gray-500">
                    We sent a confirmation link to{" "}
                    <strong className="font-semibold text-gray-800">
                        {form.email}
                    </strong>{" "}
                    Confirm your address, then sign in.
                </p>
                <Link
                    to="/login"
                    className="mt-8 inline-block rounded-full bg-green-700 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-green-800">
                    Go to login
                </Link>
            </section>
        );
    }

    return (
        <section className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 py-16">
            <h1 className="text-3xl font-extrabold tracking-tight text-green-950">
                Register
            </h1>
            <form
                onSubmit={handleSubmit}
                className="mt-8 flex w-full max-w-lg flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        value={form.first_name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-full border border-gray-200 bg-white px-5 py-3 text-base text-gray-800 placeholder:text-gray-500 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-700/20"
                    />
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        value={form.last_name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-full border border-gray-200 bg-white px-5 py-3 text-base text-gray-800 placeholder:text-gray-500 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-700/20"
                    />
                </div>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-full border border-gray-200 bg-white px-5 py-3 text-base text-gray-800 placeholder:text-gray-500 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-700/20"
                />
                <input
                    type="text"
                    name="phone_number"
                    placeholder="Phone Number"
                    value={form.phone_number}
                    onChange={handleChange}
                    required
                    className="w-full rounded-full border border-gray-200 bg-white px-5 py-3 text-base text-gray-800 placeholder:text-gray-500 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-700/20"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full rounded-full border border-gray-200 bg-white px-5 py-3 text-base text-gray-800 placeholder:text-gray-500 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-700/20"
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full rounded-full border border-gray-200 bg-white px-5 py-3 text-base text-gray-800 placeholder:text-gray-500 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-700/20"
                />

                <div className="flex flex-col gap-1">
                    <label className="flex items-start gap-3 text-sm text-gray-500">
                        <input
                            type="checkbox"
                            name="agreed_policy"
                            checked={form.agreed_policy}
                            onChange={handleChange}
                            required
                            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-gray-200 accent-green-700 focus:ring-green-700/30"
                        />
                        I agree to the Terms and Conditions and have reviewed
                        the Privacy Policy.
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full cursor-pointer rounded-full bg-green-700 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-700/30 focus:ring-offset-2">
                    Create account
                </button>
            </form>
            <p className="mt-6 text-sm text-gray-500">
                Already have an account?
                <Link
                    to="/login"
                    className="ml-1 font-semibold text-green-700 hover:underline">
                    Log in
                </Link>
            </p>
        </section>
    );
};

export default Register;
