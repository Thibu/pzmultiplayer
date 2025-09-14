"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function NewsRefresher() {
  const router = useRouter()

  useEffect(() => {
    const source = new EventSource("/api/events")

    const onUpdate = () => {
      console.log("[SSE] steam-news-updated received → refreshing UI")
      // Re-fetch server components
      router.refresh()
    }

    source.addEventListener("steam-news-updated", onUpdate)
    source.onopen = () => {
      console.log("[SSE] connected to /api/events")
    }
    source.onerror = (e) => {
      console.error("[SSE] connection error", e)
    }
    // Optional: also react on connect to ensure first mount aligns
    // source.onopen = () => {}

    return () => {
      source.removeEventListener("steam-news-updated", onUpdate)
      source.close()
    }
  }, [router])

  return null
}


