import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { authenticateUser, refreshAccessToken } from "@/features/auth/services/auth.api";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
// import AppleProvider from "next-auth/providers/apple";

const API_BASE_URL = "";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        // Removed For now because the Apple Id is not available
        // AppleProvider({
        //     clientId: process.env.APPLE_ID!,
        //     clientSecret: process.env.APPLE_SECRET!,
        // }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                userObject: { type: "text" } // We use this for registration data
            },
            async authorize(credentials) {
                // IF userObject exists, it means we JUST registered. 
                // RETURN IT IMMEDIATELY. NO LOGIN API CALL.
                if (credentials?.userObject) {
                    const authResult = JSON.parse(credentials.userObject);
                    const userData = authResult.data;
                    return {
                        id: userData.user._id,
                        fullName: userData.user.fullName,
                        email: userData.user.email,
                        avatar: userData.user.avatar,
                        accessToken: userData.accessToken,
                        refreshToken: userData.refreshToken,
                        accessTokenExpires: Date.now() + 86400000,
                    };
                }

                // Standard Login Flow (Regular login only)

                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password");
                }

                const authResult = await authenticateUser(
                    credentials.email,
                    credentials.password
                )

                if (!authResult || !authResult.data) return null;

                // Check your API response structure! 
                // If it's wrapped in ApiResponse, you need authResult.data
                const userData = authResult.data;
                return {
                    id: userData.user._id,
                    fullName: userData.user.fullName,
                    email: userData.user.email,
                    avatar: userData.user.avatar, // CRITICAL: Your log shows avatar is inside user
                    accessToken: userData.accessToken, // CRITICAL: Pull from userData, not authResult
                    refreshToken: userData.refreshToken,
                    accessTokenExpires: Date.now() + 86400000,
                };
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days

    },
    callbacks: {

        async jwt({ token, user, account }) {
            if (account && (account.provider === "google" || account.provider === "apple")) {
                try {
                    // Call your external backend to "Register/Login" this social user
                    const { data } = await axios.post(`${API_BASE_URL}/auth/social-login`, {
                        email: user.email,
                        name: user.name,
                        provider: account.provider,
                        externalId: user.id,
                        avatar: user.avatar,
                        idToken: account.id_token, // Provided by Google/Apple
                    });

                    // Attach your backend's tokens to the JWT
                    return {
                        ...token,
                        id: data.user.id,
                        accessToken: data.accessToken,
                        avatar: data.user.avatar,
                        refreshToken: data.refreshToken,
                        accessTokenExpires: Date.now() + (data.expiresIn * 1000),
                    };
                } catch (error) {
                    console.error("Social sync error:", error);
                    return { ...token, error: "SocialSyncError" };
                }
            }


            // Initial sign-in
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    avatar: user.avatar,
                    fullName: user.fullName,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                    accessTokenExpires: user.accessTokenExpires,
                }
            }

            // Token hasn't expired yet
            if (Date.now() < token.accessTokenExpires) {
                return token
            }

            // Token expired, refresh it
            return await refreshAccessToken(token)
        },
        async session({ session, token }) {

            if (session.user) {
                session.user.id = token.id;
                session.user.image = token.avatar;
                session.user.name = token.fullName;
                session.accessToken = token.accessToken
                session.error = token.error
            }
            return session;
        }
    },
    pages: {
        signIn: "/sign-in",
        error: "/sign-in",
    },
    secret: process.env.NEXTAUTH_SECRET,
}