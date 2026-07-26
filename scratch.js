async function searchYoutube(query) {
  try {
    const url = `https://html.duckduckgo.com/html/?q=site:youtube.com+${encodeURIComponent(query)}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    });
    const text = await res.text();
    const match = text.match(/v=([a-zA-Z0-9_-]{11})/);
    if (match) {
      console.log(`[${query}] Found ID: ${match[1]}`);
      return match[1];
    }
    console.log(`[${query}] No ID found.`);
    return null;
  } catch (e) {
    console.error(e);
  }
}

searchYoutube("The Weeknd Blinding Lights official music video");
searchYoutube("Anne Marie 2002 official video");
