import { NextResponse } from "next/server";

// Simple in-memory cache for edge/runtime without external storage
// For production with multiple servers, replace with Redis/Upstash/KV
let cachedResponse: unknown | null = null;
let cachedAtMs: number | null = null;

// 10 minutes default stale time; overridden via STEAM_NEWS_TTL_SECONDS
const DEFAULT_TTL_SECONDS = 600;

function getTtlMs(): number {
  const envTtl = Number(process.env.STEAM_NEWS_TTL_SECONDS || DEFAULT_TTL_SECONDS);
  return (Number.isFinite(envTtl) && envTtl > 0 ? envTtl : DEFAULT_TTL_SECONDS) * 1000;
}

export async function GET() {
  try {
    const now = Date.now();
    const ttlMs = getTtlMs();

    if (cachedResponse && cachedAtMs && now - cachedAtMs < ttlMs) {
      return NextResponse.json(cachedResponse, {
        headers: { "Cache-Control": `public, s-maxage=${Math.floor(ttlMs / 1000)}, stale-while-revalidate=60` },
      });
    }

    const upstream = process.env.STEAM_UPSTREAM_NEWS_URL || "";
    if (!upstream) {
      return NextResponse.json({ error: "STEAM_UPSTREAM_NEWS_URL is not configured" }, { status: 500 });
    }

    const res = await fetch(upstream, { next: { revalidate: 60, tags: ["steam-news"] } });
    if (!res.ok) {
      return NextResponse.json({ error: `Upstream error ${res.status}` }, { status: 502 });
    }
    const data = await res.json();

    cachedResponse = data;
    cachedAtMs = now;

    return NextResponse.json(data, {
      headers: { "Cache-Control": `public, s-maxage=${Math.floor(ttlMs / 1000)}, stale-while-revalidate=60` },
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch Steam news" }, { status: 500 });
  }
}

export async function POST() {
  // Allow POST to trigger refresh (used internally/testing); no auth here - use revalidate endpoint for secure external
  cachedResponse = null;
  cachedAtMs = null;
  return NextResponse.json({ ok: true, message: "Cache cleared" });
}


