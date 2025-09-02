"use client";

interface MusicPlayerProgressProps {
	currentTime: number;
	duration: number;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	formatTime: (time: number) => string;
}

export function MusicPlayerProgress({
	currentTime,
	duration,
	onChange,
	formatTime,
}: MusicPlayerProgressProps) {
	const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

	return (
		<div className="flex items-center gap-2 w-full max-w-md">
			<span className="text-xs text-white/80 min-w-[40px]">
				{formatTime(currentTime)}
			</span>

			<div className="relative flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
				<input
					type="range"
					min={0}
					max={duration}
					value={currentTime}
					onChange={onChange}
					className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
					aria-label="进度条"
				/>
				<div
					className="h-full bg-white/80 rounded-full"
					style={{ width: `${progress}%` }}
				/>
			</div>

			<span className="text-xs text-white/80 min-w-[40px] text-right">
				{formatTime(duration)}
			</span>
		</div>
	);
}
