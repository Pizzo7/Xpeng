/**
 * Start muted inline playback and retry until the browser has data.
 * A single play() call often rejects in production while the file is still loading.
 */
export function playMuted(video: HTMLVideoElement): () => void {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");

  let cancelled = false;
  let retries = 0;

  const tryPlay = () => {
    if (cancelled || !video.paused || retries > 8) return;
    retries += 1;
    video.muted = true;
    const pending = video.play();
    if (!pending || typeof pending.then !== "function") return;
    pending.catch(() => {
      if (cancelled || !video.paused) return;
      const retry = () => {
        if (!cancelled && video.paused) tryPlay();
      };
      if (video.readyState >= 2) window.setTimeout(retry, 250);
      else video.addEventListener("canplay", retry, { once: true });
    });
  };

  tryPlay();
  const onReady = () => {
    if (!cancelled && video.paused) tryPlay();
  };
  video.addEventListener("loadeddata", onReady);
  video.addEventListener("canplay", onReady);

  return () => {
    cancelled = true;
    video.removeEventListener("loadeddata", onReady);
    video.removeEventListener("canplay", onReady);
  };
}
