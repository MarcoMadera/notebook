import { type CookieMethodsServer, createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/signup", "/forgot", "/login", "/confirm", "/auth"];
const AUTH_RESTRICTED_ROUTES = ["/forgot", "/signup", "/login"];

export async function updateSession(
  request: NextRequest
): Promise<NextResponse<unknown>> {
  let response = NextResponse.next({ request });

  const cookieHandler: CookieMethodsServer = {
    getAll() {
      return request.cookies.getAll();
    },
    setAll(cookiesToSet) {
      cookiesToSet.forEach(({ name, value }) =>
        request.cookies.set(name, value)
      );
      response = NextResponse.next({ request });
      cookiesToSet.forEach(({ name, value, options }) =>
        response.cookies.set(name, value, options)
      );
    },
  };

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: cookieHandler,
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const currentPath = request.nextUrl.pathname;
  const url = request.nextUrl.clone();

  if (
    user &&
    AUTH_RESTRICTED_ROUTES.some((route) => currentPath.startsWith(route))
  ) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (!user && !PUBLIC_ROUTES.some((route) => currentPath.startsWith(route))) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return response;
}
