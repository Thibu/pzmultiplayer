import React from 'react'
import { SteamAppNewsResponse } from '../interfaces/steamData.interface'
import UpdateCounters from '@/app/modules/home/components/UpdateCounters'
import { NewsContent } from './NewsContent'

interface HomeProps {
  steamNews: SteamAppNewsResponse
}

export const Home = async ({ steamNews }: HomeProps) => {

  return (
    <div className="flex flex-col gap-8">
      <UpdateCounters steamNews={steamNews} />
      <NewsContent steamNews={steamNews} />
    </div>
  )
}
