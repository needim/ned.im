"use client";

import Image from 'next/image';

interface Song {
  id: string;
  name: string;
  ar: { name: string }[];
  al: {
    name: string;
    picUrl: string;
  };
  url?: string;
}

interface MusicPlayerInfoProps {
  currentSong: Song | null;
  expanded: boolean;
  isVipSong: boolean;
}

export function MusicPlayerInfo({
  currentSong,
  expanded,
  isVipSong
}: MusicPlayerInfoProps) {
  if (!currentSong) {
    return (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-zinc-800 rounded-md animate-pulse" />
        <div className="flex flex-col">
          <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
          <div className="h-3 w-16 bg-zinc-800 rounded mt-1 animate-pulse" />
        </div>
      </div>
    );
  }

  const artistNames = currentSong.ar.map(artist => artist.name).join(', ');
  
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-10 h-10 rounded-md overflow-hidden">
        <Image
          src={currentSong.al.picUrl}
          alt={currentSong.name}
          width={40}
          height={40}
          className="object-cover"
        />
      </div>
      
      <div className="flex flex-col overflow-hidden">
        <div className="flex items-center">
          <p className="text-sm font-medium text-white truncate max-w-[150px]">
            {currentSong.name}
          </p>
          {isVipSong && (
            <span className="ml-1 px-1 text-[10px] bg-yellow-500/80 text-white rounded">VIP</span>
          )}
        </div>
        
        <p className="text-xs text-white/70 truncate max-w-[150px]">
          {artistNames}
        </p>
      </div>
    </div>
  );
} 