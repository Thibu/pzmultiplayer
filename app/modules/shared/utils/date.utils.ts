export const formatNewsDate = (unixSeconds: number, showHours: boolean = true) => {
    const date = new Date(unixSeconds * 1000)
    const options: Intl.DateTimeFormatOptions = showHours
      ? { dateStyle: 'long', timeStyle: 'short' }
      : { dateStyle: 'long' }
    return new Intl.DateTimeFormat('en-US', options).format(date)
  }

// Returns a breakdown of the duration between two dates
export const getDurationBreakdown = (from: Date, to: Date) => {
  const ms = Math.max(0, to.getTime() - from.getTime())
  const totalSeconds = Math.floor(ms / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return { days, hours, minutes, seconds, totalSeconds }
}

export const getSinceNowBreakdown = (since: Date) => {
  return getDurationBreakdown(since, new Date())
}

export const formatPlural = (value: number, unit: string) => {
  return new Intl.NumberFormat('en-US').format(value) + ' ' + (value !== 1 ? unit + 's' : unit)
}