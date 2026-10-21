import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
  useRouter,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";
import { business, seo } from "@/config/business";

const FONTS =
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..600&family=IBM+Plex+Mono:wght@400;500&family=Manrope:wght@400;500;600;700&display=swap";

function buildHead() {
  const canonical = seo.siteUrl ? `${seo.siteUrl}/` : "";
  const ogImage = seo.siteUrl ? `${seo.siteUrl}${seo.ogImagePath}` : "";
  return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: seo.title },
      { name: "description", content: seo.description },
      { name: "theme-color", content: "#121212" },
      ...(seo.indexable ? [] : [{ name: "robots", content: "noindex, nofollow" }]),
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: business.name },
      { property: "og:title", content: seo.title },
      { property: "og:description", content: seo.description },
      ...(canonical ? [{ property: "og:url", content: canonical }] : []),
      ...(ogImage
        ? [
            { property: "og:image", content: ogImage },
            { property: "og:image:alt", content: seo.ogImageAlt },
          ]
        : []),
      { name: "twitter:card", content: ogImage ? "summary_large_image" : "summary" },
      { name: "twitter:title", content: seo.title },
      { name: "twitter:description", content: seo.description },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" as const },
      { rel: "stylesheet", href: FONTS },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      ...(canonical ? [{ rel: "canonical", href: canonical }] : []),
    ],
  };
}

export const Route = createRootRoute({
  head: buildHead,
  shellComponent: RootShell,
  component: Outlet,
  notFoundComponent: NotFound,
  errorComponent: RouteError,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    // `motion` is added to <html> on the client once scroll reveals are active.
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function Shell({ title, body, children }: { title: string; body: string; children: ReactNode }) {
  return (
    <main className="on-dark flex min-h-screen items-center bg-ink px-6 text-ivory">
      <div className="mx-auto w-full max-w-3xl">
        <p className="annot text-accent-soft">{business.name}</p>
        <h1 className="mt-6 font-display text-[clamp(3rem,10vw,7rem)] font-light leading-[0.9]">
          {title}
        </h1>
        <p className="mt-6 max-w-md text-stone">{body}</p>
        <div className="mt-10 flex flex-wrap gap-3">{children}</div>
      </div>
    </main>
  );
}

function NotFound() {
  return (
    <Shell title="Blank wall." body="The page you're looking for doesn't exist or has been moved.">
      <Link to="/" className="btn btn-accent">
        Back to the studio
      </Link>
    </Shell>
  );
}

function RouteError({ error, reset }: ErrorComponentProps) {
  const router = useRouter();
  console.error(error);
  return (
    <Shell
      title="Something smudged."
      body="This page didn't load properly. Try again, or head back to the home page."
    >
      <button
        type="button"
        className="btn btn-accent"
        onClick={() => {
          void router.invalidate();
          reset();
        }}
      >
        Try again
      </button>
      <a href="/" className="btn btn-outline">
        Go home
      </a>
    </Shell>
  );
}
