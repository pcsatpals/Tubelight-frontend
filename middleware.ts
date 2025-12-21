import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const { pathname } = req.nextUrl;
        const token = req.nextauth.token;

        // 1. If user is logged in and tries to access sign-in or sign-up
        if (token && (pathname === "/sign-in" || pathname === "/sign-up")) {
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

                if (isPublicPath) return true;

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