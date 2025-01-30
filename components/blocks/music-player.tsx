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

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const shouldAutoPlay = useRef<boolean>(false);
  const expandTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const playerRef = useRef<HTMLDivElement | null>(null);
  const playPromiseRef = useRef<Promise<void> | undefined>(undefined);
  const isFirstLoad = useRef<boolean>(true);
  const imgRef = useRef<HTMLImageElement>(null);

  // 检测是否为Safari浏览器
  const isSafari = () => {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  };

  const playNextSong = useCallback(() => {
    if (!playlist.length) return;
    
    // 暂停当前音频
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    // 设置状态以确保下一首歌会自动播放
    shouldAutoPlay.current = true;
    setIsPlaying(true);  // 立即更新播放状态
    const currentIndex = currentSong ? playlist.findIndex(song => song.id === currentSong.id) : -1;
    const nextIndex = currentIndex === playlist.length - 1 ? 0 : currentIndex + 1;
    setCurrentSong(playlist[nextIndex]);
  }, [playlist, currentSong]);

  const resetExpandTimeout = useCallback(() => {
    if (expandTimeoutRef.current) {
      clearTimeout(expandTimeoutRef.current);
    }
    if (expanded) {
      expandTimeoutRef.current = setTimeout(() => {
        setExpanded(false);
      }, 1000);
    }
  }, [expanded]);

  // 初始化音频设置
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = DEFAULT_VOLUME;
    }
  }, []);

  // 获取歌单详情
  useEffect(() => {
    const API_BASE = process.env.NEXT_PUBLIC_NETEASE_API_BASE;
    const PLAYLIST_ID = process.env.NEXT_PUBLIC_NETEASE_PLAYLIST_ID;
    
    // 先获取歌单基本信息
    fetch(`${API_BASE}/playlist/detail?id=${PLAYLIST_ID}`, {
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Origin': window.location.origin
      }
    })
      .then(res => res.json())
      .then(async data => {
        if (data.playlist) {
          const trackCount = data.playlist.trackCount;
          console.log('歌单总曲目数:', trackCount);
          
          // 使用 track_count 获取完整歌单
          const fullPlaylistResponse = await fetch(
            `${API_BASE}/playlist/track/all?id=${PLAYLIST_ID}`,
            {
              mode: 'cors',
              headers: {
                'Accept': 'application/json',
                'Origin': window.location.origin
              }
            }
          );
          const fullPlaylistData = await fullPlaylistResponse.json();
          
          if (fullPlaylistData.songs) {
            console.log('获取到歌曲数量:', fullPlaylistData.songs.length);
            // 随机打乱歌单
            const shuffledPlaylist = [...fullPlaylistData.songs].sort(() => Math.random() - 0.5);
            // 确保获取到完整的歌单
            if (shuffledPlaylist.length > 0) {
              setPlaylist(shuffledPlaylist);
              setCurrentSong(shuffledPlaylist[0]);
              isFirstLoad.current = true;
              shouldAutoPlay.current = false;
            } else {
              console.error("歌单为空");
            }
          } else {
            console.error("获取完整歌单失败");
            console.log("API 返回数据:", fullPlaylistData);
          }
        } else {
          console.error("获取歌单信息失败");
        }
      })
      .catch(error => {
        console.error("获取歌单失败:", error);
      });
  }, []);

  // 获取音频URL
  useEffect(() => {
    if (!currentSong) return;
    const API_BASE = process.env.NEXT_PUBLIC_NETEASE_API_BASE;
    
    const fetchAudioUrl = async () => {
      try {
        const res = await fetch(`${API_BASE}/song/url?id=${currentSong.id}`, {
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Origin': window.location.origin
          }
        });
        const data = await res.json();
        
        if (data.data?.[0]?.url) {
          if (audioRef.current) {
            audioRef.current.src = data.data[0].url;
            // 只有在用户已交互或不是Safari的情况下自动播放
            if (shouldAutoPlay.current && !isFirstLoad.current && (hasUserInteraction || !isSafari())) {
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
          }
          isFirstLoad.current = false;
          setRetryCount(0); // 重置重试计数
        } else {
          throw new Error("No audio URL in response");
        }
      } catch (error) {
        console.error("获取音频URL失败:", error);
        if (retryCount < MAX_RETRY_COUNT) {
          // 延迟重试
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
            fetchAudioUrl();
          }, RETRY_DELAY);
        } else {
          setIsPlaying(false);
          shouldAutoPlay.current = true;
          playNextSong();
        }
      }
    };
    
    fetchAudioUrl();
  }, [currentSong, retryCount, hasUserInteraction, playNextSong]);

  // 监听音频加载完成事件
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => {
      // 确保音频可以播放时设置正确的音量
      audio.volume = volume;
      
      // 如果正在播放状态，确保音频开始播放
      if (isPlaying && audio.readyState >= 3) {
        const playPromise = audio.play();
        playPromiseRef.current = playPromise;
        playPromise.catch(error => {
          if (error.name !== 'AbortError') {
            console.error("播放失败:", error);
            setIsPlaying(false);
            shouldAutoPlay.current = false;
          }
        });
      }
    };

    audio.addEventListener('canplay', handleCanPlay);
    
    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [volume, isPlaying]);

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

  // 处理自动收起
  useEffect(() => {
    if (expanded) {
      if (expandTimeoutRef.current) {
        clearTimeout(expandTimeoutRef.current);
      }
      expandTimeoutRef.current = setTimeout(() => {
        setExpanded(false);
      }, 3000); // 5秒后自动收起
    }
    return () => {
      if (expandTimeoutRef.current) {
        clearTimeout(expandTimeoutRef.current);
      }
    };
  }, [expanded]);

  const playPrevSong = () => {
    if (!playlist.length) return;
    
    // 暂停当前音频
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    // 设置状态以确保上一首歌会自动播放
    shouldAutoPlay.current = true;
    setIsPlaying(true);  // 立即更新播放状态
    const currentIndex = currentSong ? playlist.findIndex(song => song.id === currentSong.id) : -1;
    const prevIndex = currentIndex <= 0 ? playlist.length - 1 : currentIndex - 1;
    setCurrentSong(playlist[prevIndex]);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    // 标记用户已交互
    setHasUserInteraction(true);

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
  };

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
      <button
        onClick={(e) => {
          e.stopPropagation();
          togglePlay();
        }}
        className="p-2 hover:bg-white/10 rounded-full transition-colors"
        aria-label={isPlaying ? "暂停" : "播放"}
      >
        {isPlaying ? (
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
        <span className="text-sm max-w-[100px] truncate">{currentSong.name}</span>
      </button>
    </div>
  );

  const fullPlayer = (
    <div 
      ref={playerRef}
      className={`fixed ${expanded ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} bottom-20 right-8 backdrop-blur-sm border rounded-2xl p-4 shadow-lg flex flex-col gap-4 w-[320px] transition-all duration-300 origin-bottom-right`}
      style={generateBackgroundStyle()}
      onMouseMove={resetExpandTimeout}
      onMouseDown={resetExpandTimeout}
      onKeyDown={resetExpandTimeout}
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
        <img 
          ref={imgRef}
          src={currentSong.al.picUrl} 
          alt={`${currentSong.name} 封面`}
          className={`w-24 h-24 flex-shrink-0 rounded-xl shadow-lg`}
        />
        <div className="flex-1 min-w-0 overflow-hidden">
          <div className="font-medium text-base whitespace-nowrap animate-marquee hover:pause">
            {currentSong.name}
          </div>
          <div className="text-sm text-muted-foreground whitespace-nowrap animate-marquee hover:pause mt-1">
            {currentSong.ar.map(artist => artist.name).join(", ")}
          </div>
          {/* 进度条 */}
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs text-muted-foreground min-w-[40px]">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleProgressChange}
              className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
            />
            <span className="text-xs text-muted-foreground min-w-[40px]">
              {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>

      {/* 控制按钮区域 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label={isMuted ? "取消静音" : "静音"}
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
            className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={playPrevSong}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="上一首"
          >
            <IconPlayerTrackPrev className="w-5 h-5" />
          </button>
          <button
            onClick={togglePlay}
            className="p-3 hover:bg-white/10 rounded-full transition-colors"
            aria-label={isPlaying ? "暂停" : "播放"}
          >
            {isPlaying ? (
              <IconPlayerPause className="w-6 h-6" />
            ) : (
              <IconPlayerPlay className="w-6 h-6" />
            )}
          </button>
          <button
            onClick={playNextSong}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
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
