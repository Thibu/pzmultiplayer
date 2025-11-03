"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/modules/shared/components/shadcn/card'
import { Skeleton } from '@/app/modules/shared/components/shadcn/skeleton'

export const CountersSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="bg-primary text-primary-foreground border-transparent shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">
            <Skeleton className="h-6 w-48 bg-primary-foreground/20" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-primary-foreground/10 rounded-xl px-6 py-8 flex items-center justify-between">
            <Skeleton className="h-14 w-16" />
            <Skeleton className="h-14 w-16" />
            <Skeleton className="h-14 w-16" />
            <Skeleton className="h-14 w-16" />
          </div>
          <Skeleton className="h-4 w-56 bg-primary-foreground/20" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">
            <Skeleton className="h-6 w-80" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted rounded-xl px-6 py-8 flex items-center justify-between">
            <Skeleton className="h-14 w-16" />
            <Skeleton className="h-14 w-16" />
            <Skeleton className="h-14 w-16" />
            <Skeleton className="h-14 w-16" />
          </div>
          <Skeleton className="h-4 w-48" />
        </CardContent>
      </Card>
      <Card className=" border-primary shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">
            <Skeleton className="h-6 w-72" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted rounded-xl px-6 py-8 flex items-center justify-between">
            <Skeleton className="h-14 w-16" />
            <Skeleton className="h-14 w-16" />
            <Skeleton className="h-14 w-16" />
            <Skeleton className="h-14 w-16" />
          </div>
          <Skeleton className="h-4 w-40" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">
            <Skeleton className="h-6 w-80" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted rounded-xl px-6 py-8 flex items-center justify-between">
            <Skeleton className="h-14 w-16" />
            <Skeleton className="h-14 w-16" />
            <Skeleton className="h-14 w-16" />
            <Skeleton className="h-14 w-16" />
          </div>
          <Skeleton className="h-4 w-40" />
        </CardContent>
      </Card>
    </div>
  )
}

export default CountersSkeleton


