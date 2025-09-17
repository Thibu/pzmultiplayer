import { NextResponse } from "next/server";

export async function GET() {
  try {
    const upstream = process.env.STEAM_UPSTREAM_NEWS_URL || "";
    if (!upstream) {
      return NextResponse.json({ error: "STEAM_UPSTREAM_NEWS_URL is not configured" }, { status: 500 });
    }

    const res = await fetch(upstream, { cache: "no-store" });
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


