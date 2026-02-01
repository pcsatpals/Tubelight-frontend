import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { authenticateUser, refreshAccessToken } from "@/features/auth/services/auth.api";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { formatUserSession } from "./format-user-session";
// import AppleProvider from "next-auth/providers/apple";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                userObject: { type: "text" }
            },
            async authorize(credentials) {
                // 1. Handle Registration Redirect (userObject)
                if (credentials?.userObject) {
                    const { data } = JSON.parse(credentials.userObject);
                    return formatUserSession(data, {
                        accessToken: data.accessToken,
                        refreshToken: data.refreshToken
                    });
                }

                // 2. Handle Regular Login
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing credentials");
                }

                const authResult = await authenticateUser(credentials.email, credentials.password);
                if (!authResult?.data) return null;

                const { user, accessToken, refreshToken } = authResult.data;
                return formatUserSession(user, { accessToken, refreshToken });
            }
        })
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user, account }) {
            // INITIAL SIGN IN (Google or Credentials)
            if (account && user) {
                if (account.provider === "google") {
                    try {
                        // Use your unified /login endpoint for social too
                        const { data: res } = await axios.post(`${API_BASE_URL}/v1/users/login`, {
                            email: user.email,
                            fullName: user.name,
                            provider: account.provider,
                            externalId: user.id,
                            avatar: user.image,
                            coverImage: user.coverImage
                        });
                        const { user: dbUser, accessToken, refreshToken } = res.data;
                        return formatUserSession(dbUser, { accessToken, refreshToken });
                    } catch (error) {
                        return { ...token, error: "SocialLoginError" };
                    }
                }
                // Credentials user is already formatted by authorize()
                return { ...token, ...user };
            }

            // REFRESH LOGIC
            if (Date.now() < (token.accessTokenExpires as number)) {
                return token;
            }

            return await refreshAccessToken(token);
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.image = token.avatar as string;
                session.user.coverImage = token.coverImage as string;
                session.user.name = token.fullName as string;
                session.accessToken = token.accessToken as string;
                session.error = token.error as string;
            }
            return session;
        }
    },
    pages: { signIn: "/sign-in", error: "/sign-in" },
    secret: process.env.NEXTAUTH_SECRET,
};