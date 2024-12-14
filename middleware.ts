import { type NextRequest, type NextResponse } from "next/server";

import { Theme } from "./constants/theme";
import { validateTheme } from "./utils";

import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(
  request: NextRequest
): Promise<NextResponse<unknown>> {
  const response = await updateSession(request);
  response.headers.set("Accept-CH", "Sec-CH-Prefers-Color-Scheme");

  const searchParams = request.nextUrl.searchParams.toString();

  response.headers.set("x-url", request.nextUrl.href);
  response.headers.set("x-search-params", searchParams);

  if (!request.cookies.has("notes-theme")) {
    const preferredColorScheme = request.headers.get(
      "Sec-CH-Prefers-Color-Scheme"
    );
    response.cookies.set("notes-theme", validateTheme(preferredColorScheme));
  }

  if (request.cookies.get("notes-theme")?.value === Theme.SYSTEM) {
    const preferredColorScheme = request.headers.get(
      "Sec-CH-Prefers-Color-Scheme"
    );
    response.cookies.set("system-theme", validateTheme(preferredColorScheme));
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
