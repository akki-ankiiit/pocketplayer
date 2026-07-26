import React, { useState, useRef, useEffect } from 'react';
import YouTube from 'react-youtube';
import type { YouTubeEvent, YouTubePlayer } from 'react-youtube';



type Song = { id: string; title: string; artist: string; playlist: string };

const SONG_DATABASE: Song[] = [
  { title: "Blinding Lights", artist: "The Weeknd", playlist: "Pop Hits", id: "fHI8X4OXluQ" },
  { title: "Save Your Tears", artist: "The Weeknd", playlist: "Pop Hits", id: "u6lihZAcy4s" },
  { title: "Starboy", artist: "The Weeknd", playlist: "R&B Classics", id: "Rif-RTvmmss" },
  { title: "Call Out My Name", artist: "The Weeknd", playlist: "R&B Classics", id: "rsEne1ZiQrk" },
  { title: "The Hills", artist: "The Weeknd", playlist: "R&B Classics", id: "G5XpJP7f_SE" },
  { title: "Can't Feel My Face", artist: "The Weeknd", playlist: "Pop Hits", id: "dqt8Z1k0oWQ" },
  { title: "Die For You", artist: "The Weeknd", playlist: "R&B Classics", id: "2AH5l-vrY9Q" },
  { title: "Earned It", artist: "The Weeknd", playlist: "R&B Classics", id: "xe_iCkFsQKE" },
  { title: "I Feel It Coming", artist: "The Weeknd", playlist: "Pop Hits", id: "5v1TOFULOWA" },
  { title: "In Your Eyes", artist: "The Weeknd", playlist: "Dance", id: "E3QiD99jPAg" },
  { title: "Out of Time", artist: "The Weeknd", playlist: "R&B Classics", id: "kxgj5af8zg4" },
  { title: "Reminder", artist: "The Weeknd", playlist: "R&B Classics", id: "h_VCgsWLmY4" },
  { title: "Often", artist: "The Weeknd", playlist: "R&B Classics", id: "B3J6tQTuubc" },
  { title: "Creepin'", artist: "The Weeknd", playlist: "R&B Classics", id: "LOqGYF0oFIg" },
  { title: "Heartless", artist: "The Weeknd", playlist: "R&B Classics", id: "-uj9b9JCIJM" },
  { title: "Party Monster", artist: "The Weeknd", playlist: "R&B Classics", id: "j9Hije4z6O4" },
  { title: "Is There Someone Else?", artist: "The Weeknd", playlist: "R&B Classics", id: "i4ZuseKFBF0" },
  { title: "Moth To A Flame", artist: "The Weeknd", playlist: "Dance", id: "u9n7Cw-4_HQ" },
  { title: "Take My Breath", artist: "The Weeknd", playlist: "Dance", id: "eT1E3gmST9U" },
  { title: "Less Than Zero", artist: "The Weeknd", playlist: "Pop Hits", id: "LKsgDcckur0" },
  { title: "2002", artist: "Anne-Marie", playlist: "Pop Hits", id: "1tvLIhEaEKo" },
  { title: "FRIENDS", artist: "Anne-Marie", playlist: "Pop Hits", id: "CY8E6N5Nzec" },
  { title: "Ciao Adios", artist: "Anne-Marie", playlist: "Pop Hits", id: "qqob4D3BoZc" },
  { title: "Alarm", artist: "Anne-Marie", playlist: "Pop Hits", id: "PU6aSEOlhv0" },
  { title: "ROCKABYE", artist: "Anne-Marie", playlist: "Dance", id: "sP2yc_TVuzQ" },
  { title: "Don't Play", artist: "Anne-Marie", playlist: "Dance", id: "Sv0izR1aTt4" },
  { title: "Our Song", artist: "Anne-Marie", playlist: "Pop Hits", id: "E6oWODMxvbA" },
  { title: "Kiss My (Uh Oh)", artist: "Anne-Marie", playlist: "Pop Hits", id: "hsiM2PP0fWk" },
  { title: "Rewrite The Stars", artist: "Anne-Marie", playlist: "Pop Hits", id: "BGE63Dz28N8" },
  { title: "Unhealthy", artist: "Anne-Marie", playlist: "Pop Hits", id: "P00R2pxX-F0" },
  { title: "Tum Hi Ho", artist: "Arijit Singh", playlist: "Bollywood Vibes", id: "BjL7AuPsmEk" },
  { title: "Channa Mereya", artist: "Arijit Singh", playlist: "Bollywood Vibes", id: "S7tYeUBgGHU" },
  { title: "Kesariya", artist: "Arijit Singh", playlist: "Bollywood Vibes", id: "6RdS6wLu7RY" },
  { title: "Agar Tum Saath Ho", artist: "Arijit Singh", playlist: "Bollywood Vibes", id: "fs7-8M1VbZU" },
  { title: "Raabta", artist: "Arijit Singh", playlist: "Bollywood Vibes", id: "vEe-UgJvUHE" },
  { title: "Shayad", artist: "Arijit Singh", playlist: "Bollywood Vibes", id: "muxtRRMmyhc" },
  { title: "Hawayein", artist: "Arijit Singh", playlist: "Bollywood Vibes", id: "YQZMG-4gcdQ" },
  { title: "Kalank", artist: "Arijit Singh", playlist: "Bollywood Vibes", id: "Grr0FlC8SQA" },
  { title: "Phir Le Aya Dil", artist: "Arijit Singh", playlist: "Bollywood Vibes", id: "Z93rAu25KqI" },
  { title: "Apna Bana Le", artist: "Arijit Singh", playlist: "Bollywood Vibes", id: "u2NAuswnTKs" },
  { title: "Tujhe Kitna Chahne Lage", artist: "Arijit Singh", playlist: "Bollywood Vibes", id: "Hq5OTJdBKQU" },
  { title: "Galti Se Mistake", artist: "Arijit Singh", playlist: "Bollywood Vibes", id: "pZyRXaJvVww" },
  { title: "Zaalima", artist: "Arijit Singh", playlist: "Bollywood Vibes", id: "2osiaPqMrN4" },
  { title: "Tera Ban Jaunga", artist: "Arijit Singh", playlist: "Bollywood Vibes", id: "Qdz5n1Xe5Qo" },
  { title: "Khairiyat", artist: "Arijit Singh", playlist: "Bollywood Vibes", id: "ugcfBQ_AUYg" },
  { title: "Pal", artist: "Arijit Singh", playlist: "Bollywood Vibes", id: "PT1wqw3GT7I" },
  { title: "Ae Dil Hai Mushkil", artist: "Arijit Singh", playlist: "Bollywood Vibes", id: "dXKrpx6cZQg" },
  { title: "Ve Maahi", artist: "Arijit Singh", playlist: "Bollywood Vibes", id: "YyE_rEF8tmY" },
  { title: "Ilahi", artist: "Arijit Singh", playlist: "Bollywood Vibes", id: "AicKz1ISNjU" },
  { title: "Kabira", artist: "Arijit Singh", playlist: "Bollywood Vibes", id: "ecpvcQ_4Tn8" },
  { title: "Peaches", artist: "Justin Bieber", playlist: "Pop Hits", id: "ay9y3CTkT40" },
  { title: "Stay", artist: "Justin Bieber", playlist: "Pop Hits", id: "Qb8q4ijHk_M" },
  { title: "Sorry", artist: "Justin Bieber", playlist: "Dance", id: "8ELbX5CMomE" },
  { title: "Love Yourself", artist: "Justin Bieber", playlist: "Pop Hits", id: "eu6bAOVuxss" },
  { title: "What Do You Mean?", artist: "Justin Bieber", playlist: "Pop Hits", id: "NywWB67Z7zQ" },
  { title: "Baby", artist: "Justin Bieber", playlist: "Pop Hits", id: "TpddIBTiDUc" },
  { title: "Intentions", artist: "Justin Bieber", playlist: "Pop Hits", id: "oplNOZXP5YU" },
  { title: "Ghost", artist: "Justin Bieber", playlist: "Pop Hits", id: "KRUWn3dLoRg" },
  { title: "Yummy", artist: "Justin Bieber", playlist: "R&B Classics", id: "EaMed9sUPVo" },
  { title: "Holy", artist: "Justin Bieber", playlist: "Pop Hits", id: "qaq0nNXy0ak" },
  { title: "Anyone", artist: "Justin Bieber", playlist: "Pop Hits", id: "4cLa1c7Zzg8" },
  { title: "Lonely", artist: "Justin Bieber", playlist: "Pop Hits", id: "D9qrObYGyvg" },
  { title: "Let Me Love You", artist: "Justin Bieber", playlist: "Dance", id: "SMs0GnYze34" },
  { title: "I'm The One", artist: "Justin Bieber", playlist: "Dance", id: "kb6TLe_pM2E" },
  { title: "Despacito", artist: "Justin Bieber", playlist: "Dance", id: "72UO0v5ESUo" },
  { title: "Levitating", artist: "Dua Lipa", playlist: "Pop Hits", id: "WHuBW3qKm9g" },
  { title: "Don't Start Now", artist: "Dua Lipa", playlist: "Dance", id: "LcrahEiFuUM" },
  { title: "New Rules", artist: "Dua Lipa", playlist: "Pop Hits", id: "TRpSC_hWkGE" },
  { title: "One Kiss", artist: "Dua Lipa", playlist: "Dance", id: "Bm8rz-llMhE" },
  { title: "Physical", artist: "Dua Lipa", playlist: "Dance", id: "SRdlnO9gMIY" },
  { title: "Break My Heart", artist: "Dua Lipa", playlist: "Pop Hits", id: "jgh8owCuX78" },
  { title: "Cold Heart", artist: "Dua Lipa", playlist: "Dance", id: "PTOaTuGllyY" },
  { title: "Dance The Night", artist: "Dua Lipa", playlist: "Dance", id: "hCLkVrp_4CE" },
  { title: "IDGAF", artist: "Dua Lipa", playlist: "Pop Hits", id: "j6jA6dCCToQ" },
  { title: "Love Again", artist: "Dua Lipa", playlist: "Pop Hits", id: "LAdxhHz6Tu4" },
  { title: "Electricity", artist: "Dua Lipa", playlist: "Dance", id: "XJcU-iKqQxY" },
  { title: "Houdini", artist: "Dua Lipa", playlist: "Dance", id: "YIvwCIwDQT8" },
  { title: "Illusion", artist: "Dua Lipa", playlist: "Dance", id: "GGlTV5HYywc" },
  { title: "Training Season", artist: "Dua Lipa", playlist: "Pop Hits", id: "3W9zTpRFlzw" },
  { title: "Be The One", artist: "Dua Lipa", playlist: "Pop Hits", id: "5Zfpr7RMqrU" },
  { title: "Shape of You", artist: "Ed Sheeran", playlist: "Pop Hits", id: "_dK2tDK9grQ" },
  { title: "Perfect", artist: "Ed Sheeran", playlist: "Pop Hits", id: "CWG-GDfejmY" },
  { title: "Bad Habits", artist: "Ed Sheeran", playlist: "Dance", id: "HeOpRzcqKrE" },
  { title: "Shivers", artist: "Ed Sheeran", playlist: "Pop Hits", id: "z2_Lrg6rRks" },
  { title: "Thinking Out Loud", artist: "Ed Sheeran", playlist: "Pop Hits", id: "WpyfrixXBqU" },
  { title: "As It Was", artist: "Harry Styles", playlist: "Pop Hits", id: "V1Z586zoeeE" },
  { title: "Watermelon Sugar", artist: "Harry Styles", playlist: "Pop Hits", id: "7-x3uD5z1bQ" },
  { title: "Adore You", artist: "Harry Styles", playlist: "Pop Hits", id: "iquhBgM-Qv0" },
  { title: "Late Night Talking", artist: "Harry Styles", playlist: "Pop Hits", id: "RwT77rlp2CE" },
  { title: "Drivers License", artist: "Olivia Rodrigo", playlist: "Pop Hits", id: "tNJhkrpLGT8" },
  { title: "Good 4 U", artist: "Olivia Rodrigo", playlist: "Pop Hits", id: "aeDdS9aIpck" },
  { title: "Vampire", artist: "Olivia Rodrigo", playlist: "Pop Hits", id: "Fqey8LxQxFU" },
  { title: "Deja Vu", artist: "Olivia Rodrigo", playlist: "Pop Hits", id: "C4hwsb1HPaU" },
  { title: "Anti-Hero", artist: "Taylor Swift", playlist: "Pop Hits", id: "XqN2qFvY64U" },
  { title: "Cruel Summer", artist: "Taylor Swift", playlist: "Pop Hits", id: "ic8j13piAhQ" },
  { title: "Blank Space", artist: "Taylor Swift", playlist: "Pop Hits", id: "2mIBS3fHp6A" },
  { title: "Shake It Off", artist: "Taylor Swift", playlist: "Dance", id: "H59xVMF4zxE" },
  { title: "Bad Guy", artist: "Billie Eilish", playlist: "Pop Hits", id: "YD4utuFiexw" },
  { title: "Ocean Eyes", artist: "Billie Eilish", playlist: "Pop Hits", id: "eCVNY3Og1ZQ" },
  { title: "What Was I Made For?", artist: "Billie Eilish", playlist: "Pop Hits", id: "dpnTd9Dx2OM" },
];

