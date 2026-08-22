import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export const initialState = {
    first_name: "",
    last_name: "",
    phone_number: "",
    street_address: "",
    barangay: "",
    city: "",
    province: "",
    postal_code: "",
};

export const useAuthSession = () => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth
            .getSession()
            .then(({ data: { session } }) => {
                setSession(session);
            })
            .catch((error) => {
                console.error("Failed to restore session:", error);
            })
            .finally(() => {
                setLoading(false);
            });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    return { session, loading };
};

export const getAuthUser = async (userId) => {
    const columns = Object.keys(initialState).join(", ");

    const { data, error } = await supabase
        .from("users")
        .select(columns)
        .eq("id", userId)
        .single();

    if (error) throw error;

    return data;
};
