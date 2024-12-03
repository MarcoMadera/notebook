import { type NextRequest, type NextResponse } from "next/server";

import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(
  request: NextRequest
): Promise<NextResponse<unknown>> {
  const response = await updateSession(request);

  if (!request.cookies.has("theme")) {
    const prefersDark =
      request.headers.get("sec-ch-prefers-color-scheme") === "dark";
    response.cookies.set("theme", prefersDark ? "dark" : "light");
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
