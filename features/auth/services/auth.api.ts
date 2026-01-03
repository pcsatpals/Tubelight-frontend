"use server"

import axios, { AxiosError } from "axios";
import { User } from "next-auth";
import { jwtDecode } from "jwt-decode";

const API_URL = process.env.API_BASE_URL;
// Authenticate user with your external API
export async function authenticateUser(email: string, password: string) {
    try {
        const { data } = await axios.post(`${API_URL}/v1/users/login`, {
            email,
            password,
        });
        return data; // Axios automatically parses JSON
    } catch (error) {
        const axiosError = error as AxiosError;
        console.error("Auth error:", axiosError.response?.data || axiosError.message);
        return null;
    }
}


export async function refreshAccessToken(user: User) {
    try {
        const { data } = await axios.post(`${API_URL}/v1/users/refresh-token`, {}, {
            headers: {
                Authorization: `Bearer ${user.refreshToken}`,
            },
            skipAuth: true, // Type-safe custom property
        }
        )

        const newTokens = data.data || data;

        return {
            ...user,
            accessToken: newTokens.accessToken,
            refreshToken: newTokens.refreshToken || user.refreshToken,
            accessTokenExpires: (await decodedJWT(newTokens.accessToken)).exp * 1000,
        }
    } catch (error) {
        console.log(error)
        return {
            ...user,
            error: "RefreshAccessTokenError",
        }
    }
}


export async function logoutUserAction(accessToken: string) {
    try {
        const API_URL = process.env.API_BASE_URL;

        // This is a Server-to-Server call
        await axios.post(
            `${API_URL}/v1/users/logout`,
            {},
            {
                headers: { Authorization: `Bearer ${accessToken}` },
            }
        );
        return { success: true };
    } catch (error) {
        let errorMessage = "An unexpected error occurred";

        if (axios.isAxiosError(error)) {
            errorMessage = error.response?.data?.message || error.message;
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.error("Registration Error:", errorMessage);
        throw new Error(errorMessage);
    }
}


export async function handleRegisterAction(formData: FormData) {
    try {
        // 1. Register the user (Server-to-Server)
        const registrationRes = await axios.post(
            `${API_URL}/v1/users/register`,
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
                skipAuth: true
            }
        );

        if (registrationRes.data?.statusCode === true) {
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;

            // 2. Internal Login Check
            const loginRes = await authenticateUser(email, password);

            if (!loginRes?.data) {
                return {
                    success: false,
                    message: "Registration succeeded, but auto-login failed. Please sign in manually."
                };
            }

            // 3. Return Success to the client
            // We return the credentials so the client can call next-auth signIn
            return {
                success: true,
                message: "User registered successfully",
                credentials: { email, password }
            };
        } else {
            return {
                success: false,
                message: registrationRes.data?.message || "Registration failed"
            };
        }
    } catch (error) {
        let errorMessage = "An unexpected error occurred";

        if (axios.isAxiosError(error)) {
            errorMessage = error.response?.data?.message || error.message;
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.error("Registration Error:", errorMessage);
        throw new Error(errorMessage);
    }
}


interface MyTokenPayload {
    exp: number; // Expiration time in seconds
    iat: number; // Issued at time
    _id: string;
}

export async function decodedJWT(token: string): Promise<MyTokenPayload> {
    const decoded = jwtDecode<MyTokenPayload>(token);
    return decoded
}