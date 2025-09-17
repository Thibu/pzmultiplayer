import React from 'react'
import { SteamAppNewsResponse } from '../interfaces/steamData.interface'
import UpdateCounters from '@/app/modules/home/components/UpdateCounters'
import Hero from '@/app/modules/home/components/Hero'
import { NewsContent } from './NewsContent'

export const Home = async () => {

  return (
    <div className="flex flex-col gap-6 md:gap-10">
      <Hero />
      <div className="-mt-2">
        <UpdateCounters />
      </div>
      <div id="news" className="pt-6 md:pt-8">
        <NewsContent />
      </div>
    </div>
  )
}
