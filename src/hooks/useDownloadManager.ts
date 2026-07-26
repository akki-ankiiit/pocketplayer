import { useState, useEffect, useCallback } from 'react';
import localforage from 'localforage';

export type DownloadedSong = {
  id: string;
  title: string;
  artist: string;
  thumbnail?: string;
  audioBlob: Blob;
  duration?: string;
};

// Use localforage to store audio blobs because they can be large (IndexedDB)
localforage.config({
  name: 'PocketPlayer',
  storeName: 'offline_songs'
});

export const useDownloadManager = () => {
  const [downloadedSongs, setDownloadedSongs] = useState<DownloadedSong[]>([]);
  const [isDownloading, setIsDownloading] = useState<Record<string, boolean>>({});

  // Load existing downloaded songs on mount
  useEffect(() => {
    const loadDownloads = async () => {
      const keys = await localforage.keys();
      const songs: DownloadedSong[] = [];
      for (const key of keys) {
        const song = await localforage.getItem<DownloadedSong>(key);
        if (song) songs.push(song);
      }
      setDownloadedSongs(songs);
    };
    loadDownloads();
  }, []);

  const downloadSong = useCallback(async (songData: Omit<DownloadedSong, 'audioBlob'>) => {
    if (isDownloading[songData.id]) return;
    
    setIsDownloading(prev => ({ ...prev, [songData.id]: true }));
    try {
      const response = await fetch(`http://localhost:3001/download/${songData.id}`);
      if (!response.ok) throw new Error('Download failed');
      
      const audioBlob = await response.blob();
      const fullSong: DownloadedSong = { ...songData, audioBlob };
      
      await localforage.setItem(songData.id, fullSong);
      
      setDownloadedSongs(prev => {
        const filtered = prev.filter(s => s.id !== songData.id);
        return [...filtered, fullSong];
      });
      
    } catch (error) {
      console.error('Error downloading song:', error);
      alert('Failed to download song. Ensure the download server is running on port 3001.');
    } finally {
      setIsDownloading(prev => ({ ...prev, [songData.id]: false }));
    }
  }, [isDownloading]);

  const deleteSong = useCallback(async (id: string) => {
    await localforage.removeItem(id);
    setDownloadedSongs(prev => prev.filter(s => s.id !== id));
  }, []);

  const getAudioUrl = useCallback(async (id: string): Promise<string | null> => {
    const song = await localforage.getItem<DownloadedSong>(id);
    if (!song) return null;
    return URL.createObjectURL(song.audioBlob);
  }, []);

  const isDownloaded = useCallback((id: string) => {
    return downloadedSongs.some(s => s.id === id);
  }, [downloadedSongs]);

  return {
    downloadedSongs,
    isDownloading,
    downloadSong,
    deleteSong,
    getAudioUrl,
    isDownloaded
  };
};
