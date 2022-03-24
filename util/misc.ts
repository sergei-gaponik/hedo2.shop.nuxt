
export function toDateString(time: number): string{
  if(time)
    return new Date(time).toLocaleDateString("de-DE")
  else
    return ""
}