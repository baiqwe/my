import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { i18n } from "@/lib/i18n-config";

export async function middleware(request: NextRequest) {
  // 1. Update Supabase Session
  const response = await updateSession(request);
  if (response.headers.get("x-middleware-rewrite")) {
    // If supabase middleware rewrites/redirects, we might want to return early or handle it. 
    // For now, let's assume we proceed.
  }

  // 2. Localized Routing Logic
  const pathname = request.nextUrl.pathname;

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // If the pathname is missing a locale, redirect to the default locale (no IP check)
  if (pathnameIsMissingLocale) {
    // Only redirect if it's NOT a special path (already handled by matcher, but good to double check)
    // and if we want to force EVERYTHING to have a locale.
    // The user said "Default language: Force default to en... all internal links default to /en/".
    // So if I visit /quotes/..., it should probably be /en/quotes/...
    // But for the root /, let's redirect to /en

    // Construct the URL with locale
    return NextResponse.redirect(
      new URL(
        `/${i18n.defaultLocale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url
      )
    );
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * - api (API routes often don't need locale)
     */
    "/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
