# Directory: components/videos

Primary Purpose: The local-image highlight gallery for `/gallery/videos`.

## Files

### `VideoGrid.tsx`

[VideoGrid.tsx]: Local highlight gallery with one featured card and a responsive grid of poster cards.

- **Runtime:** client component for compatibility with the gallery route; it has no state, effects, external requests, or playback handlers.
- **Purpose:** Renders the featured highlight and local event imagery using assets from `public/home`.
- **Props:** None.
- **Data:** The `videos` array contains local image paths, titles, and display metadata.
- **Dependencies:** `next/image`.
- **Consumers:** `app/(site)/gallery/videos/page.tsx`.
- **Auth:** Public.
