
export function s3AssetUrl(src: string): string{
  return process.env.STORAGE_URL + "/" + src
}