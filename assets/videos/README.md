# Hasan's journey clip

The **Hasan's Journey** section on the invitation page plays a video defined by the `journeyVideos`
list at the top of `script.js`.

## Current setup: Cloudinary hosted player (iframe)

The clip currently plays through **Cloudinary's hosted player in an iframe**, so **no video file
needs to live in this repo**:

```js
{
  embed: "https://player.cloudinary.com/embed/?cloud_name=jsfhqu3t&public_id=VID_20260813222837742",
  poster: "https://res.cloudinary.com/jsfhqu3t/video/upload/so_0,f_auto,q_auto,w_720,c_limit/VID_20260813222837742.jpg",
  ...
}
```

- `embed` is the Cloudinary player URL. It brings its own controls, adaptive streaming, and
  fullscreen/picture-in-picture. The lightbox adds `autoplay=true` when it opens the player.
- `poster` is a still frame (`so_0` = second 0) used as a lightweight card thumbnail, so the card
  doesn't load the player just to show a preview.
- To use a different Cloudinary video, swap the `public_id` (`VID_20260813222837742`) in both URLs.

### Alternative: a direct MP4 (native `<video>`)

Prefer the built-in player instead of the iframe? Use `url` instead of `embed`:

```js
{
  url: "https://res.cloudinary.com/jsfhqu3t/video/upload/f_auto,q_auto,w_720,c_limit/VID_20260813222837742.mp4",
  poster: "https://res.cloudinary.com/jsfhqu3t/video/upload/so_0,f_auto,q_auto,w_720,c_limit/VID_20260813222837742.jpg",
  ...
}
```

- `f_auto,q_auto` lets Cloudinary pick the best format and quality per device.
- `w_720,c_limit` caps the width at 720px — plenty for a phone player and about half the download.

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
