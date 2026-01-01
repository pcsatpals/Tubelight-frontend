import axios, { AxiosError } from "axios";
import { User } from "next-auth";
import { jwtDecode } from "jwt-decode";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// Authenticate user with your external API
export async function authenticateUser(email: string, password: string) {
    try {
        const { data } = await axios.post(`${API_BASE_URL}/v1/users/login`, {
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
        const { data } = await axios.post(`${API_BASE_URL}/v1/users/refresh-token`, {
            body: JSON.stringify({
                refreshToken: user.refreshToken,
            }),
        })

        const newTokens = data.data || data;

        return {
            ...user,
            accessToken: newTokens.accessToken,
            refreshToken: newTokens.refreshToken || user.refreshToken,
            accessTokenExpires: decodedJWT(newTokens.accessToken).exp * 1000,
        }
    } catch (error) {
        console.log(error)
        return {
            ...user,
            error: "RefreshAccessTokenError",
        }
    }
}

interface MyTokenPayload {
    exp: number; // Expiration time in seconds
    iat: number; // Issued at time
    _id: string;
}

export function decodedJWT(token: string): MyTokenPayload {
    const decoded = jwtDecode<MyTokenPayload>(token);
    return decoded
}