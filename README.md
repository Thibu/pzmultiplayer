This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Steam News auto-refresh

The app exposes a cached API at `/api/steam-news` that fetches from Steam and serves content to the UI (`app/modules/home/services/home.services.ts`).

### How it works

- The route caches responses in-memory for `STEAM_NEWS_TTL_SECONDS` (default 600s) and tags them with `steam-news` for Next.js tag revalidation.
- A secure endpoint `/api/revalidate/steam-news` accepts `Authorization: Bearer <REVALIDATE_SECRET>` and calls `revalidateTag('steam-news')`, also clearing the in-memory cache.
- The UI calls `/api/steam-news` so fresh data is served after revalidation.

### Required environment variables

Add these to your deployment environment:

```
STEAM_UPSTREAM_NEWS_URL=<full Steam Web API news URL>
STEAM_NEWS_TTL_SECONDS=600
REVALIDATE_SECRET=<random-long-secret>
NEXT_PUBLIC_APP_BASE_URL=https://your-domain.tld
```

Example Steam upstream for Project Zomboid (replace with your app id and params):

```
https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=108600&count=30&feeds=steam_community_announcements
```

### Scheduled revalidation (GitHub Actions)

A workflow `.github/workflows/revalidate-steam-news.yml` invokes the revalidate endpoint every 30 minutes.

Set these repository secrets:

- `APP_BASE_URL` – e.g., `https://pzmultiplayer.example.com`
- `REVALIDATE_SECRET` – must match your `REVALIDATE_SECRET` env in the app

You can also trigger it manually via the workflow dispatch.

### Local testing

After setting env vars, you can refresh cache with:

```
curl -X POST "http://localhost:3000/api/revalidate/steam-news" -H "Authorization: Bearer $REVALIDATE_SECRET"
```
