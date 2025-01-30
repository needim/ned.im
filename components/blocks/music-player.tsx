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
  const [audioUrl, setAudioUrl] = useState("");
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

  // 检测是否为Safari浏览器
  const isSafari = useCallback(() => {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }, []);

  const switchSong = useCallback(async (targetSong: Song) => {
    if (switchingRef.current) {
      console.log('正在切换歌曲中，忽略新的切换请求');
      return;
    }

    try {
      switchingRef.current = true;
      setIsLoading(true);
      
      // 立即更新UI显示
      setCurrentSong(targetSong);
      
      // 暂停当前音频
      if (audioRef.current) {
        audioRef.current.pause();
      }

      // 获取新歌曲的URL
      const API_BASE = process.env.NEXT_PUBLIC_NETEASE_API_BASE;
      
      // 获取音频URL
      const res = await fetch(`${API_BASE}/song/url/v1?id=${targetSong.id}&level=standard&realIP=${userIP}`, {
        mode: 'cors',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      
      if (!data.data?.[0]?.url) {
        throw new Error('NO_URL');
      }

      if (audioRef.current) {
        audioRef.current.src = data.data[0].url;
        if (shouldAutoPlay.current && hasUserInteraction) {
          await audioRef.current.play();
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error('切换歌曲失败:', error);
      playNextSong();
    } finally {
      setIsLoading(false);
      switchingRef.current = false;
    }
  }, [userIP, hasUserInteraction]);

  const playNextSong = useCallback(() => {
    if (!playlist.length || switchingRef.current) return;
    
    shouldAutoPlay.current = true;
    setIsPlaying(true);
    const currentIndex = currentSong ? playlist.findIndex(song => song.id === currentSong.id) : -1;
    const nextIndex = currentIndex === playlist.length - 1 ? 0 : currentIndex + 1;
    switchSong(playlist[nextIndex]);
  }, [playlist, currentSong, switchSong]);

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
      const ipServices = [
        'https://api.ipify.org?format=json',
        'https://api.myip.com',
        'https://api.ip.sb/jsonip'
      ];
      
      for (const service of ipServices) {
        try {
          const res = await fetch(service);
          const data = await res.json();
          // Different services return IP in different formats
          const ip = data.ip || data.IP;
          if (ip) {
            setUserIP(ip);
            return;
          }
        } catch (error) {
          console.error(`获取IP失败 (${service}):`, error);
        }
      }
      
      // If all services fail, use fallback IP
      console.warn('所有IP服务均失败，使用备用IP');
      setUserIP('116.25.146.177');
    };

    getIP();
  }, []);

  // 获取歌单详情
  useEffect(() => {
    if (!userIP) return; // 等待 IP 获取完成
    
    const API_BASE = process.env.NEXT_PUBLIC_NETEASE_API_BASE;
    const PLAYLIST_ID = process.env.NEXT_PUBLIC_NETEASE_PLAYLIST_ID;
    
    const fetchPlaylist = async (retryCount = 0) => {
      try {
        // 先获取歌单基本信息
        const playlistRes = await fetch(`${API_BASE}/playlist/detail?id=${PLAYLIST_ID}&realIP=${userIP}`, {
          mode: 'cors',
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (!playlistRes.ok) {
          throw new Error(`获取歌单失败: ${playlistRes.status}`);
        }
        
        const data = await playlistRes.json();
        if (!data.playlist) {
          throw new Error('歌单数据格式错误');
        }
        
        const trackCount = data.playlist.trackCount;
        console.log('歌单总曲目数:', trackCount);
        
        // 使用 track_count 获取完整歌单
        const fullPlaylistRes = await fetch(
          `${API_BASE}/playlist/track/all?id=${PLAYLIST_ID}&realIP=${userIP}`,
          {
            mode: 'cors',
            headers: {
              'Accept': 'application/json'
            }
          }
        );
        
        if (!fullPlaylistRes.ok) {
          throw new Error(`获取完整歌单失败: ${fullPlaylistRes.status}`);
        }
        
        const fullPlaylistData = await fullPlaylistRes.json();
        if (!fullPlaylistData.songs || !Array.isArray(fullPlaylistData.songs)) {
          throw new Error('完整歌单数据格式错误');
        }
        
        // 过滤掉无效歌曲
        const validSongs = fullPlaylistData.songs.filter((song: { id: number; name: string; fee?: number }) => 
          song?.id && song?.name && 
          (!song?.fee || song.fee === 0 || song.fee === 8)  // 免费或 VIP 可试听
        );
        
        if (validSongs.length === 0) {
          throw new Error('没有可播放的歌曲');
        }
        
        console.log('可播放歌曲数:', validSongs.length);
        setPlaylist(validSongs);
        setCurrentSong(validSongs[0]);
        setError(null); // 清除错误状态
        
      } catch (error) {
        console.error('获取歌单失败:', error);
        
        // 最多重试3次
        if (retryCount < 3) {
          console.log(`重试获取歌单 (${retryCount + 1}/3)...`);
          setTimeout(() => fetchPlaylist(retryCount + 1), 1000 * (retryCount + 1));
        } else {
          setError('获取歌单失败，请稍后再试');
        }
      }
    };
    
    fetchPlaylist();
  }, [userIP]);

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

  // 获取音频URL
  useEffect(() => {
    if (!currentSong || !userIP) return;
    const API_BASE = process.env.NEXT_PUBLIC_NETEASE_API_BASE;
    
    const fetchAudioUrl = async () => {
      try {
        console.log('正在获取歌曲详情:', currentSong.name);
        // 先获取歌曲详情
        const detailRes = await fetch(`${API_BASE}/song/detail?ids=${currentSong.id}&realIP=${userIP}`, {
          mode: 'cors',
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (!detailRes.ok) {
          throw new Error(`获取歌曲详情失败! status: ${detailRes.status}`);
        }
        
        const detailData = await detailRes.json();
        console.log('歌曲详情:', detailData);
        
        // 检查歌曲是否为VIP
        const songDetail = detailData.songs?.[0];
        if (!songDetail) {
          throw new Error('无法获取歌曲详情');
        }
        
        const isVip = songDetail.fee === 1;
        setIsVipSong(isVip);
        console.log('是否为VIP歌曲:', isVip);
        
        // 获取音频URL，对VIP歌曲尝试更高品质
        const quality = isVip ? 'higher' : 'standard';
        const res = await fetch(
          `${API_BASE}/song/url/v1?id=${currentSong.id}&level=${quality}&realIP=${userIP}`, {
          mode: 'cors',
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        console.log('音频URL响应:', data);
        
        // 检查返回的数据结构
        if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
          console.error('无效的API响应格式:', data);
          throw new Error('INVALID_RESPONSE');
        }
        
        const songData = data.data[0];
        
        // 检查返回的音频信息
        console.log('音频详细信息:', {
          url: songData.url,
          type: songData.type,
          size: songData.size,
          level: songData.level,
          fee: songData.fee,
          freeTrialInfo: songData.freeTrialInfo
        });

        if (!songData.url) {
          if (songData.code === -110) {
            throw new Error('REGION_RESTRICTED');
          }
          
          // VIP 歌曲特殊处理
          if (isVip) {
            setVipSongInfo({
              canPreview: false,
              message: '此 VIP 歌曲暂不支持试听'
            });
            throw new Error('VIP_NO_PREVIEW');
          }
          
          console.error('API响应中没有音频URL:', songData);
          throw new Error('NO_URL');
        }
        
        // 处理 VIP 歌曲的试听信息
        if (isVip) {
          if (songData.freeTrialInfo) {
            const { start, end } = songData.freeTrialInfo;
            const previewTime = end - start;
            setPreviewDuration(previewTime);
            setVipSongInfo({
              canPreview: true,
              previewStart: start,
              previewEnd: end,
              message: `VIP 歌曲 ${previewTime} 秒试听`
            });
            console.log('预览时长:', previewTime, '秒');
          } else {
            // 某些 VIP 歌曲可能没有 freeTrialInfo 但仍可以播放
            const defaultPreviewTime = 30;
            setPreviewDuration(defaultPreviewTime);
            setVipSongInfo({
              canPreview: true,
              message: `VIP 歌曲 ${defaultPreviewTime} 秒试听`
            });
            console.log('使用默认预览时长:', defaultPreviewTime, '秒');
          }
        } else {
          setPreviewDuration(null);
          setVipSongInfo(null);
        }
        
        const audioUrl = songData.url;
        console.log('获取到音频URL:', audioUrl);
        
        if (audioRef.current) {
          audioRef.current.src = audioUrl;
          
          if (shouldAutoPlay.current && !isFirstLoad.current && hasUserInteraction) {
            try {
              const playPromise = audioRef.current.play();
              playPromiseRef.current = playPromise;
              
              await playPromise;
              setIsPlaying(true);
              console.log('歌曲开始播放:', currentSong.name);
            } catch (error) {
              if (error instanceof Error && error.name !== 'AbortError') {
                console.error('播放失败:', error.message);
                setIsPlaying(false);
                shouldAutoPlay.current = false;
              }
            }
          } else {
            console.log('不满足自动播放条件:', {
              shouldAutoPlay: shouldAutoPlay.current,
              isFirstLoad: isFirstLoad.current,
              hasUserInteraction
            });
          }
        }
        isFirstLoad.current = false;
        setRetryCount(0); // 重置重试计数
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('获取音频URL失败:', {
          song: currentSong.name,
          error: errorMessage
        });
        
        // 特殊错误处理
        if (errorMessage === 'VIP_NO_PREVIEW') {
          setRetryCount(MAX_RETRY_COUNT); // 不再重试
          return;
        }
        
        if (retryCount < MAX_RETRY_COUNT) {
          const nextRetryDelay = RETRY_DELAY * (retryCount + 1);
          console.log(`将在 ${nextRetryDelay}ms 后重试 (${retryCount + 1}/${MAX_RETRY_COUNT})`);
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, nextRetryDelay);
        } else {
          console.log('达到最大重试次数，跳转到下一首歌');
          setIsPlaying(false);
          shouldAutoPlay.current = true;
          setTimeout(() => {
            playNextSong();
          }, 1000);
        }
      }
    };
    
    fetchAudioUrl();
  }, [currentSong, retryCount, hasUserInteraction, playNextSong, userIP]);

  // 监听音频加载完成事件
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => {
      setIsBuffering(false);
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
            }
          });
        } catch (error) {
          console.error("播放出错:", error);
          setIsPlaying(false);
          shouldAutoPlay.current = false;
        }
      }
    };

    const handleWaiting = () => {
      setIsBuffering(true);
    };

    const handlePlaying = () => {
      setIsBuffering(false);
    };

    const handleError = (e: ErrorEvent) => {
      console.error("音频错误:", e);
      setIsBuffering(false);
      if (retryCount < MAX_RETRY_COUNT) {
        const nextRetryDelay = RETRY_DELAY * (retryCount + 1);
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
        }, nextRetryDelay);
      } else {
        setIsPlaying(false);
        shouldAutoPlay.current = true;
        setTimeout(() => {
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
  }, [volume, isPlaying, retryCount, playNextSong, hasUserInteraction, isVipSong, vipSongInfo]);

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
    if (expandTimeout) {
      window.clearTimeout(expandTimeout);
    }
    if (!isUserInteracting) {
      const newTimeout = window.setTimeout(() => {
        setExpanded(false);
      }, 3000);
      setExpandTimeout(newTimeout);
    }
  }, [expandTimeout, isUserInteracting]);

  // 处理用户交互状态
  const handleInteractionStart = useCallback(() => {
    setIsUserInteracting(true);
    if (expandTimeout) {
      window.clearTimeout(expandTimeout);
    }
  }, [expandTimeout]);

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
      if (expandTimeout) {
        window.clearTimeout(expandTimeout);
      }
    };
  }, [expanded, expandTimeout, resetExpandTimeout]);

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
          正在加载音乐资源，请稍候...
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
      className={`fixed ${expanded ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} bottom-20 right-8 backdrop-blur-sm border rounded-2xl p-4 shadow-lg flex flex-col gap-4 w-[320px] transition-all duration-300 origin-bottom-right`}
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
        onEnded={handleEnded}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onError={(e) => {
          console.error("音频加载失败:", e);
          shouldAutoPlay.current = true;
          setIsPlaying(false);
          playNextSong();
        }}
      >
        <track kind="captions" src={undefined} srcLang="zh" label="Chinese" default />
      </audio>
      
      {/* 封面和信息区域 */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <img 
            ref={imgRef}
            src={currentSong.al.picUrl} 
            alt={`${currentSong.name} 封面`}
            className={`w-24 h-24 flex-shrink-0 rounded-xl shadow-lg ${isLoading ? 'opacity-50' : ''}`}
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0 overflow-hidden">
          <div className={`font-medium text-base whitespace-nowrap ${isTextOverflow(currentSong.name) ? 'animate-marquee hover:pause' : ''}`}>
            {currentSong.name}
            {isVipSong && <span className="ml-1 text-xs text-yellow-400">(VIP预览)</span>}
            {previewTimeLeft !== null && previewTimeLeft <= 5 && (
              <span className="ml-1 text-xs text-yellow-400">
                ({Math.ceil(previewTimeLeft)}秒后结束)
              </span>
            )}
          </div>
          <div className={`text-sm text-muted-foreground whitespace-nowrap ${isTextOverflow(currentSong.ar.map(artist => artist.name).join(", ")) ? 'animate-marquee hover:pause' : ''} mt-1`}>
            {currentSong.ar.map(artist => artist.name).join(", ")}
          </div>
          {/* 进度条 */}
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs text-muted-foreground min-w-[40px]">
              {formatTime(currentTime)}
            </span>
            <div className="flex-1 relative">
              <input
                type="range"
                min="0"
                max={isVipSong && previewDuration ? previewDuration : (duration || 100)}
                value={currentTime}
                onChange={handleProgressChange}
                className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              />
              {isBuffering && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                </div>
              )}
            </div>
            <span className="text-xs text-muted-foreground min-w-[40px]">
              {isVipSong && previewDuration ? formatTime(previewDuration) : formatTime(duration)}
            </span>
          </div>
          {vipSongInfo && (
            <div className="mt-2 text-xs text-yellow-400">
              {vipSongInfo.message}
            </div>
          )}
        </div>
      </div>

      {/* 控制按钮区域 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label={isMuted ? "取消静音" : "静音"}
            disabled={isLoading || isBuffering}
          >
            {isMuted ? (
              <IconVolume3 className="w-4 h-4" />
            ) : (
              <IconVolume className="w-4 h-4" />
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
            className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={playPrevSong}
            className={`p-2 hover:bg-white/10 rounded-full transition-colors ${isLoading || isBuffering ? 'opacity-50 cursor-wait' : ''}`}
            disabled={isLoading || isBuffering}
            aria-label="上一首"
          >
            <IconPlayerTrackPrev className="w-5 h-5" />
          </button>
          <button
            onClick={togglePlay}
            className={`p-3 hover:bg-white/10 rounded-full transition-colors ${isLoading || isBuffering ? 'opacity-50 cursor-wait' : ''}`}
            disabled={isLoading || isBuffering}
            aria-label={isPlaying ? "暂停" : "播放"}
          >
            {isLoading || isBuffering ? (
              <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : isPlaying ? (
              <IconPlayerPause className="w-6 h-6" />
            ) : (
              <IconPlayerPlay className="w-6 h-6" />
            )}
          </button>
          <button
            onClick={playNextSong}
            className={`p-2 hover:bg-white/10 rounded-full transition-colors ${isLoading || isBuffering ? 'opacity-50 cursor-wait' : ''}`}
            disabled={isLoading || isBuffering}
            aria-label="下一首"
          >
            <IconPlayerTrackNext className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={() => setExpanded(false)}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
          aria-label="最小化"
        >
          <IconArrowsDiagonalMinimize className="w-4 h-4" />
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
