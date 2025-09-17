import React from 'react'
import { SteamAppNewsResponse } from '../interfaces/steamData.interface'
import UpdateCounters from '@/app/modules/home/components/UpdateCounters'
import Hero from '@/app/modules/home/components/Hero'
import { NewsContent } from './NewsContent'

interface HomeProps {
  steamNews: SteamAppNewsResponse
}

export const Home = async ({ steamNews }: HomeProps) => {

  return (
    <div className="flex flex-col gap-10 md:gap-14">
      <Hero />
      <div className="-mt-2">
        <UpdateCounters steamNews={steamNews} />
      </div>
      <div id="news" className="pt-8 md:pt-16">
        <NewsContent steamNews={steamNews} />
      </div>
    </div>
  )
}
