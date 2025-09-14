"use client"

import React from 'react'
import { formatNewsDate } from '../../shared/utils/date.utils'
import { preprocessSteamBBCode } from '../../shared/utils/bbcode.utils'
import { NewsItem, SteamAppNewsResponse } from '../interfaces/steamData.interface'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/app/modules/shared/components/shadcn/accordion'
import BBCode from '@bbob/react'
import reactPreset from '@bbob/preset-react'

interface NewsContentProps {
  steamNews: SteamAppNewsResponse
}

export const NewsContent = ({ steamNews }: NewsContentProps) => {
  return (
    <Accordion type="single" collapsible className='w-full space-y-3'>
      {steamNews.appnews.newsitems.map((news: NewsItem) => (
        <AccordionItem key={news.gid} value={String(news.gid)} className='bg-gradient-to-b from-secondary/95 to-secondary/90 text-primary-foreground rounded-lg shadow-lg border-b-0'>
          <AccordionTrigger className="text-secondary-foreground">
            <div className="flex flex-col gap-1 px-4">
              <span className="font-semibold">{news.title}</span>
              <span className="text-secondary-foreground/80 text-xs font-mono">{formatNewsDate(news.date)}</span>
            </div>
          </AccordionTrigger> 
          <AccordionContent>
            <div className="px-4 pb-4 text-secondary-foreground whitespace-pre-wrap leading-tight">
              <BBCode plugins={[reactPreset()]} options={{ caseFreeTags: true }}>
                {preprocessSteamBBCode(news.contents)}
              </BBCode>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
