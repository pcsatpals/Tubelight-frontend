import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const { pathname } = req.nextUrl;
        const token = req.nextauth.token;

        // If user is logged in and tries to access sign-in or sign-up, redirect to dashboard
        // Note: We also check for the error here to ensure we don't redirect a "broken" session to dashboard
        if (token && !token.error && (pathname === "/sign-in" || pathname === "/sign-up")) {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized({ req, token }) {
                const { pathname } = req.nextUrl;
                const isPublicPath =
                    pathname === "/" ||
                    pathname.startsWith("/api/auth") ||
                    pathname === "/sign-in" ||
                    pathname === "/sign-up";

                // 1. Always allow public paths
                if (isPublicPath) return true;

                // 2. CRITICAL: If token has a refresh error, treat as unauthorized
                // Returning false here triggers an automatic redirect to the sign-in page
                if (token?.error === "RefreshAccessTokenError") {
                    return false;
                }

                // 3. Otherwise, check if token exists
                return !!token;
            },
        },
    }
);

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - All image/asset extensions (jpg, jpeg, png, gif, svg, webp, mp4)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
    ],
};