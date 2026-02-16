"use client";

import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

interface YouTubePlayerProps {
  videoId: string;
  opts?: {
    height?: string;
    width?: string;
    playerVars?: {
      autoplay?: number;
      loop?: number;
      playlist?: string;
      [key: string]: any;
    };
  };
  onEnd?: () => void;
  className?: string;
  isPlaying: boolean;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoId,
  opts = {},
  onEnd,
  className,
  isPlaying,
}) => {
  const playerRef = useRef<any>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let checkInterval: NodeJS.Timeout;

    const initPlayer = () => {
      if (window.YT && window.YT.Player && playerContainerRef.current && !playerRef.current) {
        // Merge default loop settings with provided opts
        const playerVars = {
          ...opts.playerVars,
          loop: 1,
          playlist: videoId, // Required for YouTube's native loop
        };

        playerRef.current = new window.YT.Player(playerContainerRef.current, {
          height: opts.height || "100%",
          width: opts.width || "100%",
          videoId: videoId,
          playerVars: playerVars,
          events: {
            onReady: (event: any) => {
              if (isPlaying) {
                event.target.playVideo();
              }
            },
            onStateChange: (event: any) => {
              // Manual loop fallback: if video ends, seek to start and play
              if (event.data === window.YT.PlayerState.ENDED) {
                event.target.playVideo(); 
                onEnd?.();
              }
            },
          },
        });
        return true;
      }
      return false;
    };

    const loadVideo = () => {
      if (initPlayer()) return;

      if (!document.getElementById("youtube-iframe-api")) {
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }

      checkInterval = setInterval(() => {
        if (initPlayer()) {
          clearInterval(checkInterval);
        }
      }, 100);
    };

    loadVideo();

    return () => {
      if (checkInterval) clearInterval(checkInterval);
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
      }
      playerRef.current = null;
    };
  }, [videoId]);

  useEffect(() => {
    if (playerRef.current && typeof playerRef.current.getPlayerState === 'function') {
      try {
        if (isPlaying) {
          playerRef.current.playVideo();
        } else {
          playerRef.current.pauseVideo();
        }
      } catch (e) {
        console.warn("YouTube player not ready", e);
      }
    }
  }, [isPlaying]);

  return <div ref={playerContainerRef} className={className} />;
};

export default YouTubePlayer;