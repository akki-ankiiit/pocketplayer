async function searchMusicBrainz(artist, recording) {
  // Construct and encode the search query
  const query = `artist:"${artist}" AND recording:"${recording}"`;
  const url = `https://musicbrainz.org/ws/2/recording?query=${encodeURIComponent(query)}&fmt=json`;

  console.log(`Fetching: ${url}\n`);

  try {
    const response = await fetch(url, {
      headers: {
        // MusicBrainz API requires a descriptive User-Agent
        'User-Agent': 'PocketPlayer/1.0.0 ( script/testing )',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.recordings && data.recordings.length > 0) {
      console.log(`✅ Found ${data.recordings.length} results. Here is the top match:\n`);
      
      const match = data.recordings[0];
      console.log(`Title:  ${match.title}`);
      console.log(`Artist: ${match['artist-credit']?.[0]?.name}`);
      console.log(`Album:  ${match.releases?.[0]?.title || 'Unknown'}`);
      console.log(`Date:   ${match.releases?.[0]?.date || 'Unknown'}`);
      console.log(`MBID:   ${match.id}`);
      
      return match;
    } else {
      console.log('❌ No results found.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching from MusicBrainz:', error);
  }
}

// Execute the specific query you asked for:
searchMusicBrainz('Coldplay', 'Yellow');
