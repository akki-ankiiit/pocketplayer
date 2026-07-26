const express = require('express');
const cors = require('cors');
const ytdl = require('@distube/ytdl-core');

const app = express();
app.use(cors());

app.get('/download/:videoId', async (req, res) => {
  const videoId = req.params.videoId;
  if (!videoId) {
    return res.status(400).send('No videoId provided');
  }

  try {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    const info = await ytdl.getInfo(url);
    
    // Choose the best audio format
    const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
    
    res.header('Content-Disposition', `attachment; filename="${videoId}.mp4"`);
    res.header('Content-Type', 'audio/mp4');
    
    ytdl(url, { format }).pipe(res);
  } catch (error) {
    console.error('Download error:', error);
    if (!res.headersSent) {
      res.status(500).send('Error downloading video');
    }
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Download server running on http://localhost:${PORT}`);
});
