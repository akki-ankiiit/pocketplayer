import ytdl from '@distube/ytdl-core';

export default async function handler(req, res) {
  // Add CORS headers so we can access it from the frontend if needed (though on Vercel it's same-origin)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).send('Video ID is required');
  }

  try {
    const url = `https://www.youtube.com/watch?v=${id}`;
    const info = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

    res.setHeader('Content-Disposition', `attachment; filename="${id}.mp4"`);
    res.setHeader('Content-Type', 'audio/mp4');

    ytdl(url, { format }).pipe(res);
  } catch (error) {
    console.error('Download error:', error.message);
    res.status(500).send('Error downloading audio');
  }
}
