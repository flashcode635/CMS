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
      bg: "var(--color-brand-forest)",
      Icon: ThumbsUp,
    },
    {
      label: "Pinterest",
      count: pinterestCount,
      href: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}`,
      bg: "var(--color-brand-forest)",
      Icon: Share2,
    },
    {
      label: "LinkedIn",
      count: linkedinCount,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`,
      bg: "var(--color-brand-forest)",
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
          className="text-ink text-xl sm:text-2xl font-bold leading-tight"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {fmt(totalShares)}
        </span>
        <span
          className="text-body text-sm sm:text-base text-center"
          style={{ fontFamily: 'var(--font-body)' }}
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
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {label}
            </span>
            <span
              className="text-white/80 text-xs sm:text-sm whitespace-nowrap"
              style={{ fontFamily: 'var(--font-body)' }}
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
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-md bg-brand-forest transition-opacity hover:opacity-90 shrink-0"
        >
          <MessageCircle className="w-4 h-4 text-white" aria-hidden />
          <span
            className="text-white text-xs sm:text-sm font-bold"
            style={{ fontFamily: 'var(--font-body)' }}
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
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Views
          </span>
          <span
            className="text-white/80 text-xs sm:text-sm"
            style={{ fontFamily: 'var(--font-body)' }}
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
          className="shrink-0 gap-1.5 px-3 py-2 hover:bg-surface"
        >
          {copied ? (
            <Check className="w-4 h-4 text-brand-emerald" aria-hidden />
          ) : (
            <LinkIcon className="w-4 h-4 text-brand-royal" aria-hidden />
          )}
          <span
            className="text-brand-royal text-xs sm:text-sm font-medium"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {copied ? "Copied!" : "Copy Link"}
          </span>
        </Button>
      </div>
    </div>
  );
}
