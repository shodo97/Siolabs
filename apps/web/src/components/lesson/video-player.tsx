'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import ReactPlayer from 'react-player';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  RotateCcw,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatVideoTime } from '@/lib/utils';
import { VIDEO_SAVE_INTERVAL_MS, VIDEO_COMPLETION_THRESHOLD } from '@/lib/constants';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

interface VideoPlayerProps {
  url: string;
  initialPosition?: number;
  onProgress?: (position: number) => void;
  onWatchedEnough?: () => void;
  className?: string;
}

export function VideoPlayer({
  url,
  initialPosition = 0,
  onProgress,
  onWatchedEnough,
  className,
}: VideoPlayerProps) {
  const playerRef = useRef<ReactPlayer>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [played, setPlayed] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [hasWatchedEnough, setHasWatchedEnough] = useState(false);
  const [showResumePrompt, setShowResumePrompt] = useState(initialPosition > 10);
  const [isReady, setIsReady] = useState(false);

  const controlsTimeoutRef = useRef<NodeJS.Timeout>();
  const progressSaveRef = useRef<NodeJS.Timeout>();

  // Save progress periodically
  useEffect(() => {
    if (!isPlaying || !onProgress) return;

    progressSaveRef.current = setInterval(() => {
      if (playerRef.current) {
        const currentTime = playerRef.current.getCurrentTime();
        onProgress(Math.floor(currentTime));
      }
    }, VIDEO_SAVE_INTERVAL_MS);

    return () => {
      if (progressSaveRef.current) {
        clearInterval(progressSaveRef.current);
      }
    };
  }, [isPlaying, onProgress]);

  // Handle mouse movement for controls visibility
  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  }, [isPlaying]);

  // Seek to position
  const handleSeek = (value: number[]) => {
    const seekTo = value[0];
    setPlayed(seekTo);
    playerRef.current?.seekTo(seekTo);
  };

  // Handle progress update
  const handleProgress = (state: { played: number; loaded: number }) => {
    setPlayed(state.played);
    setLoaded(state.loaded);

    // Check if watched enough
    if (!hasWatchedEnough && state.played >= VIDEO_COMPLETION_THRESHOLD) {
      setHasWatchedEnough(true);
      onWatchedEnough?.();
    }
  };

  // Handle video ready
  const handleReady = () => {
    setIsReady(true);
  };

  // Handle duration
  const handleDuration = (d: number) => {
    setDuration(d);
  };

  // Resume from position
  const handleResume = () => {
    playerRef.current?.seekTo(initialPosition, 'seconds');
    setShowResumePrompt(false);
    setIsPlaying(true);
  };

  // Start from beginning
  const handleStartOver = () => {
    setShowResumePrompt(false);
    setIsPlaying(true);
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen();
    }
  };

  // Playback rate options
  const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2];

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative aspect-video overflow-hidden rounded-xl bg-gray-900',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video */}
      <ReactPlayer
        ref={playerRef}
        url={url}
        width="100%"
        height="100%"
        playing={isPlaying}
        muted={isMuted}
        volume={volume}
        playbackRate={playbackRate}
        onReady={handleReady}
        onProgress={handleProgress}
        onDuration={handleDuration}
        onEnded={() => setIsPlaying(false)}
        progressInterval={1000}
        config={{
          file: {
            attributes: {
              controlsList: 'nodownload',
            },
          },
        }}
      />

      {/* Resume prompt overlay */}
      {showResumePrompt && isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <div className="text-center">
            <p className="text-lg text-white">
              Resume from {formatVideoTime(initialPosition)}?
            </p>
            <div className="mt-4 flex gap-3">
              <Button variant="outline" onClick={handleStartOver}>
                Start Over
              </Button>
              <Button onClick={handleResume}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Resume
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Play button overlay (when paused) */}
      {!isPlaying && !showResumePrompt && isReady && (
        <button
          onClick={() => setIsPlaying(true)}
          className="absolute inset-0 flex items-center justify-center bg-black/30 transition hover:bg-black/40"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 shadow-lg transition hover:scale-105">
            <Play className="h-10 w-10 text-gray-900 ml-1" />
          </div>
        </button>
      )}

      {/* Controls overlay */}
      <div
        className={cn(
          'absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300',
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
        )}
      >
        {/* Progress bar */}
        <div className="mb-3">
          <Slider
            value={[played]}
            max={1}
            step={0.001}
            onValueChange={handleSeek}
            className="cursor-pointer"
          />
          <div className="mt-1 flex justify-between text-xs text-white/70">
            <span>{formatVideoTime(played * duration)}</span>
            <span>{formatVideoTime(duration)}</span>
          </div>
        </div>

        {/* Control buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Play/Pause */}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>

            {/* Volume */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>
              <Slider
                value={[isMuted ? 0 : volume]}
                max={1}
                step={0.1}
                onValueChange={(v) => {
                  setVolume(v[0]);
                  setIsMuted(false);
                }}
                className="w-20"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Playback speed */}
            <select
              value={playbackRate}
              onChange={(e) => setPlaybackRate(Number(e.target.value))}
              className="rounded bg-white/20 px-2 py-1 text-sm text-white outline-none"
            >
              {playbackRates.map((rate) => (
                <option key={rate} value={rate} className="text-gray-900">
                  {rate}x
                </option>
              ))}
            </select>

            {/* Fullscreen */}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={toggleFullscreen}
            >
              <Maximize className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/20 border-t-white" />
        </div>
      )}
    </div>
  );
}
