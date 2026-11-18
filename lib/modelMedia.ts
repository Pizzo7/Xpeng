/** 360 films in public/videos/xpeng_360_videos — missing models use static images */
export const MODEL_SPIN_VIDEOS: Record<string, string> = {
  g9l: "/videos/xpeng_360_videos/XPENG_G9L_360.mp4",
  x9: "/videos/xpeng_360_videos/XPENG_X9_360.mp4",
  p7: "/videos/xpeng_360_videos/XPENG_P7_360.mp4",
  g6: "/videos/xpeng_360_videos/XPENG_G6_360.mp4",
};

export function getModelSpinVideo(modelId: string): string | undefined {
  return MODEL_SPIN_VIDEOS[modelId];
}
