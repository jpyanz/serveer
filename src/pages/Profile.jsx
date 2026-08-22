import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { getAuthUser, initialState } from "../utils/authSession";
import { labelClass, inputClass } from "../utils/styles";
import Loading from "../components/Loading";
import supabase from "../utils/supabase";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Profile = () => {
    const { session } = useOutletContext();
    const [user, setUser] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadUser = async () => {
            await getAuthUser(session.user.id).then((data) => {
                if (data) setUser(data);
            });
        };

        loadUser();
    }, [session.user.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        const { data, error } = await supabase
            .from("users")
            .update({
                first_name: user.first_name,
                last_name: user.last_name,
                phone_number: user.phone_number,
                street_address: user.street_address,
                barangay: user.barangay,
                city: user.city,
                province: user.province,
                postal_code: user.postal_code,
                country: user.country,
            })
            .eq("id", session.user.id)
            .select();

        if (error) throw error;

        if (data) setUser(data[0]);

        setIsLoading(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <>
            <Header />

            {isLoading ? (
                <Loading />
            ) : (
                <section className="flex justify-center-safe items-center mb-10">
                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 flex w-full max-w-lg flex-col gap-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="first_name"
                                    className={labelClass}>
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    placeholder="First Name"
                                    value={user.first_name}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="last_name"
                                    className={labelClass}>
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    placeholder="Last Name"
                                    value={user.last_name}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="phone_number"
                                className={labelClass}>
                                Phone Number
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    +63
                                </div>
                                <input
                                    type="number"
                                    id="phone_number"
                                    name="phone_number"
                                    placeholder="Phone Number"
                                    value={user.phone_number}
                                    onChange={handleChange}
                                    className={
                                        inputClass + " ps-11 pe-3 py-2.5"
                                    }
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="street_address"
                                className={labelClass}>
                                Street Address
                            </label>
                            <input
                                type="text"
                                id="street_address"
                                name="street_address"
                                placeholder="Street Address"
                                value={user.street_address}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="barangay"
                                    className={labelClass}>
                                    Barangay
                                </label>
                                <input
                                    type="text"
                                    id="barangay"
                                    name="barangay"
                                    placeholder="Barangay"
                                    value={user.barangay}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label htmlFor="city" className={labelClass}>
                                    City
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    placeholder="City"
                                    value={user.city}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="province"
                                    className={labelClass}>
                                    Province
                                </label>
                                <input
                                    type="text"
                                    id="province"
                                    name="province"
                                    placeholder="Province"
                                    value={user.province}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="postal_code"
                                    className={labelClass}>
                                    Postal Code
                                </label>
                                <input
                                    type="number"
                                    id="postal_code"
                                    name="postal_code"
                                    placeholder="Postal Code"
                                    value={user.postal_code}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full cursor-pointer rounded-full bg-green-700 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-700/30 focus:ring-offset-2">
                            Update
                        </button>
                    </form>
                </section>
            )}

            <Footer />
        </>
    );
};

export default Profile;
