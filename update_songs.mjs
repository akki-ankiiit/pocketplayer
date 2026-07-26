import fs from 'fs';
import ytSearch from 'yt-search';

const songs = [
  // The Weeknd
  { title: "Blinding Lights", artist: "The Weeknd", playlist: "Pop Hits" },
  { title: "Save Your Tears", artist: "The Weeknd", playlist: "Pop Hits" },
  { title: "Starboy", artist: "The Weeknd", playlist: "R&B Classics" },
  { title: "Call Out My Name", artist: "The Weeknd", playlist: "R&B Classics" },
  { title: "The Hills", artist: "The Weeknd", playlist: "R&B Classics" },
  { title: "Can't Feel My Face", artist: "The Weeknd", playlist: "Pop Hits" },
  { title: "Die For You", artist: "The Weeknd", playlist: "R&B Classics" },
  { title: "Earned It", artist: "The Weeknd", playlist: "R&B Classics" },
  { title: "I Feel It Coming", artist: "The Weeknd", playlist: "Pop Hits" },
  { title: "In Your Eyes", artist: "The Weeknd", playlist: "Dance" },
  { title: "Out of Time", artist: "The Weeknd", playlist: "R&B Classics" },
  { title: "Reminder", artist: "The Weeknd", playlist: "R&B Classics" },
  { title: "Often", artist: "The Weeknd", playlist: "R&B Classics" },
  { title: "Creepin'", artist: "The Weeknd", playlist: "R&B Classics" },
  { title: "Heartless", artist: "The Weeknd", playlist: "R&B Classics" },
  { title: "Party Monster", artist: "The Weeknd", playlist: "R&B Classics" },
  { title: "Is There Someone Else?", artist: "The Weeknd", playlist: "R&B Classics" },
  { title: "Moth To A Flame", artist: "The Weeknd", playlist: "Dance" },
  { title: "Take My Breath", artist: "The Weeknd", playlist: "Dance" },
  { title: "Less Than Zero", artist: "The Weeknd", playlist: "Pop Hits" },
  // Anne-Marie
  { title: "2002", artist: "Anne-Marie", playlist: "Pop Hits" },
  { title: "FRIENDS", artist: "Anne-Marie", playlist: "Pop Hits" },
  { title: "Ciao Adios", artist: "Anne-Marie", playlist: "Pop Hits" },
  { title: "Alarm", artist: "Anne-Marie", playlist: "Pop Hits" },
  { title: "ROCKABYE", artist: "Anne-Marie", playlist: "Dance" },
  { title: "Don't Play", artist: "Anne-Marie", playlist: "Dance" },
  { title: "Our Song", artist: "Anne-Marie", playlist: "Pop Hits" },
  { title: "Kiss My (Uh Oh)", artist: "Anne-Marie", playlist: "Pop Hits" },
  { title: "Rewrite The Stars", artist: "Anne-Marie", playlist: "Pop Hits" },
  { title: "Unhealthy", artist: "Anne-Marie", playlist: "Pop Hits" },
  // Arijit Singh
  { title: "Tum Hi Ho", artist: "Arijit Singh", playlist: "Bollywood Vibes" },
  { title: "Channa Mereya", artist: "Arijit Singh", playlist: "Bollywood Vibes" },
  { title: "Kesariya", artist: "Arijit Singh", playlist: "Bollywood Vibes" },
  { title: "Agar Tum Saath Ho", artist: "Arijit Singh", playlist: "Bollywood Vibes" },
  { title: "Raabta", artist: "Arijit Singh", playlist: "Bollywood Vibes" },
  { title: "Shayad", artist: "Arijit Singh", playlist: "Bollywood Vibes" },
  { title: "Hawayein", artist: "Arijit Singh", playlist: "Bollywood Vibes" },
  { title: "Kalank", artist: "Arijit Singh", playlist: "Bollywood Vibes" },
  { title: "Phir Le Aya Dil", artist: "Arijit Singh", playlist: "Bollywood Vibes" },
  { title: "Apna Bana Le", artist: "Arijit Singh", playlist: "Bollywood Vibes" },
  { title: "Tujhe Kitna Chahne Lage", artist: "Arijit Singh", playlist: "Bollywood Vibes" },
  { title: "Galti Se Mistake", artist: "Arijit Singh", playlist: "Bollywood Vibes" },
  { title: "Zaalima", artist: "Arijit Singh", playlist: "Bollywood Vibes" },
  { title: "Tera Ban Jaunga", artist: "Arijit Singh", playlist: "Bollywood Vibes" },
  { title: "Khairiyat", artist: "Arijit Singh", playlist: "Bollywood Vibes" },
  { title: "Pal", artist: "Arijit Singh", playlist: "Bollywood Vibes" },
  { title: "Ae Dil Hai Mushkil", artist: "Arijit Singh", playlist: "Bollywood Vibes" },
  { title: "Ve Maahi", artist: "Arijit Singh", playlist: "Bollywood Vibes" },
  { title: "Ilahi", artist: "Arijit Singh", playlist: "Bollywood Vibes" },
  { title: "Kabira", artist: "Arijit Singh", playlist: "Bollywood Vibes" },
  // Justin Bieber
  { title: "Peaches", artist: "Justin Bieber", playlist: "Pop Hits" },
  { title: "Stay", artist: "Justin Bieber", playlist: "Pop Hits" },
  { title: "Sorry", artist: "Justin Bieber", playlist: "Dance" },
  { title: "Love Yourself", artist: "Justin Bieber", playlist: "Pop Hits" },
  { title: "What Do You Mean?", artist: "Justin Bieber", playlist: "Pop Hits" },
  { title: "Baby", artist: "Justin Bieber", playlist: "Pop Hits" },
  { title: "Intentions", artist: "Justin Bieber", playlist: "Pop Hits" },
  { title: "Ghost", artist: "Justin Bieber", playlist: "Pop Hits" },
  { title: "Yummy", artist: "Justin Bieber", playlist: "R&B Classics" },
  { title: "Holy", artist: "Justin Bieber", playlist: "Pop Hits" },
  { title: "Anyone", artist: "Justin Bieber", playlist: "Pop Hits" },
  { title: "Lonely", artist: "Justin Bieber", playlist: "Pop Hits" },
  { title: "Let Me Love You", artist: "Justin Bieber", playlist: "Dance" },
  { title: "I'm The One", artist: "Justin Bieber", playlist: "Dance" },
  { title: "Despacito", artist: "Justin Bieber", playlist: "Dance" },
  // Dua Lipa
  { title: "Levitating", artist: "Dua Lipa", playlist: "Pop Hits" },
  { title: "Don't Start Now", artist: "Dua Lipa", playlist: "Dance" },
  { title: "New Rules", artist: "Dua Lipa", playlist: "Pop Hits" },
  { title: "One Kiss", artist: "Dua Lipa", playlist: "Dance" },
  { title: "Physical", artist: "Dua Lipa", playlist: "Dance" },
  { title: "Break My Heart", artist: "Dua Lipa", playlist: "Pop Hits" },
  { title: "Cold Heart", artist: "Dua Lipa", playlist: "Dance" },
  { title: "Dance The Night", artist: "Dua Lipa", playlist: "Dance" },
  { title: "IDGAF", artist: "Dua Lipa", playlist: "Pop Hits" },
  { title: "Love Again", artist: "Dua Lipa", playlist: "Pop Hits" },
  { title: "Electricity", artist: "Dua Lipa", playlist: "Dance" },
  { title: "Houdini", artist: "Dua Lipa", playlist: "Dance" },
  { title: "Illusion", artist: "Dua Lipa", playlist: "Dance" },
  { title: "Training Season", artist: "Dua Lipa", playlist: "Pop Hits" },
  { title: "Be The One", artist: "Dua Lipa", playlist: "Pop Hits" },
  // Other Top Hits
  { title: "Shape of You", artist: "Ed Sheeran", playlist: "Pop Hits" },
  { title: "Perfect", artist: "Ed Sheeran", playlist: "Pop Hits" },
  { title: "Bad Habits", artist: "Ed Sheeran", playlist: "Dance" },
  { title: "Shivers", artist: "Ed Sheeran", playlist: "Pop Hits" },
  { title: "Thinking Out Loud", artist: "Ed Sheeran", playlist: "Pop Hits" },
  { title: "As It Was", artist: "Harry Styles", playlist: "Pop Hits" },
  { title: "Watermelon Sugar", artist: "Harry Styles", playlist: "Pop Hits" },
  { title: "Adore You", artist: "Harry Styles", playlist: "Pop Hits" },
  { title: "Late Night Talking", artist: "Harry Styles", playlist: "Pop Hits" },
  { title: "Drivers License", artist: "Olivia Rodrigo", playlist: "Pop Hits" },
  { title: "Good 4 U", artist: "Olivia Rodrigo", playlist: "Pop Hits" },
  { title: "Vampire", artist: "Olivia Rodrigo", playlist: "Pop Hits" },
  { title: "Deja Vu", artist: "Olivia Rodrigo", playlist: "Pop Hits" },
  { title: "Anti-Hero", artist: "Taylor Swift", playlist: "Pop Hits" },
  { title: "Cruel Summer", artist: "Taylor Swift", playlist: "Pop Hits" },
  { title: "Blank Space", artist: "Taylor Swift", playlist: "Pop Hits" },
  { title: "Shake It Off", artist: "Taylor Swift", playlist: "Dance" },
  { title: "Bad Guy", artist: "Billie Eilish", playlist: "Pop Hits" },
  { title: "Ocean Eyes", artist: "Billie Eilish", playlist: "Pop Hits" },
  { title: "What Was I Made For?", artist: "Billie Eilish", playlist: "Pop Hits" },
];

