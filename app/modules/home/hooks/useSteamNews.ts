"use client"

import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchLatestSteamNews, fetchSteamNews } from '../services/home.services'
import { SteamAppNewsResponse } from '../interfaces/steamData.interface'

export const useSteamNews = () => {
  const queryClient = useQueryClient()

  const { data: steamNews, isPending, isFetching } = useQuery({
    queryKey: ['steamNews'],
    queryFn: fetchSteamNews,
    staleTime: Infinity,
    gcTime: 30 * 60 * 1000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  const [latestUnixSeconds, setLatestUnixSeconds] = useState<number | null>(null)

  useEffect(() => {
    if (latestUnixSeconds == null) {
      const initial = steamNews?.appnews.newsitems[0]?.date
      if (initial) setLatestUnixSeconds(initial)
    }
  }, [steamNews, latestUnixSeconds])

  const HEAD_REFETCH_INTERVAL_MS = 300_000

  const { data: latestHead, dataUpdatedAt: latestHeadUpdatedAt } = useQuery({
    queryKey: ['steamNews', 'head'],
    queryFn: fetchLatestSteamNews,
    refetchInterval: HEAD_REFETCH_INTERVAL_MS,
    refetchOnWindowFocus: true,
    refetchOnReconnect: false,
    enabled: !!steamNews,
  })

  useEffect(() => {
    const headItem = latestHead?.appnews.newsitems?.[0]
    const headDate = headItem?.date
    if (headItem && headDate && (latestUnixSeconds == null || headDate > latestUnixSeconds)) {
      setLatestUnixSeconds(headDate)

      queryClient.setQueryData<SteamAppNewsResponse>(['steamNews'], (prev) => {
        if (!prev) return prev
        const alreadyByGid = prev.appnews.newsitems.some(n => String(n.gid) === String(headItem.gid))
        const alreadyByTitleAndContent = prev.appnews.newsitems.some(n => (n.title ?? '') === (headItem.title ?? '') && (n.contents ?? '') === (headItem.contents ?? ''))
        if (alreadyByGid || alreadyByTitleAndContent) return prev
        const nextItems = [headItem, ...prev.appnews.newsitems]
        return {
          ...prev,
          appnews: {
            ...prev.appnews,
            newsitems: nextItems,
            count: nextItems.length,
          },
        }
      })
    }
  }, [latestHead, latestUnixSeconds, queryClient])

  const nextHeadRefetchAtMs = (latestHeadUpdatedAt && latestHeadUpdatedAt > 0
    ? latestHeadUpdatedAt
    : Date.now()) + HEAD_REFETCH_INTERVAL_MS

  return { steamNews, latestUnixSeconds, isPending, isFetching, nextHeadRefetchAtMs }
}

export default useSteamNews


