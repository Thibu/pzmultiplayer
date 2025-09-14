import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { broadcastEvent } from "@/app/modules/shared/lib/sseBus";

function isAuthorized(req: Request): boolean {
  const authHeader = req.headers.get("authorization") || "";
  const expected = process.env.REVALIDATE_SECRET || "";
  if (!expected) return false;
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
  return token === expected;
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    revalidateTag("steam-news");
    // eslint-disable-next-line no-console
    console.log("[SSE] broadcasting steam-news-updated")
    broadcastEvent("steam-news-updated");
    // Also clear in-memory cache by calling the route's POST handler via internal fetch
    const baseUrl = process.env.NEXT_PUBLIC_APP_BASE_URL;
    if (baseUrl) {
      // Fire and forget
      fetch(`${baseUrl}/api/steam-news`, { method: "POST" }).catch(() => {});
    }
    return NextResponse.json({ revalidated: true, tag: "steam-news" });
  } catch {
    return NextResponse.json({ error: "Failed to revalidate" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  // Convenience for curl without specifying method
  return POST(req);
}


