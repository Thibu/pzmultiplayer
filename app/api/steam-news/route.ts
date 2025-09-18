import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const upstream = process.env.STEAM_UPSTREAM_NEWS_URL || "";
    if (!upstream) {
      return NextResponse.json({ error: "STEAM_UPSTREAM_NEWS_URL is not configured" }, { status: 500 });
    }

    // Forward incoming query params (e.g., count=1) to the upstream URL
    const outbound = new URL(upstream);
    // Preserve existing upstream params, then overlay request params
    req.nextUrl.searchParams.forEach((value, key) => {
      outbound.searchParams.set(key, value);
    });

    const res = await fetch(outbound.toString(), { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({ error: `Upstream error ${res.status}` }, { status: 502 });
    }
    const data = await res.json();

    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch Steam news" }, { status: 500 });
  }
}

// Removed POST-based cache clearing; automatic update endpoints were removed


