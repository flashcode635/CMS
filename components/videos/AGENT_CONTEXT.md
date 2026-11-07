# Directory: components/videos
Primary Purpose: The video gallery section for `/gallery/videos` — one featured YouTube card plus a 3-column grid of thumbnail cards that swap to an inline YouTube iframe on click, with a numeric pagination bar. All video metadata is hard-coded; there is no modal/lightbox and no category filter.

> Hand-written reference documentation. `npm run graph` regenerates `graph/` and its own Runtime/Dependencies/Consumers metadata separately.

## Files

### `VideoGrid.tsx` (530 lines)
[VideoGrid.tsx]: Featured + grid YouTube gallery with click-to-play iframes, derived thumbnails, and page-number pagination (15 grid slots per page, 14 on page 1).

- **Runtime:** client (`"use client"`, line 1) — `useState` (page, plus `playing` per card) and `useCallback` for the play handlers. No `useEffect`, no observers, no timers.
- **Purpose:** section 2 of `/gallery/videos`, under the `PageBanner` (page background `#e8f0f9`). Nothing else imports it.
- **Props:** **none** — `export default function VideoGrid()`. The two card components take `{ video }: { video: VideoItem }`; `VideoGrid` itself is prop-less, so the hard-coded data is the only source.
- **State & effects:**
  - `const [page, setPage] = useState(1)` (1-indexed) in `VideoGrid`.
  - `FeaturedVideoCard`: `playing` (`false`); `VideoCard`: `playing` (`false`). Each card swaps thumbnail markup for a `<iframe>` when `playing` becomes true; there is **no way to stop/close** playback other than navigating or paging (the iframe replaces the thumbnail entirely).
  - `handlePlay = useCallback(() => setPlaying(true), [])` in both cards.
  - Grid cards are keyed `` `${page}-${video.id}` `` so a page change remounts them and resets `playing` to `false` (featured card remounts too because it unmounts when `page !== 1`).
- **Handlers / functions:**
  - `extractYoutubeId(url: string)` → `""` for empty input; returns the input unchanged if it already matches `/^[a-zA-Z0-9_-]{11}$/`; else `youtu.be/(ID)`; else `(?:v=|\/embed\/|\/v\/)(ID)`; otherwise `""`. It does **not** handle `youtube.com/shorts/…`, `?si=`-only links, or playlists.
  - Derived per card: `videoId`, `watchUrl = "https://www.youtube.com/watch?v="+videoId`, `thumbUrl = videoId ? "https://img.youtube.com/vi/"+videoId+"/maxresdefault.jpg" : null` (featured) or `/hqdefault.jpg` (grid). No `videoId` → `thumbUrl` null → flat `#001a3d` placeholder, and the iframe would be `https://www.youtube.com/embed/?autoplay=1&rel=0`.
  - Play: `<Button variant="unstyled" size="icon" onClick={handlePlay} aria-label="Play video">` overlays the whole card (a `YoutubePlayIcon`, 72px featured / 44px grid, scales 110% on hover).
  - Pagination: `goToPage(p)` → `setPage(p)` then `window.scrollTo({ top: 0, behavior: "smooth" })` (scrolls the **whole document**, not the section). Previous (`page - 1`, disabled at 1), Next (`page + 1`, disabled at `totalPages`), and one Button per page `1..totalPages`. No clamping/guard inside `goToPage` itself; safety comes only from the disabled buttons.
- **Constants & types:**
  - `FEATURED_VIDEO` = `{ id: 1, title: "Big Moment: Indian Ambassador at Samara State Medical University Dr Shubham Interaction & Highlight", channel: "Study Palace Hub", youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }`.
  - `VIDEOS` = 13 items, **all identical**: `title: "Fresher's Party Highlights"`, `channel: "Study Palace Hub"`, `youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"`, ids 1–13. The comment marks the URL as "← paste your YouTube link here"; `dQw4w9WgXcQ` is the placeholder ID (also the featured video's), so every card shows the same thumbnail and plays the same clip.
  - `interface VideoItem { id: number; title: string; channel: string; youtubeUrl: string }` (local).
  - Pagination constants: `GRID_PER_PAGE = 15`, `FIRST_PAGE_GRID = 14`; `gridStart = page===1 ? 0 : FIRST_PAGE_GRID + (page-2)*GRID_PER_PAGE`; `gridEnd = page===1 ? FIRST_PAGE_GRID : gridStart + GRID_PER_PAGE`; `pageVideos = VIDEOS.slice(gridStart, gridEnd)`; `remainingAfterPage1 = max(0, VIDEOS.length - FIRST_PAGE_GRID)`; `totalPages = 1 + ceil(remainingAfterPage1 / GRID_PER_PAGE)`.
  - `BTN_GRAD = "linear-gradient(140.84deg, #00923F 12.704%, #3163FF 87.17%)"` (declared **inside** the component, recreated each render); section `bg-[#e8f0f9]`, `py-10 px-5 sm:px-25`; featured `aspectRatio: "16/7"` `rounded-4xl`, grid cards `aspectRatio: "16/9"` `rounded-3xl`.
  - Small local components: `YoutubeLogo` (unused — dead code, lines 139–161), `YoutubePlayIcon({ size })`, `ChannelAvatar({ size })` (gradient `from-brand-green to-brand-blue` with an "S"), `ChevronIcon({ direction })`.
- **Dependencies:** `react` (`useState`, `useCallback`), `@/components/ui/Button`. Thumbnails use raw `<img>` (not `next/image`), so Next's image optimizer and its `remotePatterns` (`img.youtube.com` is not whitelisted anyway) are bypassed.
- **Consumers:** `app/(site)/gallery/videos/page.tsx` (only; verified by grep).
- **Notes:**
  - **No categories and no modal:** despite the gallery framing there is no category/channel filter, no lightbox/dialog, no Escape handling and no close button — playback is an inline iframe replacement (`https://www.youtube.com/embed/{id}?autoplay=1&rel=0`, `allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"`, `allowFullScreen`).
  - **Pagination is currently inert:** with 13 videos, `remainingAfterPage1 = 0` → `totalPages = 1`, so the bar renders nothing and the grid shows all 13 on one page. The comment claims "Page 1: featured card + 14 grid cards = 15 items", but only 13 exist, and the featured card is not counted in `VIDEOS`.
  - `FIRST_PAGE_GRID` (14) is applied regardless of whether the featured card renders — it always does on page 1, so the counts line up only by convention.
  - A11y: every play button is labelled just `"Play video"` (13+ identical names, no title), thumbnails use `alt={video.title}` (redundant with the visible title), the "Watch on YouTube" anchors have **no `aria-label`** (link text is "Watch on" + an SVG wordmark), SVG logos carry `aria-label="YouTube"` without `role="img"`, and pagination buttons have visible numbers but no `aria-current`. The grid card's `onClick={e => e.stopPropagation()}` on the watch link is redundant — the card root has no click handler.
  - External links use `target="_blank" rel="noopener noreferrer"`.
  - Responsive: featured card `mb-6`; grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`; pagination centered `mt-12`.
  - No `dangerouslySetInnerHTML`, no localStorage, no API calls, no auth.
