# Hasan's journey clip

The **Hasan's Journey** section on the invitation page plays a video defined by the `journeyVideos`
list at the top of `script.js`.

## Current setup: direct MP4 from Cloudinary (native player)

The clip streams from Cloudinary and plays in the browser's own video element, so **no video file
needs to live in this repo**:

```js
{
  url: "https://res.cloudinary.com/jsfhqu3t/video/upload/f_auto,q_auto,w_720,c_limit/VID_20260813222837742.mp4",
  poster: "https://res.cloudinary.com/jsfhqu3t/video/upload/so_0,f_auto,q_auto,w_720,c_limit/VID_20260813222837742.jpg",
  ...
}
```

- `f_auto,q_auto` lets Cloudinary pick the best format and quality per device.
- `w_720,c_limit` caps the width at 720px — plenty for a phone player and about half the download.
- `poster` is a still frame (`so_0` = second 0) used as a lightweight card thumbnail, so the card
  doesn't download the video just to show a preview.
- To use a different Cloudinary video, swap the `public_id` (`VID_20260813222837742`) in both URLs.

### Why not the iframe player?

Cloudinary's hosted player is also supported — use `embed` instead of `url`:

```js
{ embed: "https://player.cloudinary.com/embed/?cloud_name=jsfhqu3t&public_id=VID_20260813222837742", ... }
```

**It did not play on iPhone**, which is why the native player is the default. Two iOS Safari
limitations cause it:

1. A tap on our page is not a user gesture *inside* a cross-origin iframe, and iOS blocks autoplay
   with audio — so the player can never start itself and may sit on a blank frame.
2. iframes inside an ancestor with a CSS `transform` render blank and swallow touches on iOS. (The
   lightbox now animates opacity only, so this specific trap is avoided.)

A native `<video>` with `playsinline` avoids both, and iOS plays the MP4 directly — Cloudinary
serves it with HTTP range support, which iOS requires.

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
