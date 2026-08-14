# Hasan's journey clip

Put the video in this folder with this exact name:

```
hasan-bday.mp4
```

It fills the single card in the **Hasan's Journey** section on the invitation page. While the file
is missing, the card simply shows a "Coming soon" placeholder, so the page never breaks.

To change the label, title, caption — or to add more cards later — edit the `journeyVideos` list at
the top of `script.js`. Adding a second entry automatically turns the card into a swipeable rail
with prev/next buttons in the player.

## Keep the file small

Phone videos are often 100 MB+, which makes the page slow on mobile data (and GitHub rejects files
over 100 MB). Aim for 5–15 MB. With [ffmpeg](https://ffmpeg.org/) installed:

```bash
ffmpeg -i original.mov \
  -vf "scale=-2:720" \
  -c:v libx264 -crf 28 -preset slow -profile:v main -pix_fmt yuv420p \
  -movflags +faststart \
  -c:a aac -b:a 96k \
  hasan-bday.mp4
```

- Add `-t 30` before the output name to trim to the first 30 seconds.
- `-movflags +faststart` lets playback begin before the whole file downloads.
- `.mp4` with H.264 video and AAC audio plays everywhere, including iPhones and Android.

Portrait clips are perfect: the card is portrait-shaped and the player adapts to any aspect ratio.
