import Image from "next/image";
import Link from "next/link";

/**
 * BlogCard (detail page variant) — Compact vertical card used in the
 * "You May Also Like" sidebar column.
 *
 * Matches Figma node 356:15497 (m-post-card-grid pattern in sidebar).
 * Intentionally narrower than the listing-page cards so it fits the
 * ~394px sidebar column.
 *
 * Props
 * ─────────────────────────────────────────────────────────────
 * @param {string}  title      – Post title
 * @param {string}  category   – Category label
 * @param {string}  author     – Author display name
 * @param {string}  authorImg  – URL to author avatar
 * @param {string}  date       – Formatted publish date
 * @param {string}  coverImg   – URL to post cover image
 * @param {string}  href       – Link target for the card
 */
interface BlogCardProps {
  title: string;
  category: string;
  author: string;
  authorImg?: string;
  date: string;
  coverImg: string;
  href?: string;
}

export default function BlogCard({
  title,
  category,
  author,
  authorImg,
  date,
  coverImg,
  href = "#",
}: BlogCardProps) {
  return (
    <article>
      <Link
        href={href}
        className="
          block
          bg-white
          border border-line
          rounded-xl
          overflow-hidden
          transition-shadow
          hover:shadow-md shadow-brand-champagne/18
          focus-visible:outline-2 focus-visible:outline-brand-royal
        "
        aria-label={`Read: ${title}`}
      >
        {/* Cover image */}
        <div className="relative w-full h-50 sm:h-[170] overflow-hidden rounded-t-[11px]">
          <Image
            src={coverImg}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 640px) 100vw, 392px"
            unoptimized
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 p-4">
          {/* Heading block */}
          <div className="flex flex-col gap-3">
            {/* Category badge */}
            <span
              className="inline-flex items-center justify-center px-2.5 py-1 rounded-md w-fit
                         bg-brand-champagne/5 text-brand-royal text-[6px] sm:text-[10px] font-medium leading-5"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {category}
            </span>

            {/* Title */}
            <h3
              className="text-ink text-2.5 sm:text-[16px] font-semibold leading-[1.4]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {title}
            </h3>
          </div>

          {/* Divider */}
          <div className="h-px bg-surface-alt" />

          {/* Author + date row */}
          <div className="flex items-center gap-3">
            {/* Author */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {authorImg && (
                <div className="relative flex-none w-7 h-7 rounded-full overflow-hidden">
                  <Image
                    src={authorImg}
                    alt={author}
                    fill
                    className="object-cover"
                    sizes="36px"
                    unoptimized
                  />
                </div>
              )}
              <span
                className="text-muted text-[10px] sm:text-[12px] font-medium leading-6 truncate"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {author}
              </span>
            </div>

            {/* Date */}
            <time
              dateTime={date}
              className="text-muted text-[10px] sm:text-[12px] font-normal leading-6 whitespace-nowrap shrink-0"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {date}
            </time>
          </div>
        </div>
      </Link>
    </article>
  );
}
