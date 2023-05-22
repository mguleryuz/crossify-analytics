export function compressAddress(address?: string) {
  if (!address) return '...'
  return address.slice(0, 4) + '...' + address.slice(-4)
}

export function firstLetterToUpper(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}
