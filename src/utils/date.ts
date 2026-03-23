export const getTodayDateKey = () => {
  return new Date().toISOString().slice(0, 10)
}

export const getShiftedDateKey = (dateKey: string, days: number) => {
  const date = new Date(`${dateKey}T00:00:00`)
  date.setDate(date.getDate() + days)
  return date.toISOString().slice(0, 10)
}

export const formatDateLabel = (dateKey: string) => {
  const date = new Date(`${dateKey}T00:00:00`)
  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: 'long',
    weekday: 'long'
  }).format(date)
}
