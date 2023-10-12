import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Role base route handle

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  // console.log(token, "token middleware");
  const { pathname } = request.nextUrl;

  const hybridRoutes = ["/auth/login", "/auth/signup"];
  const generalUserAccesibleRoutes = ["/dashboard", "/my-profile"];
  const rolesRedirect: Record<string, unknown> = {
    admin: "http://localhost:3000/admin/dashboard",
    general_user: `http://localhost:3000/dashboard`,
    seller: "http://localhost:3000/seller/dashboard",
    buyer: "http://localhost:3000/buyer/dashboard",
  };

  if (!token) {
    if (hybridRoutes.includes(pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect("http://localhost:3000/auth/login");
  }

  const role = token?.role as string;
  // console.log(role, "role middleware")
  if (
    (role === "admin" && pathname.startsWith("/admin")) ||
    (role === "seller" && pathname.startsWith("/seller")) ||
    (role === "buyer" && pathname.startsWith("/buyer")) ||
    (role === "general_user" && generalUserAccesibleRoutes.includes(pathname))
  ) {
    // console.log("next")
    return NextResponse.next();
  }

  if (pathname === "/" && role && role in rolesRedirect) {
    return NextResponse.redirect(rolesRedirect[role] as string);
  }
  return NextResponse.redirect("http://localhost:3000");
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    //hybrid routes
    "/",
    "/auth/login",
    "/auth/signup",

    //general_user routes
    "/dashboard",
    "/my-profile",

    //seller routes
    "/seller/:page*",

    //buyer routes
    "/buyer/:page*",

    //admin routes
    "/admin/:page*",
  ],
};

/**
 * next auth amader ekta next-auth.session-token provide kore -
 * amader backend amader arekta accessToken
 * tahole project er modhe 2 ta token parallel
 * next auth er token ta amadedr login ta dhore rakhe
 * next auth behaviour hocche eta apni jokhoni reload marben next-auth token ta refresh kore
 * amader backend er accessToken ta ache sheta kintu refresh hocche na
 * tar mane auth token reload marle refresh holeo, accesstoken refresh. ebong accessToken amader login persist kortese
 * tar mane emon ekta time ashbe jokhon amader next auth er token refresh hoye valid hoye jabe but accessToken expire hoye jabe
 * tokhon amader site loggedIn thakbe but data ashbe na
 *
 * so amader strategy hobe:
 * 1. amra check korbo accessToken expire hoye geche kina
 * 2. jodi hoye jay tahole notun kore refresh token generate kore amader access token ta update korte hobe jaate user logged in thakleo data jate ashte pare
 */
