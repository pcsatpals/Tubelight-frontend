import { authOptions } from "@/lib/auth"; // Ensure this path matches where you stored authOptions
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

// You MUST export GET and POST for NextAuth to work in the App Router
export { handler as GET, handler as POST };