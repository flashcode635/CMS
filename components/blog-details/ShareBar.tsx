"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  Eye,
  Link as LinkIcon,
  Check,
  Share2,
  MessageCircle,
  ThumbsUp,
  LucideIcon,
} from "lucide-react";

export interface ShareBarProps {
  totalShares?: number;
  facebookCount?: number;
  pinterestCount?: number;
  linkedinCount?: number;
  views?: number;
  shareUrl?: string;
}

interface SharePlatform {
  label: string;
  count: number;
  href: string;
  bg: string;
  Icon: LucideIcon;
}

export default function ShareBar({
  totalShares = 10000,
  facebookCount = 636,
  pinterestCount = 636,
  linkedinCount = 636,
  views = 12000,
  shareUrl,
}: ShareBarProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const url =
    shareUrl ??
    (typeof window !== "undefined" ? window.location.href : "");

  const fmt = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(0)}K` : String(n);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const SHARES: SharePlatform[] = [
    {
      label: "Facebook",
      count: facebookCount,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      bg: "#3b5998",
      Icon: ThumbsUp,
    },
    {
      label: "Pinterest",
      count: pinterestCount,
      href: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}`,
      bg: "#e60023",
      Icon: Share2,
    },
    {
      label: "LinkedIn",
      count: linkedinCount,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`,
      bg: "#007bb6",
      Icon: Share2,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full">
      <div
        className="flex flex-col items-center shrink-0"
        aria-label={`${fmt(totalShares)} total shares`}
      >
        <span
          className="text-[#121416] text-xl sm:text-2xl font-bold leading-tight"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {fmt(totalShares)}
        </span>
        <span
          className="text-[#757d85] text-sm sm:text-base text-center"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Shares
        </span>
      </div>

      <div className="flex flex-wrap gap-2 flex-1 min-w-full">
        {SHARES.map(({ label, count, href, bg, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${label} — ${count} shares`}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-md flex-1 min-w-29.5 justify-center transition-opacity hover:opacity-90"
            style={{ backgroundColor: bg }}
          >
            <span
              className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0"
              aria-hidden
            >
              <Icon className="w-3 h-3" style={{ color: bg }} />
            </span>
            <span
              className="text-white text-xs sm:text-sm font-bold"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {label}
            </span>
            <span
              className="text-white/80 text-xs sm:text-sm whitespace-nowrap"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {count}
            </span>
          </a>
        ))}

        <a
          href={`https://wa.me/?text=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on WhatsApp"
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-md bg-[#25d366] transition-opacity hover:opacity-90 shrink-0"
        >
          <MessageCircle className="w-4 h-4 text-white" aria-hidden />
          <span
            className="text-white text-xs sm:text-sm font-bold"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            WhatsApp
          </span>
        </a>

        <div
          className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-brand-royal shrink-0"
          aria-label={`${fmt(views)} views`}
        >
          <Eye className="w-4 h-4 text-white shrink-0" aria-hidden />
          <span
            className="text-white text-xs sm:text-sm font-semibold"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Views
          </span>
          <span
            className="text-white/80 text-xs sm:text-sm"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {fmt(views)}
          </span>
        </div>

        <Button
          type="button"
          onClick={handleCopy}
          variant="outline"
          size="bare"
          shape="md"
          aria-label={copied ? "Link copied!" : "Copy link"}
          className="shrink-0 gap-1.5 px-3 py-2 hover:bg-gray-50"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" aria-hidden />
          ) : (
            <LinkIcon className="w-4 h-4 text-[#4b6bfb]" aria-hidden />
          )}
          <span
            className="text-[#4b6bfb] text-xs sm:text-sm font-medium"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {copied ? "Copied!" : "Copy Link"}
          </span>
        </Button>
      </div>
    </div>
  );
}
