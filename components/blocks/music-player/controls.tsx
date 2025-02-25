"use client";

import { IconPlayerPause, IconPlayerPlay, IconPlayerTrackNext, IconPlayerTrackPrev } from "@tabler/icons-react";

interface MusicPlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  disabled: boolean;
}

export function MusicPlayerControls({
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
  disabled
}: MusicPlayerControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={onPrev}
        disabled={disabled}
        className="p-2 rounded-full hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="上一首"
      >
        <IconPlayerTrackPrev className="w-5 h-5 text-white" />
      </button>
      
      <button
        onClick={onPlayPause}
        disabled={disabled}
        className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={isPlaying ? "暂停" : "播放"}
      >
        {isPlaying ? (
          <IconPlayerPause className="w-6 h-6 text-white" />
        ) : (
          <IconPlayerPlay className="w-6 h-6 text-white" />
        )}
      </button>
      
      <button
        onClick={onNext}
        disabled={disabled}
        className="p-2 rounded-full hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="下一首"
      >
        <IconPlayerTrackNext className="w-5 h-5 text-white" />
      </button>
    </div>
  );
} 