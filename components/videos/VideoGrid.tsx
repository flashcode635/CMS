"use client";

/**
 * VideoGrid — Gallery/Videos page second section
 *
 * Layout:
 *  1. Featured video — full-width tall card, plays via YouTube iframe
 *  2. 3-column grid of smaller video cards, each plays via YouTube iframe
 *
 * To add/change videos:
 *  - Edit the FEATURED_VIDEO object for the hero card
 *  - Edit the VIDEOS array for the grid cards
 *  - Paste any YouTube URL format: full URL, short URL, or just the video ID
 */

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/Button";

// ─────────────────────────────────────────────────────────────────────────────
// VIDEO DATA — paste your YouTube links here
// Accepted formats:
//   "https://www.youtube.com/watch?v=VIDEO_ID"
//   "https://youtu.be/VIDEO_ID"
//   "VIDEO_ID"  (just the 11-char ID)
// ─────────────────────────────────────────────────────────────────────────────

const FEATURED_VIDEO = {
  id: 1,
  title: "Big Moment: Indian Ambassador at Samara State Medical University Dr Shubham Interaction & Highlight",
  channel: "My Study Hub",
  youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // ← paste your YouTube link here
};

const VIDEOS = [
  {
    id: 1,
    title: "Fresher's Party Highlights",
    channel: "My Study Hub",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // ← paste YouTube link
  },
  {
    id: 2,
    title: "Fresher's Party Highlights",
    channel: "My Study Hub",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // ← paste YouTube link
  },
  {
    id: 3,
    title: "Fresher's Party Highlights",
    channel: "My Study Hub",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // ← paste YouTube link
  },
  {
    id: 4,
    title: "Fresher's Party Highlights",
    channel: "My Study Hub",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // ← paste YouTube link
  },
  {
    id: 5,
    title: "Fresher's Party Highlights",
    channel: "My Study Hub",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // ← paste YouTube link
  },
  {
    id: 6,
    title: "Fresher's Party Highlights",
    channel: "My Study Hub",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // ← paste YouTube link
  },
  {
    id: 7,
    title: "Fresher's Party Highlights",
    channel: "My Study Hub",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // ← paste YouTube link
  },
  {
    id: 8,
    title: "Fresher's Party Highlights",
    channel: "My Study Hub",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // ← paste YouTube link
  },
  {
    id: 9,
    title: "Fresher's Party Highlights",
    channel: "My Study Hub",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // ← paste YouTube link
  },
  {
    id: 10,
    title: "Fresher's Party Highlights",
    channel: "My Study Hub",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // ← paste YouTube link
  },
  {
    id: 11,
    title: "Fresher's Party Highlights",
    channel: "My Study Hub",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // ← paste YouTube link
  },
  {
    id: 12,
    title: "Fresher's Party Highlights",
    channel: "My Study Hub",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // ← paste YouTube link
  },
  {
    id: 13,
    title: "Fresher's Party Highlights",
    channel: "My Study Hub",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // ← paste YouTube link
  },
];

interface VideoItem {
  id: number;
  title: string;
  channel: string;
  youtubeUrl: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Utility: extract YouTube video ID from any URL format
// ─────────────────────────────────────────────────────────────────────────────
function extractYoutubeId(url: string) {
  if (!url) return "";
  // Already an ID (11 chars, no slashes/dots)
  if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) return url.trim();
  // youtu.be/ID
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];
  // youtube.com/watch?v=ID or /embed/ID or /v/ID
  const longMatch = url.match(/(?:v=|\/embed\/|\/v\/)([a-zA-Z0-9_-]{11})/);
  if (longMatch) return longMatch[1];
  return "";
}

// YouTube SVG logo (red + white)
function YoutubeLogo({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 90 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="YouTube"
    >
      <text
        x="0"
        y="16"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        fontSize="18"
        fill="white"
        letterSpacing="-0.5"
      >
        YouTube
      </text>
    </svg>
  );
}

// YouTube play button (the classic red+white icon)
function YoutubePlayIcon({ size = 52 }) {
  return (
    <svg
      width={size}
      height={size * (52 / 74)}
      viewBox="0 0 74 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Play on YouTube"
    >
      <rect width="74" height="52" rx="14" fill="#FF0000" />
      <polygon points="29,14 29,38 52,26" fill="white" />
    </svg>
  );
}

