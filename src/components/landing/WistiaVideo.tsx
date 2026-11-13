import { createElement, useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

type WistiaPlayerElement = HTMLElement & {
  play: () => Promise<void> | void;
  pause: () => void;
  state: string;
};

interface WistiaVideoProps {
  mediaId: string;
  aspect: string;
  label: string;
  className?: string;
  badgeText?: string;
}

export function WistiaVideo({ mediaId, aspect, label, className = "", badgeText }: WistiaVideoProps) {
  const playerRef = useRef<WistiaPlayerElement | null>(null);
  const [paused, setPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const onPause = () => {
      setPaused(true);
      setIsPlaying(false);
    };
    const onPlay = () => {
      setPaused(false);
      setIsPlaying(true);
    };
    const onEnded = () => {
      setPaused(false);
      setIsPlaying(false);
    };
    const onOtherPlay = (event: Event) => {
      if (
        event.target instanceof HTMLElement &&
        event.target.tagName === "WISTIA-PLAYER" &&
        event.target !== player &&
        player.state === "playing"
      ) {
        player.pause();
      }
    };
    document.addEventListener("play", onOtherPlay, true);
    player.addEventListener("pause", onPause);
    player.addEventListener("play", onPlay);
    player.addEventListener("ended", onEnded);

    // Subtle scale for Wistia big play button to make it more compact and prominent
    const applyBpbStyle = () => {
      try {
        const root = (player as unknown as { shadowRoot?: ShadowRoot | null }).shadowRoot;
        if (root && !root.querySelector("style[data-custom-bpb]")) {
          const style = document.createElement("style");
          style.setAttribute("data-custom-bpb", "true");
          style.textContent = `
            .w-bpb-wrapper {
              transform: scale(0.78) !important;
              transform-origin: center center !important;
              transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease !important;
              filter: drop-shadow(0 4px 14px rgba(0, 0, 0, 0.38)) !important;
            }
            .w-bpb-wrapper:hover {
              transform: scale(0.85) !important;
            }
          `;
          root.appendChild(style);
        }
      } catch {
        // Shadow root access may be restricted in some environments
      }
    };

    applyBpbStyle();
    const interval = setInterval(applyBpbStyle, 300);
    const timeout = setTimeout(() => clearInterval(interval), 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      document.removeEventListener("play", onOtherPlay, true);
      player.removeEventListener("pause", onPause);
      player.removeEventListener("play", onPlay);
      player.removeEventListener("ended", onEnded);
    };
  }, []);

  function resume() {
    const player = playerRef.current;
    if (!player) return;

    // Stay in the click gesture for mobile playback. Reuse the same player and
    // position; only its confirmed play event hides the resume button.
    try {
      void Promise.resolve(player.play()).catch(() => {
        // Keep the button available if playback is blocked, so it can be retried.
      });
    } catch {
      // The pause button remains available if the player cannot resume yet.
    }
  }

  return (
    <div className={`wistia-video relative w-full ${className}`} style={{ aspectRatio: aspect }}>
      {createElement("wistia-player", {
        ref: playerRef,
        "media-id": mediaId,
        aspect,
        "player-color": "#323644",
        autoplay: "false",
        "fullscreen-control": "false",
        "play-bar-control": "true",
        "play-pause-control": "true",
        "play-pause-notifier": "false",
        "aria-label": label,
        style: { backgroundImage: `url(https://fast.wistia.com/embed/medias/${mediaId}/swatch)` },
      })}
      {badgeText && (
        <>
          <div
            className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/65 via-black/25 to-transparent transition-opacity duration-300 z-[3] ${
              isPlaying ? "opacity-0" : "opacity-100"
            }`}
          />
          <div
            className={`pointer-events-none absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-[4] transition-all duration-300 ${
              isPlaying ? "opacity-0 -translate-y-1" : "opacity-100 translate-y-0"
            }`}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3 py-1 sm:px-3.5 sm:py-1.5 text-xs sm:text-[13px] font-medium tracking-wide text-white/95 backdrop-blur-md shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
              </span>
              <span>{badgeText}</span>
            </div>
          </div>
        </>
      )}
      {paused && (
        <button type="button" className="video-resume" aria-label="Resume video" onClick={resume}>
          <Play aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
