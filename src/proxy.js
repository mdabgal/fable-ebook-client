


import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { pathname } = request.nextUrl;

  
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

 
  if (
    pathname.startsWith("/dashboard/writer") &&
    session.user.role === "writer" &&
    session.user.writerVerified === false //
  ) {
    return NextResponse.redirect(new URL("/pricing", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/dashboard/writer/:path*"],
};