// MSH channel avatar placeholder
function ChannelAvatar({ size = 36 }) {
  return (
    <div
      className="rounded-full bg-linear-to-br from-brand-green to-brand-blue flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
    >
      <span className="text-white font-bold" style={{ fontSize: size * 0.35 }}>
        M
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Featured (hero) video card
// ─────────────────────────────────────────────────────────────────────────────
function FeaturedVideoCard({ video }: { video: VideoItem }) {
  const [playing, setPlaying] = useState(false);
  const videoId = extractYoutubeId(video.youtubeUrl);
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const thumbUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : null;

  const handlePlay = useCallback(() => setPlaying(true), []);

  return (
    <div className="relative w-full rounded-4xl overflow-hidden bg-[#00142d]"
      style={{ aspectRatio: "16/7" }}
    >
      {/* Thumbnail / iframe */}
      {playing ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <>
          {/* Dark bg + thumbnail */}
          {thumbUrl && (
            <img
              src={thumbUrl}
              alt={video.title}
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
          )}
          {!thumbUrl && (
            <div className="absolute inset-0 bg-[#001a3d]" />
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20" />

          {/* Center play button */}
          <Button variant="unstyled"
            size="icon"
            onClick={handlePlay}
            className="absolute inset-0 size-full flex items-center justify-center cursor-pointer group bg-transparent hover:bg-transparent border-0 shadow-none"
            aria-label="Play video"
          >
            <div className="transform transition-transform duration-200 group-hover:scale-110">
              <YoutubePlayIcon size={72} />
            </div>
          </Button>

          {/* Top-left: channel info */}
          <div className="absolute top-4.5 left-6 flex items-center gap-3">
            <ChannelAvatar size={36} />
            <div className="flex flex-col">
              <span
                className="text-white font-bold text-sm leading-tight line-clamp-1 max-w-50 sm:max-w-125"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                {video.title}
              </span>
              <span
                className="text-white/80 text-[11px] leading-tight"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                {video.channel}
              </span>
            </div>
          </div>

          {/* Bottom-right: Watch on YouTube */}
          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-7 right-6 flex items-center gap-2 bg-black/30 hover:bg-black/50 transition-colors rounded-full h-12 px-6"
          >
            <span
              className="text-white font-light text-lg leading-none"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              Watch on
            </span>
            {/* YouTube wordmark */}
            <svg width="80" height="18" viewBox="0 0 90 20" aria-label="YouTube">
              <text x="0" y="16" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="17" fill="white">
                You
              </text>
              <text x="34" y="16" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="17" fill="#FF0000">
                Tube
              </text>
            </svg>
          </a>
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Small grid video card
// ─────────────────────────────────────────────────────────────────────────────
function VideoCard({ video }: { video: VideoItem }) {
  const [playing, setPlaying] = useState(false);
  const videoId = extractYoutubeId(video.youtubeUrl);
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const thumbUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : null;

  const handlePlay = useCallback(() => setPlaying(true), []);

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden bg-[#00142d] group cursor-pointer"
      style={{ aspectRatio: "16/9" }}
    >
      {playing ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <>
          {/* Thumbnail */}
          {thumbUrl && (
            <img
              src={thumbUrl}
              alt={video.title}
              className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
            />
          )}
          {!thumbUrl && (
            <div className="absolute inset-0 bg-[#001a3d]" />
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20" />

          {/* Center play button */}
          <Button variant="unstyled"
            size="icon"
            onClick={handlePlay}
            className="absolute inset-0 size-full flex items-center justify-center cursor-pointer group bg-transparent hover:bg-transparent border-0 shadow-none"
            aria-label="Play video"
          >
            <div className="transform transition-transform duration-200 group-hover:scale-110">
              <YoutubePlayIcon size={44} />
            </div>
          </Button>

          {/* Top-left: channel info */}
          <div className="absolute top-2.25 left-3 flex items-center gap-2">
            <ChannelAvatar size={28} />
            <div className="flex flex-col">
              <span
                className="text-white font-bold text-[11px] leading-tight line-clamp-1 max-w-37.5"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                {video.title}
              </span>
              <span
                className="text-white/70 text-2.5 leading-tight"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                {video.channel}
              </span>
            </div>
          </div>

          {/* Bottom-right: Watch on YouTube */}
          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 bg-black/30 hover:bg-black/50 transition-colors rounded-full h-9 px-4"
          >
            <span
              className="text-white font-light text-[13px] leading-none"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              Watch on
            </span>
            <svg width="56" height="13" viewBox="0 0 90 20" aria-label="YouTube">
              <text x="0" y="16" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="17" fill="white">
                You
              </text>
              <text x="34" y="16" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="17" fill="#FF0000">
                Tube
              </text>
            </svg>
          </a>
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Pagination config
// Page 1: featured card + 14 grid cards  = 15 items total
// Page 2+: 15 grid cards per page
// ─────────────────────────────────────────────────────────────────────────────
const GRID_PER_PAGE = 15;          // grid cards shown per page
const FIRST_PAGE_GRID = 14;        // grid cards on page 1 (featured takes 1 slot)

// Chevron arrow icon
function ChevronIcon({ direction = "left" }) {
  return (
    <svg
      width="20" height="20" viewBox="0 0 20 20" fill="none"
      className={direction === "right" ? "rotate-180" : ""}
      aria-hidden
    >
      <path
        d="M12.5 15L7.5 10L12.5 5"
        stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────
export default function VideoGrid() {
  const [page, setPage] = useState(1); // 1-indexed

  // Work out which slice of VIDEOS to show
  // Page 1 shows indices 0–13 (14 cards), page 2 shows 14–28 (15 cards), etc.
  const gridStart = page === 1 ? 0 : FIRST_PAGE_GRID + (page - 2) * GRID_PER_PAGE;
  const gridEnd   = page === 1 ? FIRST_PAGE_GRID : gridStart + GRID_PER_PAGE;
  const pageVideos = VIDEOS.slice(gridStart, gridEnd);

  // Total pages
  const remainingAfterPage1 = Math.max(0, VIDEOS.length - FIRST_PAGE_GRID);
  const totalPages = 1 + Math.ceil(remainingAfterPage1 / GRID_PER_PAGE);

  const goToPage = (p: number) => {
    setPage(p);
    // Scroll back to top of section smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const BTN_GRAD = "linear-gradient(140.84deg, #00923F 12.704%, #3163FF 87.17%)";

  return (
    <section className="w-full py-10 px-5 sm:px-25" style={{ backgroundColor: "#e8f0f9" }}>

      {/* ── Featured video — only on page 1 ── */}
      {page === 1 && (
        <div className="mb-6">
          <FeaturedVideoCard video={FEATURED_VIDEO} />
        </div>
      )}

      {/* ── Grid: 1 col mobile, 2 col tablet, 3 col desktop ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pageVideos.map((video) => (
          <VideoCard key={`${page}-${video.id}`} video={video} />
        ))}
      </div>

      {/* ── Pagination bar ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-12">

          {/* Previous */}
          <Button variant="unstyled"
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            className="flex items-center gap-2 h-11 px-5 rounded-full font-medium text-sm transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none shadow-none border-0"
            style={{
              fontFamily: "Inter, sans-serif",
              backgroundImage: page === 1 ? undefined : BTN_GRAD,
              backgroundColor: page === 1 ? "#e0e8f4" : undefined,
              color: page === 1 ? "#79859b" : "white",
            }}
          >
            <ChevronIcon direction="left" />
            Previous
          </Button>

          {/* Page numbers */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
              const isActive = p === page;
              return (
                <Button variant="unstyled"
                  key={p}
                  onClick={() => goToPage(p)}
                  className="size-11 rounded-full text-sm font-semibold transition-all duration-200 hover:shadow-md active:scale-[0.97] border-0 p-0"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    backgroundImage: isActive ? BTN_GRAD : undefined,
                    backgroundColor: isActive ? undefined : "white",
                    color: isActive ? "white" : "#1a1a1a",
                    boxShadow: isActive ? "0 4px 16px rgba(49,99,255,0.25)" : "0 2px 8px rgba(0,0,0,0.06)",
                  }}
                >
                  {p}
                </Button>
              );
            })}
          </div>

          {/* Next */}
          <Button variant="unstyled"
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            className="flex items-center gap-2 h-11 px-5 rounded-full font-medium text-sm transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none shadow-none border-0"
            style={{
              fontFamily: "Inter, sans-serif",
              backgroundImage: page === totalPages ? undefined : BTN_GRAD,
              backgroundColor: page === totalPages ? "#e0e8f4" : undefined,
              color: page === totalPages ? "#79859b" : "white",
            }}
          >
            Next
            <ChevronIcon direction="right" />
          </Button>

        </div>
      )}

    </section>
  );
}
