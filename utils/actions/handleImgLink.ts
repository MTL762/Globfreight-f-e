const baseUrl = process.env.API_IMG_URL;

export default function handleImgUrl(url: string): string {
  return baseUrl + url;
}
