import { type NextRequest, type NextResponse } from "next/server";

import { validateTheme } from "./utils";

import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(
  request: NextRequest
): Promise<NextResponse<unknown>> {
  const response = await updateSession(request);

  const searchParams = request.nextUrl.searchParams.toString();

  response.headers.set("x-url", request.nextUrl.href);
  response.headers.set("x-search-params", searchParams);

  if (!request.cookies.has("theme")) {
    const preferredColorScheme = request.headers.get(
      "sec-ch-prefers-color-scheme"
    );
    response.cookies.set("notes-theme", validateTheme(preferredColorScheme));
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
