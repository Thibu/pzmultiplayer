"use client"

import React from 'react'

type StatProps = {
  value: number
  label: string
  className?: string
}

export const Stat: React.FC<StatProps> = ({ value, label, className }) => {
  const padded = Number.isFinite(value) ? value.toString().padStart(2, '0') : '00'
  return (
    <div className={`flex flex-col items-center ${className ?? ''}`}>
      <div className="text-4xl md:text-5xl font-bold tabular-nums drop-shadow-md">
        {padded}
      </div>
      <div className="text-sm md:text-base">{label}</div>
    </div>
  )
}

export default Stat


