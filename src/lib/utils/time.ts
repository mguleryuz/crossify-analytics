export const currentUnixTime = () => Math.floor(new Date().getTime() / 1000)

export function numberToDate(date?: number) {
  if (!date) return '...'
  return new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(date * 1000)
}
