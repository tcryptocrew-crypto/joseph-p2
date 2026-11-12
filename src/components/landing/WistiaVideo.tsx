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
}

export function WistiaVideo({ mediaId, aspect, label, className = "" }: WistiaVideoProps) {
  const playerRef = useRef<WistiaPlayerElement | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const onPause = () => setPaused(true);
    const onPlay = () => setPaused(false);
    const onEnded = () => setPaused(false);
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
    return () => {
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
      {paused && (
        <button type="button" className="video-resume" aria-label="Resume video" onClick={resume}>
          <Play aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
