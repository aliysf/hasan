# Hasan's journey clips

Drop the video files in this folder using the exact names below. Each one fills a card in the
**Hasan's Journey** section on the invitation page. Any file that is missing simply shows a
"Coming soon" card, so the page never breaks.

| Card       | File name                   |
| ---------- | --------------------------- |
| Newborn    | `hasan-newborn.mp4`         |
| 3 Months   | `hasan-3-months.mp4`        |
| 6 Months   | `hasan-6-months.mp4`        |
| 9 Months   | `hasan-9-months.mp4`        |
| 1 Year     | `hasan-first-birthday.mp4`  |

To change the labels, captions, order, or add more cards, edit the `journeyVideos` list at the top
of `script.js`.

## Keep the files small

Phone videos are often 100 MB+, which makes the page slow on mobile data (and GitHub rejects files
over 100 MB). Aim for 5–15 MB per clip of roughly 10–20 seconds. With
[ffmpeg](https://ffmpeg.org/) installed:

```bash
ffmpeg -i original.mov \
  -t 20 \
  -vf "scale=-2:720" \
  -c:v libx264 -crf 28 -preset slow -profile:v main -pix_fmt yuv420p \
  -movflags +faststart \
  -c:a aac -b:a 96k \
  hasan-newborn.mp4
```

- `-t 20` trims to the first 20 seconds — drop it to keep the full clip.
- `-movflags +faststart` lets playback begin before the whole file downloads.
- `.mp4` with H.264 video and AAC audio plays everywhere, including iPhones and Android.

If a clip is portrait, that's perfect: the cards are portrait-shaped and the player adapts to any
aspect ratio.
