"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/modules/shared/components/shadcn/card'
import { formatNewsDate, getDurationBreakdown } from '@/app/modules/shared/utils/date.utils'
import { EARLY_ACCESS_UTC_MS, MANUAL_NEWS_GID } from '@/app/modules/home/config'
import Stat from '@/app/modules/shared/components/Stat'
import useSteamNews from '@/app/modules/home/hooks/useSteamNews'
import CountersSkeleton from './skeleton/CountersSkeleton'

export const UpdateCounters = () => {
  const { steamNews, latestUnixSeconds, isPending, nextHeadRefetchAtMs } = useSteamNews()

  const latestUpdateDate = useMemo(() => {
    return latestUnixSeconds ? new Date(latestUnixSeconds * 1000) : null
  }, [latestUnixSeconds])

  const manualDate = useMemo(() => {
    const trimmedGid = (MANUAL_NEWS_GID || '').trim()
    if (!trimmedGid || !steamNews) return null
    const match = steamNews.appnews.newsitems.find(n => String(n.gid) === trimmedGid)
    return match?.date ? new Date(match.date * 1000) : null
  }, [steamNews])

  const [now, setNow] = useState<Date>(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const earlyAccessDate = useMemo(() => new Date(EARLY_ACCESS_UTC_MS), [])

  const latestBreakdown = latestUpdateDate ? getDurationBreakdown(latestUpdateDate, now) : null
  const nextRefetchRemainingMs = Math.max(0, (nextHeadRefetchAtMs ?? Date.now()) - now.getTime())
  const nextRefetchTotalSeconds = Math.floor(nextRefetchRemainingMs / 1000)
  const nextRefetchMinutes = Math.floor(nextRefetchTotalSeconds / 60)
  const nextRefetchSeconds = nextRefetchTotalSeconds % 60
  // const detection = useMemo(() => detectMultiplayerFromNews(steamNews), [steamNews])
  // const multiDate = detection.introduced && detection.introducedAt ? detection.introducedAt : null
  // const multiBreakdown = multiDate ? getDurationBreakdown(multiDate, now) : null
  const manualBreakdown = manualDate ? getDurationBreakdown(manualDate, now) : null
  const earlyAccessBreakdown = earlyAccessDate ? getDurationBreakdown(earlyAccessDate, now) : null

  if (isPending || (latestBreakdown == null )) {
    return <CountersSkeleton />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="bg-primary text-primary-foreground border-transparent shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">Since the latest update</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-primary-foreground/10 rounded-xl px-6 py-5 flex items-center justify-between">
            <Stat value={latestBreakdown?.days ?? 0} label="Days" />
            <Stat value={latestBreakdown?.hours ?? 0} label="Hours" />
            <Stat value={latestBreakdown?.minutes ?? 0} label="Minutes" />
            <Stat value={latestBreakdown?.seconds ?? 0} label="Seconds" />
          </div>
          <div className="flex justify-between">
            <p className="text-primary-foreground/90 text-sm">
              {latestUpdateDate
                ? `Last news: ${formatNewsDate(latestUpdateDate.getTime() / 1000)}`
                : "No date found"}
            </p>
            <p className="text-primary-foreground/90 text-sm">Next check in {String(nextRefetchMinutes).padStart(2, '0')}:{String(nextRefetchSeconds).padStart(2, '0')}</p>
          </div>
        </CardContent>
      </Card>

      {/* {multiDate ? (
        <Card className="border-green-600">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl">Since multiplayer was added</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted rounded-xl px-6 py-5 flex items-center justify-between">
              <Stat value={multiBreakdown?.days ?? 0} label="Days" />
              <Stat value={multiBreakdown?.hours ?? 0} label="Hours" />
              <Stat value={multiBreakdown?.minutes ?? 0} label="Minutes" />
              <Stat value={multiBreakdown?.seconds ?? 0} label="Seconds" />
            </div>
            <p className="text-sm">
              Introduced: {formatNewsDate(multiDate.getTime() / 1000)}
            </p>
          </CardContent>
        </Card>
      ) : ( */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl">Since the release of version BETA 42 and NO MULTIPLAYER</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted rounded-xl px-6 py-5 flex items-center justify-between">
              {((manualBreakdown?.years ?? 0) > 0) && (
                <Stat value={manualBreakdown?.years ?? 0} label="Years" />
              )}
              <Stat value={manualBreakdown?.days ?? 0} label="Days" />
              <Stat value={manualBreakdown?.hours ?? 0} label="Hours" />
              <Stat value={manualBreakdown?.minutes ?? 0} label="Minutes" />
              <Stat value={manualBreakdown?.seconds ?? 0} label="Seconds" />
            </div>
            <p className="text-sm">
              {manualDate
                ? `Release date: ${formatNewsDate(manualDate.getTime() / 1000)}`
                : "No date found"}
            </p>
          </CardContent>
        </Card>
      {/* )} */}
      <div/>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">Since the release of Early Access</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted rounded-xl px-6 py-5 flex items-center justify-between">
            <Stat value={earlyAccessBreakdown?.years ?? 0} label="Years" />
            <Stat value={earlyAccessBreakdown?.days ?? 0} label="Days" />
            <Stat value={earlyAccessBreakdown?.hours ?? 0} label="Hours" />
            <Stat value={earlyAccessBreakdown?.minutes ?? 0} label="Minutes" />
            <Stat value={earlyAccessBreakdown?.seconds ?? 0} label="Seconds" />
          </div>
          <p className="text-sm">
            Release date: {formatNewsDate(earlyAccessDate.getTime() / 1000, false)}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default UpdateCounters


