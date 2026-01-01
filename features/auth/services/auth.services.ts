import { signIn } from "next-auth/react";
import axios from "axios";
import { authenticateUser } from "./auth.api";

export async function handleRegisterAction(formData: FormData) {
    try {
        // 1. Register the user
        const registrationRes = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/users/register`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );

        // Your backend returns "statusCode: true" for success
        if (registrationRes.data?.statusCode === true) {

            // 2. Since the register API doesn't provide tokens, call the login API
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;

            const loginRes = await authenticateUser(email, password);

            if (!loginRes?.data) {
                throw new Error("Registration succeeded, but auto-login failed. Please sign in manually.");
            }

            // 3. Trigger next-auth signIn with the credentials
            const res = await signIn("credentials", {
                email,
                password,
                redirect: true,
            });

            if (res?.error) throw new Error(res.error);

            return registrationRes.data;
        } else {
            throw new Error(registrationRes.data?.message || "Registration failed");
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

