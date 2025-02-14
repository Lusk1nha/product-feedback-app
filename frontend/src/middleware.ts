import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

const PUBLIC_ROUTES = [
  {
    path: "/sign-in",
    whenAuthenticated: "redirect",
  },
  {
    path: "/sign-up",
    whenAuthenticated: "redirect",
  },
  {
    path: "/forgot-password",
    whenAuthenticated: "redirect",
  },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/sign-in";
const REDIRECT_WHEN_AUTHENTICATED_ROUTE = "/";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const publicRoute = PUBLIC_ROUTES.find((route) => route.path === path);
  const authToken = req.cookies.get("accessToken");

  // If the user is not authenticated and the route is public, continue to the next middleware
  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  // If the user is not authenticated and the route is not public, redirect to the sign-in page
  if (!authToken && !publicRoute) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  // If the user is authenticated and the route is public, redirect to the home page
  if (
    authToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === "redirect"
  ) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  // If the user is authenticated and the route is not public, check if the token is expired
  if (authToken && !publicRoute) {
    const { exp } = jose.decodeJwt(authToken.value);

    if (exp && exp * 1000 < Date.now()) {
      const redirectUrl = req.nextUrl.clone();

      redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
      req.cookies.delete("refreshToken");

      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
