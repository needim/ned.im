"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { IconPlayerPause, IconPlayerPlay, IconVolume, IconVolume3, IconArrowsDiagonal, IconArrowsDiagonalMinimize, IconPlayerTrackNext, IconPlayerTrackPrev } from "@tabler/icons-react";
import { FastAverageColor } from 'fast-average-color';

interface Song {
  id: string;
  name: string;
  ar: { name: string }[];
  al: {
    name: string;
    picUrl: string;
  };
  url?: string; // 添加url字段用于缓存
}

interface Comment {
  commentId: number;
  content: string;
  time: number;
  likedCount: number;
  user: {
    userId: number;
    nickname: string;
    avatarUrl: string;
  };
}

interface MusicDetail {
  br: number; // 比特率
  size: number; // 文件大小
  level: string; // 音质等级
  encodeType: string; // 编码类型
  time: number; // 时长
  type: string; // 文件类型
}

interface UrlInfo {
  id: string;
  url: string;
  code: number;
}

const DEFAULT_VOLUME = 0.5; // 定义默认音量为 50%
const fac = new FastAverageColor();

const MAX_RETRY_COUNT = 3;
const RETRY_DELAY = 2000; // 2 seconds

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [expanded, setExpanded] = useState(false);
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [dominantColor, setDominantColor] = useState<[number, number, number]>([0, 0, 0]);
  const [retryCount, setRetryCount] = useState(0);
  const [hasUserInteraction, setHasUserInteraction] = useState(false);
  const [userIP, setUserIP] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [textWidths, setTextWidths] = useState<{ [key: string]: boolean }>({});
  const [isVipSong, setIsVipSong] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const switchingRef = useRef(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const shouldAutoPlay = useRef<boolean>(false);
  const expandTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const playerRef = useRef<HTMLDivElement | null>(null);
  const playPromiseRef = useRef<Promise<void> | undefined>(undefined);
  const isFirstLoad = useRef<boolean>(true);
  const imgRef = useRef<HTMLImageElement>(null);
  const [expandTimeout, setExpandTimeout] = useState<number | null>(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [previewDuration, setPreviewDuration] = useState<number | null>(null);
  const [vipSongInfo, setVipSongInfo] = useState<{
    canPreview: boolean;
    previewStart?: number;
    previewEnd?: number;
    message?: string;
  } | null>(null);
  const [previewTimeLeft, setPreviewTimeLeft] = useState<number | null>(null);
  const [showPreviewEndWarning, setShowPreviewEndWarning] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [currentLyrics, setCurrentLyrics] = useState<{
    lrc: string;
    tlyric: string;
    yrc: string;
  } | null>(null);
  const [similarSongs, setSimilarSongs] = useState<Song[]>([]);
  const [songComments, setSongComments] = useState<{
    hotComments: Comment[];
    comments: Comment[];
    total: number;
  }>({
    hotComments: [],
    comments: [],
    total: 0
  });
  const [musicDetail, setMusicDetail] = useState<MusicDetail | null>(null);
  const [songList, setSongList] = useState<Song[]>([]);

  // 获取API基础URL
  const API_BASE = process.env.NEXT_PUBLIC_NETEASE_API_BASE;
  if (!API_BASE) {
    throw new Error('NEXT_PUBLIC_NETEASE_API_BASE environment variable is not set');
  }

  // 检测是否为Safari浏览器
  const isSafari = useCallback(() => {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }, []);

  const fetchLyrics = useCallback(async (songId: string) => {
    try {
      const res = await fetch(`${API_BASE}/lyric/new?id=${songId}&realIP=${userIP}`, {
        mode: 'cors',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!res.ok) {
        throw new Error(`获取歌词失败: ${res.status}`);
      }
      
      const data = await res.json();
      return {
        lrc: data.lrc?.lyric || '',
        tlyric: data.tlyric?.lyric || '',
        yrc: data.yrc?.lyric || '' // 逐字歌词
      };
    } catch (error) {
      console.error('获取歌词失败:', error);
      return null;
    }
  }, [userIP, API_BASE]);

  const fetchSimilarSongs = useCallback(async (songId: string) => {
    try {
      const res = await fetch(`${API_BASE}/simi/song?id=${songId}&realIP=${userIP}`, {
        mode: 'cors',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!res.ok) {
        throw new Error(`获取相似歌曲失败: ${res.status}`);
      }
      
      const data = await res.json();
      return data.songs || [];
    } catch (error) {
      console.error('获取相似歌曲失败:', error);
      return [];
    }
  }, [userIP, API_BASE]);

  const fetchSongComments = useCallback(async (songId: string, limit = 20) => {
    try {
      const res = await fetch(`${API_BASE}/comment/music?id=${songId}&limit=${limit}&realIP=${userIP}`, {
        mode: 'cors',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!res.ok) {
        throw new Error(`获取歌曲评论失败: ${res.status}`);
      }
      
      const data = await res.json();
      return {
        hotComments: data.hotComments || [],
        comments: data.comments || [],
        total: data.total || 0
      };
    } catch (error) {
      console.error('获取歌曲评论失败:', error);
      return {
        hotComments: [],
        comments: [],
        total: 0
      };
    }
  }, [userIP, API_BASE]);

  const fetchMusicDetail = useCallback(async (songId: string) => {
    try {
      const res = await fetch(`${API_BASE}/song/music/detail?id=${songId}&realIP=${userIP}`, {
        mode: 'cors',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!res.ok) {
        throw new Error(`获取音乐详情失败: ${res.status}`);
      }
      
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('获取音乐详情失败:', error);
      return null;
    }
  }, [userIP, API_BASE]);

  // 定义错误类型
  type ApiError = {
    name?: string;
    message: string;
  };

  const playNextSong = useCallback(() => {
    if (songList.length === 0) return;
    
    const currentIndex = currentSong 
      ? songList.findIndex(song => song.id === currentSong.id)
      : -1;
    
    // 从当前位置开始查找下一首可播放的歌曲
    let nextIndex = (currentIndex + 1) % songList.length;
    let attempts = 0;
    
    while (attempts < songList.length) {
      const nextSong = songList[nextIndex];
      if (nextSong.url) {
        setCurrentSong(nextSong);
        return;
      }
      nextIndex = (nextIndex + 1) % songList.length;
      attempts++;
    }
    
    // 如果所有歌曲都不可播放，显示错误
    console.error('没有可播放的歌曲');
  }, [songList, currentSong]);

  const switchSong = useCallback(async (targetSong: Song) => {
    if (switchingRef.current) {
      console.log('正在切换歌曲中，忽略新的切换请求');
      return;
    }

    try {
      switchingRef.current = true;
      setIsLoading(true);
      setError(null);
      
      // 立即更新UI显示
      setCurrentSong(targetSong);
      
      // 如果当前歌曲已经有URL，先尝试转换为HTTPS
      if (targetSong.url) {
        const secureUrl = await ensureHttps(targetSong.url);
        setAudioUrl(secureUrl);
        if (audioRef.current) {
          audioRef.current.crossOrigin = 'anonymous';
          audioRef.current.src = secureUrl;
          if (shouldAutoPlay.current && hasUserInteraction) {
            try {
              await audioRef.current.play();
              setIsPlaying(true);
            } catch (error: unknown) {
              if (error instanceof Error && error.name !== 'AbortError') {
                console.error('播放失败:', error);
                setIsPlaying(false);
                shouldAutoPlay.current = false;
              }
            }
          }
        }
      }

      // 并行获取所有需要的数据
      const [songDetail, lyrics, similarSongs, comments, musicDetail] = await Promise.all([
        fetch(`${API_BASE}/song/detail?ids=${targetSong.id}&realIP=${userIP}`).then(res => res.json()),
        fetchLyrics(targetSong.id),
        fetchSimilarSongs(targetSong.id),
        fetchSongComments(targetSong.id),
        fetchMusicDetail(targetSong.id)
      ]);

      const songDetailData = songDetail.songs?.[0];
      
      if (!songDetailData) {
        throw new Error('无法获取歌曲详情');
      }

      // 只有当歌曲没有URL时才重新获取
      if (!targetSong.url) {
        const res = await fetch(
          `${API_BASE}/song/url/v1?id=${targetSong.id}&level=standard&realIP=${userIP}`,
          {
            mode: 'cors',
            headers: {
              'Accept': 'application/json',
              'Origin': process.env.NEXT_PUBLIC_SITE_URL || 'https://ned-im-git-dev-15518658246163coms-projects.vercel.app'
            }
          }
        );
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        if (!data.data?.[0]?.url) {
          throw new Error('NO_URL');
        }

        const secureUrl = await ensureHttps(data.data[0].url);
        setAudioUrl(secureUrl);
        if (audioRef.current) {
          audioRef.current.crossOrigin = 'anonymous';
          audioRef.current.src = secureUrl;
          if (shouldAutoPlay.current && hasUserInteraction) {
            try {
              await audioRef.current.play();
              setIsPlaying(true);
            } catch (error: unknown) {
              if (error instanceof Error && error.name !== 'AbortError') {
                console.error('播放失败:', error);
                setIsPlaying(false);
                shouldAutoPlay.current = false;
              }
            }
          }
        }
      }

      // 更新歌曲相关信息
      if (lyrics) {
        setCurrentLyrics(lyrics);
      }
      if (similarSongs.length > 0) {
        setSimilarSongs(similarSongs);
      }
      if (comments) {
        setSongComments(comments);
      }
      if (musicDetail) {
        setMusicDetail(musicDetail);
      }
    } catch (error) {
      console.error('切换歌曲失败:', error);
      if (error instanceof Error) {
        if (error.message === 'NO_URL') {
          setError(`无法播放歌曲 "${targetSong.name}"，请尝试其他歌曲`);
        } else if (error.message.includes('403')) {
          setError(`歌曲 "${targetSong.name}" 暂时无法访问，可能是版权限制`);
        } else {
          setError(`播放失败: ${error.message}`);
        }
      }
      setIsPlaying(false);
      shouldAutoPlay.current = false;
      playNextSong();
    } finally {
      setIsLoading(false);
      switchingRef.current = false;
    }
  }, [userIP, hasUserInteraction, fetchLyrics, fetchSimilarSongs, fetchSongComments, fetchMusicDetail, API_BASE, playNextSong]);

  const playPrevSong = useCallback(() => {
    if (!playlist.length || switchingRef.current) return;
    
    shouldAutoPlay.current = true;
    setIsPlaying(true);
    const currentIndex = currentSong ? playlist.findIndex(song => song.id === currentSong.id) : -1;
    const prevIndex = currentIndex <= 0 ? playlist.length - 1 : currentIndex - 1;
    switchSong(playlist[prevIndex]);
  }, [playlist, currentSong, switchSong]);

  // 首次点击提示
  const showFirstClickTip = useCallback(() => {
    if (!hasUserInteraction) {
      setShowTip(true);
      setTimeout(() => {
        setShowTip(false);
      }, 3000);
    }
    setHasUserInteraction(true);
  }, [hasUserInteraction]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;

    showFirstClickTip();

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      shouldAutoPlay.current = false;
    } else {
      shouldAutoPlay.current = true;
      const playPromise = audioRef.current.play();
      playPromiseRef.current = playPromise;
      playPromise.then(() => {
        setIsPlaying(true);
      }).catch(error => {
        if (error.name !== 'AbortError') {
          console.error("播放失败:", error);
          setIsPlaying(false);
          shouldAutoPlay.current = false;
        }
      });
    }
  }, [isPlaying, showFirstClickTip]);

  // 初始化音频设置
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = DEFAULT_VOLUME;
    }
  }, []);

  // 获取用户IP
  useEffect(() => {
    const getIP = async () => {
      // 中国大陆IP池
      const cnIPs = [
        '116.25.146.177',  // 广东
        '211.136.150.66',  // 北京
        '223.104.63.35',   // 上海
        '120.241.0.0',     // 深圳
        '183.192.196.1'    // 杭州
      ];
      
      // 随机选择一个IP
      const randomIP = cnIPs[Math.floor(Math.random() * cnIPs.length)];
      setUserIP(randomIP);
    };

    getIP();
  }, []);

  // 获取歌单详情和所有歌曲的URL
  useEffect(() => {
    if (!userIP) return;
    
    const fetchPlaylist = async () => {
      try {
        const PLAYLIST_ID = process.env.NEXT_PUBLIC_NETEASE_PLAYLIST_ID;
        if (!PLAYLIST_ID) {
          console.error('未配置歌单ID');
          return;
        }

        // 获取歌单所有歌曲
        const playlistRes = await fetch(`${API_BASE}/playlist/track/all?id=${PLAYLIST_ID}&realIP=${userIP}`, {
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Origin': process.env.NEXT_PUBLIC_SITE_URL || 'https://ned-im-git-dev-15518658246163coms-projects.vercel.app'
          },
          credentials: 'omit'
        });

        if (!playlistRes.ok) {
          console.error('Error fetching playlist:', playlistRes.status, playlistRes.statusText);
          return;
        }

        const playlistData = await playlistRes.json();
        
        if (!playlistData.songs) {
          console.error('获取歌单失败:', playlistData);
          return;
        }

        const tracks = playlistData.songs;
        console.log(`获取到歌单中的${tracks.length}首歌曲`);
        
        // 分批获取歌曲URL (每次20首)
        const batchSize = 20;
        const songsWithUrls = [];
        
        for (let i = 0; i < tracks.length; i += batchSize) {
          const batch = tracks.slice(i, i + batchSize);
          const batchIds = batch.map((track: Song) => track.id).join(',');
          
          try {
            const urlRes = await fetch(
              `${API_BASE}/song/url/v1?id=${batchIds}&level=standard&realIP=${userIP}`,
              {
                mode: 'cors',
                headers: {
                  'Accept': 'application/json'
                }
              }
            );
            
            const urlData = await urlRes.json();
            
            // 将URL信息合并到歌曲信息中
            const batchWithUrls = batch.map((track: Song) => {
              const urlInfo = urlData.data?.find((item: UrlInfo) => item.id === track.id);
              return {
                ...track,
                url: urlInfo?.url || null
              };
            });
            
            songsWithUrls.push(...batchWithUrls);
          } catch (error: unknown) {
            console.error(`获取第${i/batchSize + 1}批歌曲URL失败:`, error);
            // 即使失败也继续处理其他批次
            const batchWithoutUrls = batch.map((track: Song) => ({
              ...track,
              url: null
            }));
            songsWithUrls.push(...batchWithoutUrls);
          }
        }

        // 过滤掉没有URL的歌曲
        const validSongs = songsWithUrls.filter(song => song.url);
        console.log(`成功获取到${validSongs.length}/${songsWithUrls.length}首歌的URL`);
        
        // 随机打乱歌曲顺序
        const shuffledSongs = [...validSongs].sort(() => Math.random() - 0.5);
        
        setSongList(shuffledSongs);
        setPlaylist(shuffledSongs);
        
        // 只在初始化时设置第一首歌曲
        if (shuffledSongs.length > 0 && isFirstLoad.current) {
          setCurrentSong(shuffledSongs[0]);
          isFirstLoad.current = false;
        }
      } catch (error) {
        console.error('Failed to fetch playlist:', error);
      }
    };

    fetchPlaylist();
  }, [userIP, API_BASE]);

  // 切换歌曲时的处理逻辑
  useEffect(() => {
    if (!currentSong || !audioRef.current) return;
    
    if (currentSong.url) {
      setIsLoading(true);
      setError(null);
      
      ensureHttps(currentSong.url)
        .then(finalUrl => {
          if (!finalUrl) {
            throw new Error('无效的音频地址');
          }
          
          setAudioUrl(finalUrl);
          if (audioRef.current) {
            audioRef.current.crossOrigin = 'anonymous';
            audioRef.current.src = finalUrl;
            
            // 添加安全属性
            audioRef.current.setAttribute('controlsList', 'nodownload');
            audioRef.current.setAttribute('x-webkit-airplay', 'deny');
            audioRef.current.setAttribute('disableRemotePlayback', '');
            
            if (finalUrl.startsWith('http://')) {
              console.warn('Using insecure HTTP audio source. This may be blocked by some browsers.');
              setShowTip(true);
              setTimeout(() => setShowTip(false), 5000);
            }
          }
        })
        .catch(err => {
          console.error('Error loading audio:', err);
          setError(`无法加载音频: ${err.message}`);
          playNextSong();
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      console.error('歌曲URL不存在:', currentSong.name);
      playNextSong();
    }
  }, [currentSong, playNextSong]);

  // 检测文本是否溢出
  const isTextOverflow = useCallback((text: string) => {
    if (textWidths[text] !== undefined) {
      return textWidths[text];
    }
    
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return false;

    // 设置与实际显示相同的字体
    context.font = window.getComputedStyle(document.body).font;
    const metrics = context.measureText(text);
    const isOverflow = metrics.width > 200; // 200px 是容器宽度

    setTextWidths(prev => ({
      ...prev,
      [text]: isOverflow
    }));

    return isOverflow;
  }, [textWidths]);

  // 重置文本溢出状态
  useEffect(() => {
    if (currentSong) {
      setTextWidths({}); // 切换歌曲时重置状态
    }
  }, [currentSong]);

  // 监听音频加载完成事件
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => {
      setIsBuffering(false);
      setError(null); // 清除之前的错误
      // 确保音频可以播放时设置正确的音量
      audio.volume = volume;
      
      // 如果是 VIP 歌曲且有预览起始时间，设置开始位置
      if (isVipSong && vipSongInfo?.previewStart) {
        audio.currentTime = vipSongInfo.previewStart;
      }
      
      // 如果正在播放状态，确保音频开始播放
      if (isPlaying && audio.readyState >= 3 && hasUserInteraction) {
        try {
          const playPromise = audio.play();
          playPromiseRef.current = playPromise;
          playPromise.catch(error => {
            if (error.name !== 'AbortError') {
              console.error("播放失败:", error);
              setIsPlaying(false);
              shouldAutoPlay.current = false;
              setError(`播放失败: ${error.message}`);
            }
          });
        } catch (error) {
          console.error("播放出错:", error);
          setIsPlaying(false);
          shouldAutoPlay.current = false;
          if (error instanceof Error) {
            setError(`播放出错: ${error.message}`);
          }
        }
      }
    };

    const handleWaiting = () => {
      setIsBuffering(true);
    };

    const handlePlaying = () => {
      setIsBuffering(false);
      setError(null); // 清除错误状态
    };

    const handleError = async (e: Event) => {
      const target = e.target as HTMLAudioElement;
      console.error("音频错误:", e, target.error);
      setIsBuffering(false);
      
      // 设置具体的错误信息
      if (target.error) {
        switch (target.error.code) {
          case MediaError.MEDIA_ERR_ABORTED:
            setError("播放被中断");
            break;
          case MediaError.MEDIA_ERR_NETWORK:
            setError("网络错误导致加载失败");
            break;
          case MediaError.MEDIA_ERR_DECODE:
            setError("音频解码失败");
            break;
          case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            setError("不支持的音频格式");
            break;
          default:
            setError(`播放错误: ${target.error.message}`);
        }
      }

      if (retryCount < MAX_RETRY_COUNT) {
        const nextRetryDelay = RETRY_DELAY * (retryCount + 1);
        setTimeout(async () => {
          console.log(`尝试重新加载音频 (${retryCount + 1}/${MAX_RETRY_COUNT})`);
          setRetryCount(prev => prev + 1);
          if (currentSong?.url) {
            const secureUrl = await ensureHttps(currentSong.url);
            target.src = secureUrl;
            target.load();
          }
        }, nextRetryDelay);
      } else {
        setIsPlaying(false);
        shouldAutoPlay.current = true;
        setTimeout(() => {
          console.log("重试次数已达上限，切换到下一首");
          playNextSong();
        }, 1000);
      }
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('error', handleError);
    
    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('error', handleError);
    };
  }, [volume, isPlaying, retryCount, playNextSong, hasUserInteraction, isVipSong, vipSongInfo, currentSong]);

  // 监听音频播放时间，处理 VIP 歌曲预览
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isVipSong || !previewDuration) return;

    const handleTimeUpdate = () => {
      const currentTime = audio.currentTime;
      const previewStart = vipSongInfo?.previewStart || 0;
      const previewEnd = vipSongInfo?.previewEnd || previewDuration;
      
      // 计算剩余预览时间
      const timeLeft = Math.max(0, previewEnd - currentTime);
      setPreviewTimeLeft(timeLeft);
      
      // 如果剩余时间小于 5 秒，显示提醒
      if (timeLeft <= 5 && !showPreviewEndWarning) {
        setShowPreviewEndWarning(true);
        // 5 秒后自动隐藏提醒
        setTimeout(() => setShowPreviewEndWarning(false), 5000);
      }
      
      // 如果超出预览时间，切换到下一首
      if (currentTime >= previewEnd) {
        console.log(`VIP歌曲预览结束 (${previewDuration}秒)，切换到下一首`);
        setIsPlaying(false);
        shouldAutoPlay.current = true;
        playNextSong();
      }
      
      // 如果当前时间小于预览开始时间，跳转到预览开始时间
      if (currentTime < previewStart) {
        audio.currentTime = previewStart;
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [isVipSong, previewDuration, playNextSong, vipSongInfo, showPreviewEndWarning]);

  // 处理点击外部收起
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (playerRef.current && !playerRef.current.contains(event.target as Node) && expanded) {
        setExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [expanded]);

  const resetExpandTimeout = useCallback(() => {
    if (expandTimeoutRef.current) {
      window.clearTimeout(expandTimeoutRef.current);
    }
    if (!isUserInteracting) {
      const timeoutId = window.setTimeout(() => {
        setExpanded(false);
      }, 3000) as unknown as NodeJS.Timeout;
      expandTimeoutRef.current = timeoutId;
    }
  }, [isUserInteracting]);

  // 处理用户交互状态
  const handleInteractionStart = useCallback(() => {
    setIsUserInteracting(true);
    if (expandTimeoutRef.current) {
      window.clearTimeout(expandTimeoutRef.current);
    }
  }, []);

  const handleInteractionEnd = useCallback(() => {
    setIsUserInteracting(false);
    resetExpandTimeout();
  }, [resetExpandTimeout]);

  // 处理自动收起
  useEffect(() => {
    if (expanded) {
      resetExpandTimeout();
    }
    return () => {
      if (expandTimeoutRef.current) {
        window.clearTimeout(expandTimeoutRef.current);
      }
    };
  }, [expanded, resetExpandTimeout]);

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value);
    if (!audioRef.current) return;
    
    // 保存当前播放状态
    const wasPlaying = !audioRef.current.paused;
    
    // 设置新音量
    audioRef.current.volume = newVolume;
    
    // 如果之前在播放，确保继续播放
    if (wasPlaying && audioRef.current.paused) {
      audioRef.current.play().catch(console.error);
    }
    
    setVolume(newVolume);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const time = Number.parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleEnded = () => {
    shouldAutoPlay.current = true;
    playNextSong();
  };

  // 提取封面主色调
  useEffect(() => {
    if (!currentSong?.al.picUrl) return;

    fac.getColorAsync(currentSong.al.picUrl, { 
      algorithm: 'dominant',
      crossOrigin: 'anonymous'
    })
      .then(color => {
        // 只取 RGB 值，忽略 alpha 通道
        setDominantColor([color.value[0], color.value[1], color.value[2]]);
      })
      .catch(error => {
        console.error("获取图片颜色失败:", error);
      });
  }, [currentSong?.al.picUrl]);

  // 生成背景样式
  const generateBackgroundStyle = (opacity = 0.8) => {
    const [r, g, b] = dominantColor;
    return {
      background: `linear-gradient(135deg, rgba(${r},${g},${b},${opacity}) 0%, rgba(${r},${g},${b},0) 100%)`,
      backdropFilter: 'blur(8px)',
    };
  };

  // 处理用户交互
  useEffect(() => {
    const handleUserInteraction = () => {
      setHasUserInteraction(true);
    };

    // 监听用户交互事件
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  const ensureHttps = useCallback(async (url: string): Promise<string> => {
    if (!url) return '';
    
    // 移除 URL 参数并验证 URL 格式
    const baseUrl = url.split('?')[0];
    
    // 验证 URL 是否来自允许的域名
    const allowedDomains = [
      'music.126.net',
      'm701.music.126.net',
      'm702.music.126.net',
      'm801.music.126.net',
      'm802.music.126.net'
    ];
    
    const urlObj = new URL(baseUrl);
    const isAllowedDomain = allowedDomains.some(domain => urlObj.hostname.endsWith(domain));
    
    if (!isAllowedDomain) {
      throw new Error('不受信任的音频来源');
    }

    // 如果已经是 HTTPS，验证后返回
    if (baseUrl.startsWith('https://')) {
      return baseUrl;
    }

    // 尝试 HTTPS 版本
    const httpsUrl = baseUrl.replace('http://', 'https://');
    try {
      const res = await fetch(httpsUrl, { 
        method: 'HEAD',
        headers: {
          'Accept': 'audio/*',
          'Sec-Fetch-Dest': 'audio',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'cross-site',
        }
      });
      
      if (res.ok) {
        return httpsUrl;
      }
    } catch (error) {
      console.warn(`HTTPS version not available for ${baseUrl}, falling back to HTTP with security warning`);
    }

    // 如果 HTTPS 不可用，显示安全警告
    setError('当前使用非加密连接播放音乐，建议使用 HTTPS 以提高安全性');
    return baseUrl;
  }, []);

  if (!currentSong) {
    return null;
  }

  const miniPlayer = (
    <div 
      className={`fixed ${expanded ? 'scale-0 opacity-0' : 'scale-100 opacity-100'} bottom-20 right-8 backdrop-blur-sm border rounded-full shadow-lg flex items-center gap-2 transition-all duration-300`}
      style={generateBackgroundStyle(0.6)}
    >
      {showTip && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs rounded-lg px-3 py-1.5 whitespace-nowrap">
          {audioUrl?.startsWith('http://') 
            ? '当前使用非加密连接播放音乐，部分浏览器可能会阻止播放'
            : '正在加载音乐资源，请稍候...'}
        </div>
      )}
      {isBuffering && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs rounded-lg px-3 py-1.5 whitespace-nowrap">
          缓冲中...
        </div>
      )}
      <button
        onClick={(e) => {
          e.stopPropagation();
          togglePlay();
        }}
        className={`p-2 hover:bg-white/10 rounded-full transition-colors ${isLoading || isBuffering ? 'opacity-50 cursor-wait' : ''}`}
        disabled={isLoading || isBuffering}
        aria-label={isPlaying ? "暂停" : "播放"}
      >
        {isLoading || isBuffering ? (
          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        ) : isPlaying ? (
          <IconPlayerPause className="w-4 h-4" />
        ) : (
          <IconPlayerPlay className="w-4 h-4" />
        )}
      </button>
      <button
        onClick={() => setExpanded(true)}
        className="flex items-center gap-2 py-1 pr-2 hover:bg-white/10 rounded-full transition-colors"
        aria-label="展开播放器"
      >
        <span className="text-sm max-w-[100px] truncate">
          {currentSong.name}
          {isVipSong && <span className="ml-1 text-xs text-yellow-400">(VIP预览)</span>}
          {previewTimeLeft !== null && previewTimeLeft <= 5 && (
            <span className="ml-1 text-xs text-yellow-400">
              ({Math.ceil(previewTimeLeft)}秒)
            </span>
          )}
        </span>
      </button>
    </div>
  );

  const fullPlayer = (
    <div 
      ref={playerRef}
      className={`fixed ${expanded ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} bottom-20 right-4 sm:right-8 backdrop-blur-sm border rounded-2xl p-3 sm:p-4 shadow-lg flex flex-col gap-3 sm:gap-4 w-[calc(100vw-2rem)] sm:w-[320px] max-w-[320px] transition-all duration-300 origin-bottom-right`}
      style={generateBackgroundStyle()}
      onMouseEnter={handleInteractionStart}
      onMouseLeave={handleInteractionEnd}
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
      onMouseMove={resetExpandTimeout}
      onFocus={handleInteractionStart}
      onBlur={handleInteractionEnd}
    >
      <audio
        ref={audioRef}
        src={audioUrl || undefined}
        crossOrigin="anonymous"
        onEnded={handleEnded}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onError={(e) => {
          console.error("音频加载失败:", e);
          const target = e.target as HTMLAudioElement;
          if (target.error?.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED) {
            setError("当前浏览器不支持该音频格式，请尝试使用 Chrome 浏览器");
          } else if (target.error?.code === MediaError.MEDIA_ERR_NETWORK) {
            setError("网络错误，请检查网络连接");
          }
          shouldAutoPlay.current = true;
          setIsPlaying(false);
          playNextSong();
        }}
      >
        <track kind="captions" src={undefined} srcLang="zh" label="Chinese" default />
      </audio>
      
      {/* 封面和信息区域 */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="relative">
          <img 
            ref={imgRef}
            src={currentSong.al.picUrl} 
            alt={`${currentSong.name} 封面`}
            className={`w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-xl shadow-lg ${isLoading ? 'opacity-50' : ''}`}
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0 overflow-hidden">
          <div className={`font-medium text-sm sm:text-base whitespace-nowrap ${isTextOverflow(currentSong.name) ? 'animate-marquee hover:pause' : ''}`}>
            {currentSong.name}
            {isVipSong && <span className="ml-1 text-xs text-yellow-400">(VIP预览)</span>}
            {previewTimeLeft !== null && previewTimeLeft <= 5 && (
              <span className="ml-1 text-xs text-yellow-400">
                ({Math.ceil(previewTimeLeft)}秒后结束)
              </span>
            )}
          </div>
          <div className={`text-xs sm:text-sm text-muted-foreground whitespace-nowrap ${isTextOverflow(currentSong.ar.map(artist => artist.name).join(", ")) ? 'animate-marquee hover:pause' : ''} mt-1`}>
            {currentSong.ar.map(artist => artist.name).join(", ")}
          </div>
          {/* 进度条 */}
          <div className="flex items-center gap-2 mt-2 sm:mt-3">
            <span className="text-xs text-muted-foreground min-w-[36px] sm:min-w-[40px]">
              {formatTime(currentTime)}
            </span>
            <div className="flex-1 relative">
              <input
                type="range"
                min="0"
                max={isVipSong && previewDuration ? previewDuration : (duration || 100)}
                value={currentTime}
                onChange={handleProgressChange}
                className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 sm:[&::-webkit-slider-thumb]:w-3 sm:[&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              />
              {isBuffering && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                </div>
              )}
            </div>
            <span className="text-xs text-muted-foreground min-w-[36px] sm:min-w-[40px]">
              {isVipSong && previewDuration ? formatTime(previewDuration) : formatTime(duration)}
            </span>
          </div>
          {vipSongInfo && (
            <div className="mt-1.5 sm:mt-2 text-xs text-yellow-400">
              {vipSongInfo.message}
            </div>
          )}
        </div>
      </div>

      {/* 控制按钮区域 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={toggleMute}
            className="p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label={isMuted ? "取消静音" : "静音"}
            disabled={isLoading || isBuffering}
          >
            {isMuted ? (
              <IconVolume3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            ) : (
              <IconVolume className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            disabled={isLoading || isBuffering}
            className="w-16 sm:w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 sm:[&::-webkit-slider-thumb]:w-3 sm:[&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={playPrevSong}
            className={`p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-colors ${isLoading || isBuffering ? 'opacity-50 cursor-wait' : ''}`}
            disabled={isLoading || isBuffering}
            aria-label="上一首"
          >
            <IconPlayerTrackPrev className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={togglePlay}
            className={`p-2 sm:p-3 hover:bg-white/10 rounded-full transition-colors ${isLoading || isBuffering ? 'opacity-50 cursor-wait' : ''}`}
            disabled={isLoading || isBuffering}
            aria-label={isPlaying ? "暂停" : "播放"}
          >
            {isLoading || isBuffering ? (
              <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : isPlaying ? (
              <IconPlayerPause className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <IconPlayerPlay className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>
          <button
            onClick={playNextSong}
            className={`p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-colors ${isLoading || isBuffering ? 'opacity-50 cursor-wait' : ''}`}
            disabled={isLoading || isBuffering}
            aria-label="下一首"
          >
            <IconPlayerTrackNext className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <button
          onClick={() => setExpanded(false)}
          className="p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-colors"
          aria-label="最小化"
        >
          <IconArrowsDiagonalMinimize className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {miniPlayer}
      {fullPlayer}
    </>
  );
} 