const PLAYLISTS = Array.from(new Set(SONG_DATABASE.map(s => s.playlist))).sort();
const ARTISTS = Array.from(new Set(SONG_DATABASE.map(s => s.artist))).sort();

type MenuNode = 
  | { type: 'home' }
  | { type: 'playlists' }
  | { type: 'artists' }
  | { type: 'songs', filterType: 'all' | 'playlist' | 'artist', filterValue?: string }
  | { type: 'search' }
  | { type: 'nowPlaying' };

const SEARCH_CHARS = [
  ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  ...'0123456789'.split(''),
  'Space', 'Delete', 'Done'
];

export const PocketPlayer = () => {
  const [navStack, setNavStack] = useState<MenuNode[]>([{ type: 'home' }]);
  const [selectionStack, setSelectionStack] = useState<number[]>([0]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocusedOnResults, setIsSearchFocusedOnResults] = useState(false);
  
  const [playbackQueue, setPlaybackQueue] = useState<Song[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  const playerRef = useRef<YouTubePlayer | null>(null);
  const isScrubbing = useRef(false);

  const currentMenu = navStack[navStack.length - 1];
  const currentIndex = selectionStack[selectionStack.length - 1];
  const currentTrack = playbackQueue[currentTrackIndex];

  const getFilteredSearchResults = () => {
    if (!searchQuery) return [];
    const lowerQuery = searchQuery.toLowerCase();
    return SONG_DATABASE.filter(song => 
      song.title.toLowerCase().includes(lowerQuery) ||
      song.artist.toLowerCase().includes(lowerQuery) ||
      song.playlist.toLowerCase().includes(lowerQuery)
    );
  };
  const searchResults = getFilteredSearchResults();

  const getCurrentList = () => {
    switch(currentMenu.type) {
      case 'home':
        return ['Playlists', 'Artists', 'All Songs', 'Search', 'Now Playing'];
      case 'playlists':
        return PLAYLISTS;
      case 'artists':
        return ARTISTS;
      case 'songs':
        if (currentMenu.filterType === 'all') return SONG_DATABASE;
        if (currentMenu.filterType === 'playlist') return SONG_DATABASE.filter(s => s.playlist === currentMenu.filterValue);
        if (currentMenu.filterType === 'artist') return SONG_DATABASE.filter(s => s.artist === currentMenu.filterValue);
        return [];
      case 'search':
        return isSearchFocusedOnResults ? searchResults : SEARCH_CHARS;
      case 'nowPlaying':
        return [];
    }
  };

  const list = getCurrentList();

  // Update progress bar
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying && playerRef.current) {
      interval = setInterval(async () => {
        if (!isScrubbing.current) {
          try {
            const time = await playerRef.current.getCurrentTime();
            setCurrentTime(time || 0);
          } catch (e) {
            // ignore
          }
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const onReady = (event: YouTubeEvent) => {
    playerRef.current = event.target;
    setDuration(event.target.getDuration());
  };

  const onStateChange = (event: YouTubeEvent) => {
    if (event.data === 1) {
      setIsPlaying(true);
      setDuration(event.target.getDuration());
    } else if (event.data === 2) {
      setIsPlaying(false);
    } else if (event.data === 0) {
      handleNext();
    }
  };

  const handlePlayPause = () => {
    if (!playerRef.current || !currentTrack) return;
    const state = playerRef.current.getPlayerState();
    if (state === 1) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const handleNext = () => {
    if (currentMenu.type === 'search') {
      if (searchResults.length > 0 && !isSearchFocusedOnResults) {
        setIsSearchFocusedOnResults(true);
        setSelectionStack(prev => {
          const newStack = [...prev];
          newStack[newStack.length - 1] = 0;
          return newStack;
        });
      }
      return;
    }
    if (playbackQueue.length === 0) return;
    const nextIdx = (currentTrackIndex + 1) % playbackQueue.length;
    setCurrentTrackIndex(nextIdx);
    setCurrentTime(0);
    if (playerRef.current) {
      playerRef.current.loadVideoById(playbackQueue[nextIdx].id);
      playerRef.current.playVideo();
    }
  };

  const handlePrev = () => {
    if (currentMenu.type === 'search') {
      if (isSearchFocusedOnResults) {
        setIsSearchFocusedOnResults(false);
        setSelectionStack(prev => {
          const newStack = [...prev];
          newStack[newStack.length - 1] = 0;
          return newStack;
        });
      }
      return;
    }
    if (playbackQueue.length === 0) return;
    const prevIdx = (currentTrackIndex - 1 + playbackQueue.length) % playbackQueue.length;
    setCurrentTrackIndex(prevIdx);
    setCurrentTime(0);
    if (playerRef.current) {
      playerRef.current.loadVideoById(playbackQueue[prevIdx].id);
      playerRef.current.playVideo();
    }
  };

  const pushMenu = (menu: MenuNode) => {
    setNavStack(prev => [...prev, menu]);
    setSelectionStack(prev => [...prev, 0]);
  };
  
  const popMenu = () => {
    if (navStack.length > 1) {
      setNavStack(prev => prev.slice(0, -1));
      setSelectionStack(prev => prev.slice(0, -1));
    }
  };

  const menuHoldTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMenuClick = () => {
    if (currentMenu.type === 'search') {
      if (searchQuery.length > 0) {
        setSearchQuery(prev => prev.slice(0, -1));
      } else {
        popMenu();
      }
    } else {
      popMenu();
    }
  };

  const handleMenuDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    if (currentMenu.type === 'search') {
      menuHoldTimer.current = setTimeout(() => {
        setSearchQuery('');
        menuHoldTimer.current = null;
      }, 2000);
    }
  };

  const handleMenuUp = (e: React.PointerEvent) => {
    e.stopPropagation();
    if (currentMenu.type === 'search') {
      if (menuHoldTimer.current) {
        clearTimeout(menuHoldTimer.current);
        menuHoldTimer.current = null;
        handleMenuClick();
      }
    } else {
      handleMenuClick();
    }
  };

  const handleSelectClick = () => {
    if (currentMenu.type === 'nowPlaying') {
      handlePlayPause();
      return;
    }
    
    if (!list || list.length === 0) return;
    const selectedItem = list[currentIndex];
    
    if (currentMenu.type === 'home') {
      if (selectedItem === 'Playlists') pushMenu({ type: 'playlists' });
      else if (selectedItem === 'Artists') pushMenu({ type: 'artists' });
      else if (selectedItem === 'All Songs') pushMenu({ type: 'songs', filterType: 'all' });
      else if (selectedItem === 'Search') {
        setSearchQuery('');
        setIsSearchFocusedOnResults(false);
        pushMenu({ type: 'search' });
      }
      else if (selectedItem === 'Now Playing' && currentTrack) pushMenu({ type: 'nowPlaying' });
    } else if (currentMenu.type === 'playlists') {
      pushMenu({ type: 'songs', filterType: 'playlist', filterValue: selectedItem as string });
    } else if (currentMenu.type === 'artists') {
      pushMenu({ type: 'songs', filterType: 'artist', filterValue: selectedItem as string });
    } else if (currentMenu.type === 'songs' || currentMenu.type === 'search') {
      if (currentMenu.type === 'search' && !isSearchFocusedOnResults) {
        if (selectedItem === 'Space') {
          setSearchQuery(prev => prev + ' ');
        } else if (selectedItem === 'Delete') {
          setSearchQuery(prev => prev.slice(0, -1));
        } else if (selectedItem === 'Done') {
          if (searchResults.length > 0) {
            setIsSearchFocusedOnResults(true);
            setSelectionStack(prev => {
              const newStack = [...prev];
              newStack[newStack.length - 1] = 0;
              return newStack;
            });
          }
        } else {
          setSearchQuery(prev => prev + selectedItem);
        }
      } else {
        const newQueue = (currentMenu.type === 'search' ? searchResults : list) as Song[];
        setPlaybackQueue(newQueue);
        setCurrentTrackIndex(currentIndex);
        pushMenu({ type: 'nowPlaying' });
        if (playerRef.current) {
          playerRef.current.loadVideoById(newQueue[currentIndex].id);
          playerRef.current.playVideo();
        }
      }
    }
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00';
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const remainingTime = duration ? duration - currentTime : 0;
  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  // Wheel Interaction Logic
  const wheelRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const lastAngle = useRef(0);

  const getAngle = (e: React.PointerEvent) => {
    if (!wheelRef.current) return 0;
    const rect = wheelRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;
    return Math.atan2(y, x) * (180 / Math.PI);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastAngle.current = getAngle(e);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    
    const currentAngle = getAngle(e);
    let delta = currentAngle - lastAngle.current;
    
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    if (currentMenu.type !== 'nowPlaying') {
      if (Math.abs(delta) > 15) {
        const direction = delta > 0 ? 1 : -1;
        const listLength = getCurrentList().length;
        if (listLength > 0) {
          if (currentMenu.type === 'search') {
            const currentIdx = currentIndex;
            if (!isSearchFocusedOnResults) {
              if (direction > 0 && currentIdx === listLength - 1 && searchResults.length > 0) {
                setIsSearchFocusedOnResults(true);
                setSelectionStack(prev => {
                  const newStack = [...prev];
                  newStack[newStack.length - 1] = 0;
                  return newStack;
                });
              } else {
                setSelectionStack(prev => {
                  const newStack = [...prev];
                  let next = currentIdx + direction;
                  if (next >= listLength) next = listLength - 1;
                  if (next < 0) next = 0;
                  newStack[newStack.length - 1] = next;
                  return newStack;
                });
              }
            } else {
              if (direction < 0 && currentIdx === 0) {
                setIsSearchFocusedOnResults(false);
                setSelectionStack(prev => {
                  const newStack = [...prev];
                  newStack[newStack.length - 1] = SEARCH_CHARS.length - 1;
                  return newStack;
                });
              } else {
                setSelectionStack(prev => {
                  const newStack = [...prev];
                  let next = currentIdx + direction;
                  if (next >= listLength) next = listLength - 1;
                  if (next < 0) next = 0;
                  newStack[newStack.length - 1] = next;
                  return newStack;
                });
              }
            }
          } else {
            setSelectionStack(prev => {
              const newStack = [...prev];
              let next = newStack[newStack.length - 1] + direction;
              if (next >= listLength) next = 0;
              if (next < 0) next = listLength - 1;
              newStack[newStack.length - 1] = next;
              return newStack;
            });
          }
        }
        lastAngle.current = currentAngle;
      }
    } else {
      if (Math.abs(delta) > 2) {
        isScrubbing.current = true;
        const scrubAmount = (delta / 360) * 100;
        setCurrentTime((prev) => {
          let nextTime = prev + scrubAmount;
          if (nextTime < 0) nextTime = 0;
          if (nextTime > duration) nextTime = duration;
          return nextTime;
        });
        lastAngle.current = currentAngle;
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
    
    if (isScrubbing.current && playerRef.current) {
      playerRef.current.seekTo(currentTime, true);
      isScrubbing.current = false;
    }
  };

  const getMenuTitle = () => {
    switch (currentMenu.type) {
      case 'home': return 'Music';
      case 'playlists': return 'Playlists';
      case 'artists': return 'Artists';
      case 'songs': return currentMenu.filterValue || 'All Songs';
      case 'nowPlaying': return 'Now Playing';
      default: return 'Menu';
    }
  };

  return (
    <div className="w-[300px] h-[480px] bg-gradient-to-b from-[#fdfdfd] to-[#e6e6e6] rounded-[32px] p-6 shadow-[inset_0_1px_4px_rgba(255,255,255,1),_0_20px_40px_-10px_rgba(0,0,0,0.3)] flex flex-col items-center gap-8 relative border border-gray-300">
      
      {/* Hidden YouTube Player (fully opaque to bypass Safari iOS throttling, hidden behind the Screen) */}
      <div 
        style={{
          position: 'absolute',
          width: '50px',
          height: '50px',
          top: '100px', // Placed directly behind the screen (which is z-10)
          left: '100px',
          opacity: 1, // Full opacity is REQUIRED for Safari iOS to not block the iframe
          zIndex: 0,
          pointerEvents: 'none'
        }}
      >
        <YouTube
          videoId={SONG_DATABASE[0].id}
          opts={{
            height: '50',
            width: '50',
            playerVars: {
              autoplay: 0,
              controls: 0,
              disablekb: 1,
              playsinline: 1,
              fs: 0,
              rel: 0
            },
          }}
          onReady={onReady}
          onStateChange={onStateChange}
        />
      </div>

      {/* Screen */}
      <div 
        className={`w-full h-[180px] bg-gradient-to-b from-[#9EAFC2] to-[#B5C5D8] rounded-md shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)] relative overflow-hidden flex flex-col font-sans border-2 border-[#1a2f4c]/40 ${currentMenu.type === 'nowPlaying' ? 'cursor-pointer' : ''}`}
        onClick={() => {
          if (currentMenu.type === 'nowPlaying') handlePlayPause();
        }}
      >
        <div 
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 z-20" 
          style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)' }}
        />

        {/* Status Bar */}
        <div className="w-full h-6 bg-gradient-to-b from-white/40 to-white/10 flex items-center justify-between px-2 text-[11px] font-bold text-[#1a2f4c] border-b border-[#1a2f4c]/30 z-10 shrink-0 pointer-events-none">
          <span className="flex items-center gap-1 w-8">
            {isPlaying ? (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            )}
          </span>
          <span className="text-center flex-1 truncate px-1">{getMenuTitle()}</span>
          <span className="w-8 flex justify-end">
            <div className="w-5 h-2.5 border border-[#1a2f4c] rounded-sm relative p-[1px]">
              <div className="w-[80%] h-full bg-[#1a2f4c] rounded-sm" />
              <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-0.5 h-1.5 bg-[#1a2f4c] rounded-r-sm" />
            </div>
          </span>
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full relative z-10 bg-[#B5C5D8] overflow-hidden">
          {currentMenu.type === 'search' ? (
            <div className="w-full h-full flex flex-col font-sans text-[#1a2f4c] pointer-events-none relative">
              {/* Top Section */}
              <div className="w-full bg-[#B5C5D8] border-b border-[#1a2f4c]/30 p-1.5 flex flex-col gap-1 shrink-0 z-20 shadow-sm relative">
                <div className="flex text-[11px] font-bold h-4 items-center">
                  <span className="w-12 shrink-0">Search:</span>
                  <span className="flex-1 truncate">{searchQuery}<span className="animate-[pulse_1s_ease-in-out_infinite] ml-px font-normal text-lg">|</span></span>
                </div>
                <div className="h-[1px] w-full bg-[#1a2f4c]/20" />
                <div className="text-[10px] font-bold h-3 flex items-center justify-between">
                  <span>Matches: {searchQuery ? searchResults.length : 0}</span>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="flex-1 relative overflow-hidden bg-[#B5C5D8]">
                {isSearchFocusedOnResults && searchResults.length === 0 ? (
                  <div className="w-full h-full flex flex-col items-center justify-center text-[10px] font-bold text-[#1a2f4c]/60 -mt-2">
                    <p>No Results Found</p>
                    <p className="mt-1">Try another letter.</p>
                  </div>
                ) : (
                  <div 
                    className="w-full absolute left-0 top-0 transition-transform duration-150 ease-out flex flex-col py-1"
                    style={{ transform: `translateY(-${Math.max(0, currentIndex - (isSearchFocusedOnResults ? 3 : 2)) * 24}px)` }}
                  >
                    {list.map((item, idx) => {
                      const isSelected = idx === currentIndex;
                      const label = typeof item === 'string' ? item : item.title;
                      const subLabel = typeof item === 'object' ? (item as Song).artist : '';

                      return (
                        <div 
                          key={idx} 
                          className={`w-full h-6 px-2 shrink-0 text-[11px] font-bold flex justify-between items-center transition-colors ${isSelected ? 'bg-gradient-to-b from-[#2a68c0] to-[#1a4a9c] text-white' : 'text-[#1a2f4c]'}`}
                        >
                          <span className="truncate flex-1 pr-2">
                            {label} {subLabel && <span className={`text-[9px] ${isSelected ? 'text-white/70' : 'text-[#1a2f4c]/60'}`}>- {subLabel}</span>}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ) : currentMenu.type !== 'nowPlaying' ? (
            // LIST VIEW
            <div className="w-full h-full relative pointer-events-none">
              <div 
                className="w-full absolute left-0 top-0 transition-transform duration-150 ease-out flex flex-col py-1"
                style={{ transform: `translateY(-${Math.max(0, currentIndex - 3) * 24}px)` }}
              >
                {list.map((item, idx) => {
                  const isSelected = idx === currentIndex;
                  const label = typeof item === 'string' ? item : item.title;
                  const subLabel = typeof item === 'object' ? (item as Song).artist : '';

                  return (
                    <div 
                      key={idx} 
                      className={`w-full h-6 px-2 shrink-0 text-[11px] font-bold flex justify-between items-center transition-colors ${isSelected ? 'bg-gradient-to-b from-[#2a68c0] to-[#1a4a9c] text-white' : 'text-[#1a2f4c]'}`}
                    >
                      <span className="truncate flex-1 pr-2">
                        {label} {subLabel && <span className={`text-[9px] ${isSelected ? 'text-white/70' : 'text-[#1a2f4c]/60'}`}>- {subLabel}</span>}
                      </span>
                      {((currentMenu.type === 'home' || currentMenu.type === 'playlists' || currentMenu.type === 'artists') && isSelected) && (
                        <span className={`text-[10px] shrink-0 text-white`}>▶</span>
                      )}
                      {(currentMenu.type === 'songs' && isSelected) && (
                        <span className={`text-[10px] shrink-0 text-white`}>▶</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            // NOW PLAYING VIEW
            currentTrack ? (
              <div className="w-full h-full flex flex-col p-3 text-center text-[#1a2f4c] pointer-events-none">
                <p className="text-[10px] font-bold text-left mb-2">{currentTrackIndex + 1} of {playbackQueue.length}</p>
                
                <div className="flex-1 flex flex-col items-center justify-center mt-[-10px]">
                  <h3 className="font-bold text-sm tracking-tight px-2 leading-tight">{currentTrack.title}</h3>
                  <p className="text-xs mt-1 font-medium">{currentTrack.artist}</p>
                </div>

                {/* Progress */}
                <div className="w-full flex flex-col gap-1.5 mt-auto pb-1">
                  <div className="w-full h-2.5 bg-gradient-to-b from-[#8E9EB0] to-[#A3B3C4] rounded-full border border-[#1a2f4c]/40 overflow-hidden shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-b from-[#4A6482] to-[#2E4259] rounded-full" 
                      style={{ width: `${progressPercent}%` }} 
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-bold">
                    <span>{formatTime(currentTime)}</span>
                    <span>-{formatTime(remainingTime)}</span>
                  </div>
                </div>
              </div>
            ) : (
               <div className="w-full h-full flex items-center justify-center text-xs font-bold text-[#1a2f4c]">No track playing</div>
            )
          )}
        </div>
      </div>

      {/* Click Wheel Area */}
      <div 
        ref={wheelRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="w-[200px] h-[200px] bg-gradient-to-b from-[#e0e0e0] to-[#d4d4d4] rounded-full shadow-[inset_0_-1px_3px_rgba(0,0,0,0.1),_inset_0_1px_4px_rgba(255,255,255,0.9),_0_2px_4px_rgba(0,0,0,0.15)] relative flex items-center justify-center mt-2 group touch-none select-none cursor-pointer"
      >
        <button 
          onPointerDown={handleMenuDown}
          onPointerUp={handleMenuUp}
          onPointerCancel={handleMenuUp}
          className="absolute top-4 font-bold text-[#888] text-[11px] tracking-widest hover:text-[#555] active:text-[#333] transition-colors uppercase z-10"
        >
          Menu
        </button>

        <button 
          onPointerDown={(e) => e.stopPropagation()}
          onClick={handlePrev}
          className="absolute left-4 text-[#888] hover:text-[#555] active:text-[#333] transition-colors z-10 p-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
          </svg>
        </button>

        <button 
          onPointerDown={(e) => e.stopPropagation()}
          onClick={handleNext}
          className="absolute right-4 text-[#888] hover:text-[#555] active:text-[#333] transition-colors z-10 p-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
          </svg>
        </button>

        <button 
          onPointerDown={(e) => e.stopPropagation()}
          onClick={handlePlayPause}
          className="absolute bottom-4 text-[#888] hover:text-[#555] active:text-[#333] transition-colors flex items-center justify-center z-10 p-2"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
            <path d="M8 5v14l11-7z" />
          </svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        </button>

        <button 
          onPointerDown={(e) => e.stopPropagation()}
          onClick={handleSelectClick}
          className="w-[74px] h-[74px] bg-gradient-to-b from-[#f4f4f4] to-[#ebebeb] rounded-full shadow-[inset_0_1px_3px_rgba(255,255,255,1),_0_2px_6px_rgba(0,0,0,0.2)] active:shadow-[inset_0_2px_5px_rgba(0,0,0,0.1),_0_1px_2px_rgba(0,0,0,0.1)] border border-white/50 transition-shadow z-20"
        />
      </div>
    </div>
  );
};