async function searchMusicBrainz(title, artist) {
  const query = `artist:"${artist}" AND recording:"${title}"`;
  const url = `https://musicbrainz.org/ws/2/recording?query=${encodeURIComponent(query)}&fmt=json`;
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'PocketPlayer/1.0.0 ( script/testing )',
        'Accept': 'application/json'
      }
    });
    if (!response.ok) return { album: 'Unknown Album', year: 'Unknown' };
    const data = await response.json();
    if (data.recordings && data.recordings.length > 0) {
      const match = data.recordings[0];
      return {
        album: match.releases?.[0]?.title || 'Unknown Album',
        year: match.releases?.[0]?.date ? match.releases[0].date.split('-')[0] : 'Unknown'
      };
    }
  } catch (e) {
    // ignore
  }
  return { album: 'Unknown Album', year: 'Unknown' };
}

async function updateSongs() {
  const finalSongs = [];
  const delay = ms => new Promise(res => setTimeout(res, ms));
  
  for (let i = 0; i < songs.length; i++) {
    const s = songs[i];
    try {
      console.log(`[${i+1}/${songs.length}] Processing: ${s.title} by ${s.artist}...`);
      
      const r = await ytSearch(`${s.title} ${s.artist} audio`);
      const video = r.videos[0];
      let ytId = 'dQw4w9WgXcQ';
      if (video) ytId = video.videoId;
      
      const mbData = await searchMusicBrainz(s.title, s.artist);
      
      finalSongs.push({
        ...s,
        id: ytId,
        album: mbData.album,
        year: mbData.year
      });
      console.log(`  -> YouTube ID: ${ytId} | Album: ${mbData.album} | Year: ${mbData.year}`);
    } catch (e) {
      console.error(`  -> Error processing ${s.title}:`, e.message);
      finalSongs.push({
        ...s,
        id: 'dQw4w9WgXcQ',
        album: 'Unknown Album',
        year: 'Unknown'
      });
    }
    // 1.2s delay to avoid MusicBrainz 429 Too Many Requests
    await delay(1200);
  }

  const file = 'src/components/interactive/PocketPlayer.tsx';
  let content = fs.readFileSync(file, 'utf8');
  
  const regex = /const SONG_DATABASE: Song\[\] = \[([\s\S]*?)\]\.map\([\s\S]*?\)\;|const SONG_DATABASE: Song\[\] = \[([\s\S]*?)\];/;
  const newArrayStr = `const SONG_DATABASE: Song[] = [\n` + finalSongs.map(s => `  { title: ${JSON.stringify(s.title)}, artist: ${JSON.stringify(s.artist)}, playlist: ${JSON.stringify(s.playlist)}, id: ${JSON.stringify(s.id)}, album: ${JSON.stringify(s.album)}, year: ${JSON.stringify(s.year)} },`).join('\n') + `\n];`;
  
  // Also remove VALID_YOUTUBE_IDS as it's no longer needed if present
  const validIdsRegex = /const VALID_YOUTUBE_IDS = \[[\s\S]*?\];/;
  content = content.replace(validIdsRegex, '');
  
  content = content.replace(regex, newArrayStr);
  fs.writeFileSync(file, content, 'utf8');
  console.log("Done updating PocketPlayer.tsx");
}

updateSongs();
