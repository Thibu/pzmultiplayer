"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/modules/shared/components/shadcn/card'
// removed unused SteamAppNewsResponse import
import { formatNewsDate, getDurationBreakdown } from '@/app/modules/shared/utils/date.utils'
import { MANUAL_NEWS_GID } from '@/app/modules/home/config'
import { useQuery } from '@tanstack/react-query'
import { fetchSteamNews } from '@/app/modules/home/services/home.services'
import { detectMultiplayerFromNews } from '@/app/modules/home/services/multiplayerDetection.service'

const Stat = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="text-4xl md:text-5xl font-bold tabular-nums drop-shadow-md">
      {value.toString().padStart(2, '0')}
    </div>
    <div className="text-sm md:text-base">{label}</div>
  </div>
)

export const UpdateCounters = () => {
  const { data: steamNews } = useQuery({
    queryKey: ['steamNews'],
    queryFn: fetchSteamNews,
    refetchInterval: 60_000,
  })
  const latestUpdateDate = useMemo(() => {
    const latest = steamNews?.appnews.newsitems[0]?.date
    return latest ? new Date(latest * 1000) : null
  }, [steamNews])

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

  const earlyAccessDate = useMemo(() => new Date(Date.UTC(2013, 10, 8, 0, 0, 0)), [])

  const latestBreakdown = latestUpdateDate ? getDurationBreakdown(latestUpdateDate, now) : null
  const detection = useMemo(() => detectMultiplayerFromNews(steamNews), [steamNews])
  const multiDate = detection.introduced && detection.introducedAt ? detection.introducedAt : null
  const multiBreakdown = multiDate ? getDurationBreakdown(multiDate, now) : null
  const manualBreakdown = manualDate ? getDurationBreakdown(manualDate, now) : null
  const earlyAccessBreakdown = earlyAccessDate ? getDurationBreakdown(earlyAccessDate, now) : null

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
          <p className="text-primary-foreground/90 text-sm">
            {latestUpdateDate
              ? `Last news: ${formatNewsDate(latestUpdateDate.getTime() / 1000)}`
              : "No date found"}
          </p>
        </CardContent>
      </Card>

      {multiDate ? (
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
      ) : (
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
      )}
      <div>
      </div>
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


