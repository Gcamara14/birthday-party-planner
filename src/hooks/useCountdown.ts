import { useEffect, useState } from 'react'

interface Countdown {
  days: number
  hours: number
  isPast: boolean
}

function calculateCountdown(target: string): Countdown {
  const distance = new Date(target).getTime() - Date.now()
  const totalHours = Math.max(0, Math.floor(distance / (1000 * 60 * 60)))

  return {
    days: Math.floor(totalHours / 24),
    hours: totalHours % 24,
    isPast: distance <= 0,
  }
}

export function useCountdown(target: string): Countdown {
  const [countdown, setCountdown] = useState(() => calculateCountdown(target))

  useEffect(() => {
    const timer = window.setInterval(() => setCountdown(calculateCountdown(target)), 60_000)
    return () => window.clearInterval(timer)
  }, [target])

  return countdown
}
