"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";

export const useLogoutMutation = () => {
    const { data: session } = useSession();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            // 1. Backend Logout: Call your API with the current token
            if (session?.accessToken) {
                return axios.post(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/users/logout`,
                    {},
                    {
                        headers: { Authorization: `Bearer ${session.accessToken}` },
                    }
                );
            }
        },
        onSettled: () => {
            // 2. Cleanup: Clear all React Query caches
            queryClient.clear();

            // 3. Finalize: Sign out from NextAuth (clears cookies)
            signOut({ callbackUrl: "/sign-in" });
        },
        onError: (error) => {
            console.error("Logout failed on backend, but clearing local session anyway.", error);
        }
    });
};