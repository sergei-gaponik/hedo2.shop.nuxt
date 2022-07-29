export function s3AssetUrl(src: string): string {
  if (src[0] == "/") return process.env.STORAGE_URL + src;
  else return process.env.STORAGE_URL + "/" + src;
}
