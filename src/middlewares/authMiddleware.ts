import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

const publicRoutes = [
  { path: "/", whenAuthenticated: "next" },
  { path: "/login", whenAuthenticated: "redirect" },
  { path: "/logout", whenAuthenticated: "redirect" },
  { path: "/signup", whenAuthenticated: "redirect" },
  { path: "/reset", whenAuthenticated: "redirect" },
] as const;

const REDIRECT_URL = "/login";

export async function authMiddleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const publicRoute = publicRoutes.find((route) => route.path === path);
  // const token = req.cookies.get("sb-jqjgactnasscdulmmlpk-auth-token.0");
  const token = req.headers.get("Authorization")?.split(" ")[1];
  const supabase = await createClient();
  const { data: user, error } = await supabase.auth.getUser(token);

  if (error && publicRoute) {
    console.log("Token not found but the route is public");
    return NextResponse.next();
  }

  if (error && !publicRoute) {
    console.log("Token not found and the route is not public");
    return NextResponse.redirect(new URL(REDIRECT_URL, req.url));
  }

  if (!error && publicRoute && publicRoute.whenAuthenticated === "redirect") {
    console.log("Token found but the route is public");
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!error && !publicRoute) {
    console.log("Token found and the route is not public");
    // Validar se o JWT esta expirado
    // Se estiver expirado, redirecionar para a tela de login

    return NextResponse.next();
  }

  return NextResponse.next();
}
