import { useState, useEffect, useRef, useCallback } from 'react';

export type YouTubeSong = {
  id: string;
  title: string;
  artist: string; // Channel name
  thumbnail: string;
  duration?: string;
  playlist: string; // To match existing Song type
};

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

// Simple in-memory cache to save API quotas and make repeated searches instant
const searchCache = new Map<string, any>();

function parseYouTubeDuration(duration: string) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '0:00';
  
  const hours = parseInt(match[1] ? match[1].replace('H', '') : '0');
  const minutes = parseInt(match[2] ? match[2].replace('M', '') : '0');
  const seconds = parseInt(match[3] ? match[3].replace('S', '') : '0');
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export const useYouTubeSearch = (query: string) => {
  const [results, setResults] = useState<YouTubeSong[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchResults = useCallback(async (searchQuery: string, pageToken?: string) => {
    if (!API_KEY) {
      setError('API Key is missing. Please add VITE_YOUTUBE_API_KEY to .env');
      return;
    }
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const cacheKey = `${searchQuery}-${pageToken || ''}`;
    if (searchCache.has(cacheKey)) {
      const cached = searchCache.get(cacheKey);
      if (pageToken) {
        setResults(prev => {
          // avoid duplicates just in case
          const existingIds = new Set(prev.map(r => r.id));
          const newItems = cached.items.filter((item: YouTubeSong) => !existingIds.has(item.id));
          return [...prev, ...newItems];
        });
      } else {
        setResults(cached.items);
      }
      setNextPageToken(cached.nextPageToken || null);
      return;
    }

    if (!pageToken) setLoading(true); // only show loading for initial search
    setError(null);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      // 1. Search request
      let searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCategoryId=10&maxResults=20&q=${encodeURIComponent(searchQuery)}&key=${API_KEY}`;
      if (pageToken) searchUrl += `&pageToken=${pageToken}`;

      const searchResponse = await fetch(searchUrl, { signal: abortControllerRef.current.signal });
      if (!searchResponse.ok) {
        throw new Error('Unable to connect. Check your internet connection.');
      }
      
      const searchData = await searchResponse.json();
      
      if (!searchData.items || searchData.items.length === 0) {
        if (!pageToken) {
          setResults([]);
          setError('No songs found.\nTry another search.');
        }
        setLoading(false);
        return;
      }

      const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');
      
      // 2. Details request to get duration and high-res thumbnails
      const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoIds}&key=${API_KEY}`;
      const detailsResponse = await fetch(detailsUrl, { signal: abortControllerRef.current.signal });
      if (!detailsResponse.ok) {
        throw new Error('Unable to fetch video details.');
      }
      const detailsData = await detailsResponse.json();
      
      const mappedResults: YouTubeSong[] = detailsData.items.map((item: any) => {
        // Find best thumbnail
        const t = item.snippet.thumbnails;
        const bestThumbnail = (t.maxres || t.high || t.medium || t.default)?.url || '';
        
        return {
          id: item.id,
          title: item.snippet.title,
          artist: item.snippet.channelTitle,
          thumbnail: bestThumbnail,
          duration: parseYouTubeDuration(item.contentDetails.duration),
          playlist: 'YouTube Search'
        };
      });
      
      searchCache.set(cacheKey, {
        items: mappedResults,
        nextPageToken: searchData.nextPageToken
      });

      if (pageToken) {
        setResults(prev => {
          const existingIds = new Set(prev.map(r => r.id));
          const newItems = mappedResults.filter(item => !existingIds.has(item.id));
          return [...prev, ...newItems];
        });
      } else {
        setResults(mappedResults);
      }
      setNextPageToken(searchData.nextPageToken || null);
      
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'An error occurred while searching.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        fetchResults(query);
      } else {
        setResults([]);
        setError(null);
      }
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [query, fetchResults]);

  const loadMore = useCallback(() => {
    if (nextPageToken && !loading) {
      fetchResults(query, nextPageToken);
    }
  }, [nextPageToken, loading, fetchResults, query]);

  return { results, loading, error, loadMore };
};
