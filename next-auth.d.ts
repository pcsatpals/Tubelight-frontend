import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    /**
     * The User object returned from the authorize() callback
     */
    interface User {
        id: string;
        accessToken: string;
        refreshToken: string;
        accessTokenExpires: number;
        avatar: string;
        fullName: string;
    }

    /**
     * The Session object returned by useSession, getServerSession, etc.
     */
    interface Session {
        accessToken?: string;
        error?: string;
        user: {
            id: string;
        } & DefaultSession["user"]
    }
}

declare module "next-auth/jwt" {
    /**
     * The JWT token object used internally in the jwt() callback
     */
    interface JWT {
        id: string;
        accessToken: string;
        refreshToken: string;
        avatar: string;
        accessTokenExpires: number;
        error?: string;
        fullName: string;

    }
}