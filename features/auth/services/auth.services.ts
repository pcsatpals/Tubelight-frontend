// services/auth.ts
import { signIn } from "next-auth/react";
import axios from "axios";

export async function handleRegisterAction(formData: FormData) {
    try {
        // 1. ONE CALL to your external backend (Register + Get Tokens)
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/users/register`, formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true, // CRITICAL: Matches your backend CORS config
            });

        // Check if data exists and backend reports success
        if (data?.success) {
            // NextAuth signIn
            const res = await signIn("credentials", {
                userObject: JSON.stringify(data.data),
                redirect: false,
            });

            if (res?.error) {
                throw new Error(res.error || "Login failed after registration");
            }

            return data; // SUCCESS PATH
        } else {
            throw new Error(data?.message || "Registration failed");
        }
    } catch (error) {
        // 3. Extract the message from Axios error response
        let errorMessage = "An unexpected error occurred";

        if (axios.isAxiosError(error)) {
            // Now TypeScript knows error is an AxiosError
            // and we can safely access .response?.data
            errorMessage = error.response?.data?.message || error.message;
        } else if (error instanceof Error) {
            // For standard JavaScript errors
            errorMessage = error.message;
        }

        console.error("Registration Error:", errorMessage);

        // Throwing a fresh Error with our clean string for Toastify
        throw new Error(errorMessage);
    }
}

