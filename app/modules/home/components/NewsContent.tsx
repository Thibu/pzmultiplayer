"use client"

import React from 'react'
import { formatNewsDate } from '../../shared/utils/date.utils'
import { formatSteamContent } from '../../shared/utils/textFormat.utils'
import { NewsItem, SteamAppNewsResponse } from '../interfaces/steamData.interface'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/app/modules/shared/components/shadcn/accordion'

interface NewsContentProps {
  steamNews: SteamAppNewsResponse
}

export const NewsContent = ({ steamNews }: NewsContentProps) => {
  return (
    <Accordion type="single" collapsible>
      {steamNews.appnews.newsitems.map((news: NewsItem) => (
        <AccordionItem key={news.gid} value={String(news.gid)}>
          <AccordionTrigger className="text-base">
            <div className="flex flex-col gap-1">
              <span className="font-semibold">{news.title}</span>
              <span className="text-muted-foreground text-xs">{formatNewsDate(news.date)}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div dangerouslySetInnerHTML={{ __html: formatSteamContent(news.contents) }} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
