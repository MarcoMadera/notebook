import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/signup", "/forgot", "/login", "/confirm", "/auth"];
const AUTH_RESTRICTED_ROUTES = ["/forgot", "/signup", "/login"];

interface CookieHandler {
  getAll: () => ReturnType<NextRequest["cookies"]["getAll"]>;
  setAll: (
    cookies: Array<{ name: string; value: string; options?: any }>
  ) => void;
}

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const cookieHandler: CookieHandler = {
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
