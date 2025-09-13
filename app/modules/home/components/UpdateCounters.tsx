"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/modules/shared/components/shadcn/card'
import { SteamAppNewsResponse } from '../interfaces/steamData.interface'
import { getDurationBreakdown } from '@/app/modules/shared/utils/date.utils'
import { MANUAL_NEWS_GID } from '@/app/modules/home/config'

interface UpdateCountersProps {
  steamNews: SteamAppNewsResponse
}

const Stat = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="text-2xl font-semibold tabular-nums">{value.toString().padStart(2, '0')}</div>
    <div className="text-xs text-muted-foreground">{label}</div>
  </div>
)

export const UpdateCounters: React.FC<UpdateCountersProps> = ({ steamNews }) => {
  const latestUpdateDate = useMemo(() => {
    const latest = steamNews.appnews.newsitems[0]?.date
    return latest ? new Date(latest * 1000) : null
  }, [steamNews])

  const manualDate = useMemo(() => {
    const trimmedGid = (MANUAL_NEWS_GID || '').trim()
    if (!trimmedGid) return null
    const match = steamNews.appnews.newsitems.find(n => String(n.gid) === trimmedGid)
    return match?.date ? new Date(match.date * 1000) : null
  }, [steamNews])

  const [now, setNow] = useState<Date>(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const latestBreakdown = latestUpdateDate ? getDurationBreakdown(latestUpdateDate, now) : null
  const manualBreakdown = manualDate ? getDurationBreakdown(manualDate, now) : null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="bg-primary text-primary-foreground border-transparent">
        <CardHeader>
          <CardTitle>Depuis la dernière mise à jour</CardTitle>
          <CardDescription className="text-primary-foreground/80">Actualisé chaque seconde</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-primary-foreground/10 rounded-xl px-4 py-3 flex items-center justify-between">
            <Stat value={latestBreakdown?.days ?? 0} label="Jours" />
            <Stat value={latestBreakdown?.hours ?? 0} label="Heures" />
            <Stat value={latestBreakdown?.minutes ?? 0} label="Minutes" />
            <Stat value={latestBreakdown?.seconds ?? 0} label="Secondes" />
          </div>
          <p className="text-primary-foreground/90 text-sm">
            {latestUpdateDate
              ? `Dernière actu: ${latestUpdateDate.toLocaleString('fr-FR')}`
              : "Aucune date trouvée"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Depuis la news sélectionnée</CardTitle>
          <CardDescription>Référence: {manualDate ? manualDate.toLocaleDateString('fr-FR') : 'Aucune sélection'}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted rounded-xl px-4 py-3 flex items-center justify-between">
            <Stat value={manualBreakdown?.days ?? 0} label="Jours" />
            <Stat value={manualBreakdown?.hours ?? 0} label="Heures" />
            <Stat value={manualBreakdown?.minutes ?? 0} label="Minutes" />
            <Stat value={manualBreakdown?.seconds ?? 0} label="Secondes" />
          </div>
          <p className="text-sm text-muted-foreground">Actualisé chaque seconde</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default UpdateCounters


