/**
 * Start muted inline playback and retry until the browser has data.
 * A single play() call often rejects in production while the file is still loading.
 */
export function playMuted(video: HTMLVideoElement): () => void {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");

  let cancelled = false;
  let retries = 0;

  const tryPlay = () => {
    if (cancelled || retries > 5) return;
    retries += 1;
    video.muted = true;
    const pending = video.play();
    if (!pending || typeof pending.then !== "function") return;
    pending.catch((error: unknown) => {
      if (cancelled) return;
      const name = error instanceof DOMException ? error.name : "";
      if (name === "NotAllowedError") return;
      const retry = () => {
        if (!cancelled) tryPlay();
      };
      if (video.readyState >= 2) {
        window.setTimeout(retry, 300);
      } else {
        video.addEventListener("canplay", retry, { once: true });
      }
    });
  };

  tryPlay();
  if (video.readyState < 2) {
    video.addEventListener("loadeddata", tryPlay, { once: true });
  }

  return () => {
    cancelled = true;
    video.removeEventListener("loadeddata", tryPlay);
  };
}
