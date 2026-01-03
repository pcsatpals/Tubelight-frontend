"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import { logoutUserAction } from "../services/auth.api";

export const useLogoutMutation = () => {
    const { data: session } = useSession();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            if (session?.accessToken) {
                // Call the Server Action Proxy instead of direct axios
                return await logoutUserAction(session.accessToken);
            }
        },
        onSuccess: () => {
            // Optional: toast.success("Logged out successfully");
        },
        onSettled: async () => {
            // 1. Clear all React Query caches immediately
            queryClient.clear();

            // 2. Sign out from NextAuth (Client-side)
            // This clears the session cookie and redirects
            await signOut({
                callbackUrl: "/sign-in",
                redirect: true
            });
        },
        onError: (error) => {
            console.error("Logout process error:", error);
            // We usually proceed with client-side signout anyway to avoid stuck sessions
        }
    });
};