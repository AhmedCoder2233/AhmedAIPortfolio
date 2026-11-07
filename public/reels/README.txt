Put your 9:16 reels here (MP4 / H.264 works in every browser; keep each under ~15 MB):

  firstvideo.mov  secondvideo.mov  thirdvideo.mov  -> Automation reels (names set in src/lib/content.ts)
  calling-1.mp4   calling-2.mp4    calling-3.mp4    -> AI calling agent reels

The first frame of each video is shown as the cover automatically.
Optional: add `poster: '/reels/your-cover.jpg'` in src/lib/content.ts to use a custom cover instead.
If a file is missing, the card shows a clean "Soon" placeholder.

.mov from an iPhone can be HEVC, which Chrome/Firefox may not play. Convert to MP4:
  ffmpeg -i firstvideo.mov -c:v libx264 -crf 23 -preset medium -c:a aac -movflags +faststart firstvideo.mp4
(then change the file name in src/lib/content.ts to .mp4)
