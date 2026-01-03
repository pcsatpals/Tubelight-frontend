import axios, { InternalAxiosRequestConfig } from "axios";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "./auth";

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

apiClient.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    // If skipAuth is true, return immediately without fetching session
    if (config.skipAuth) {
        return config;
    }

    // Only runs for protected routes
    let session;

    if (typeof window === "undefined") {
        // --- WE ARE ON THE SERVER ---
        // We use getServerSession to read cookies from the incoming request
        session = await getServerSession(authOptions);
    } else {
        // --- WE ARE ON THE CLIENT ---
        session = await getSession();
    }

    if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return config;
});

export default apiClient;