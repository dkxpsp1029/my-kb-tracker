// api/fetch.js
export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const response = await fetch(url);
    const html = await response.text();
    
    // 1. 대표 이미지 주소 찾기 (간단한 예시)
    const imgMatch = html.match(/<img[^>]+src="([^">]+)"/);
    const image = imgMatch ? imgMatch[1] : null;

    // 2. 본문 요약 (첫 300자)
    // 실제 Geekhack 구조에 맞춰 데이터를 가공합니다.
    const content = html.replace(/<[^>]*>?/gm, '').substring(0, 300) + "...";

    res.status(200).json({ image, content });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}