function toHoursAndMinutes(totalMinutes: number) {
  if (totalMinutes) {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`
  }

  return ''
}

export { toHoursAndMinutes }
