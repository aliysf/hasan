# Hasan's journey clip

The **Hasan's Journey** section on the invitation page plays a video defined by the `journeyVideos`
list at the top of `script.js`.

## Current setup: hosted on Cloudinary

The clip currently streams from Cloudinary, so **no video file needs to live in this repo**:

```js
{
  url: "https://res.cloudinary.com/jsfhqu3t/video/upload/f_auto,q_auto/VID_20260813222837742.mp4",
  poster: "https://res.cloudinary.com/jsfhqu3t/video/upload/so_0,f_auto,q_auto/VID_20260813222837742.jpg",
  ...
}
```

- `f_auto,q_auto` lets Cloudinary pick the best format and quality per device.
- `poster` is a still frame (`so_0` = second 0) used as a lightweight thumbnail, so the card
  doesn't download the whole video just to show a preview.
- To use a different Cloudinary video, swap the `public_id` (`VID_20260813222837742`) in both URLs.

## Alternative: a local file

Prefer to commit the file instead of hosting it? Replace the entry with:

```js
{ file: "hasan-bday.mp4", chapter: "Year One", ... }
```

and drop `hasan-bday.mp4` into this folder. Keep it 5–15 MB (H.264/AAC `.mp4`, `+faststart`):

```bash
ffmpeg -i original.mov \
  -vf "scale=-2:720" \
  -c:v libx264 -crf 28 -preset slow -profile:v main -pix_fmt yuv420p \
  -movflags +faststart -c:a aac -b:a 96k \
  hasan-bday.mp4
```

If the referenced video is missing, the card shows a "Coming soon 🌿" placeholder so the page never
breaks. Adding a second entry to `journeyVideos` turns the card into a swipeable rail with prev/next
buttons in the player.
