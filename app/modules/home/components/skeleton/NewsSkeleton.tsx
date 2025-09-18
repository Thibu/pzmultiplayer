"use client"

import React from 'react'
import { Accordion } from '@/app/modules/shared/components/shadcn/accordion'
import { Skeleton } from '@/app/modules/shared/components/shadcn/skeleton'

export const NewsSkeleton: React.FC = () => {
  return (
    <div className='w-full space-y-3'>
      {/* Render a few skeleton accordion items */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className='bg-gradient-to-b from-secondary/95 to-secondary/90 text-primary-foreground rounded-lg shadow-lg border-b-0 p-4'>
          <div className='flex flex-col gap-1'>
            <Skeleton className='h-5 w-3/5 bg-secondary-foreground/30' />
            <Skeleton className='h-3 w-24 bg-secondary-foreground/20' />
          </div>
          <div className='mt-3 space-y-2'>
            <Skeleton className='h-3 w-full bg-secondary-foreground/15' />
            <Skeleton className='h-3 w-11/12 bg-secondary-foreground/15' />
            <Skeleton className='h-3 w-4/5 bg-secondary-foreground/15' />
          </div>
        </div>
      ))}
    </div>
  )
}

export default NewsSkeleton


