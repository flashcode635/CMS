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
          border border-[#E4DDD0]
          rounded-xl
          overflow-hidden
          transition-shadow
          hover:shadow-[0_8px_32px_-4px_rgba(216,178,110,0.18)]
          focus-visible:outline-2 focus-visible:outline-[#0A6B44]
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
                         bg-[rgba(216,178,110,0.05)] text-[#0A6B44] text-[6px] sm:text-[10px] font-medium leading-5"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {category}
            </span>

            {/* Title */}
            <h3
              className="text-[#12211C] text-2.5 sm:text-[16px] font-semibold leading-[1.4]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {title}
            </h3>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#EFE9DE]" />

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
                className="text-[#7A857E] text-[10px] sm:text-[12px] font-medium leading-6 truncate"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {author}
              </span>
            </div>

            {/* Date */}
            <time
              dateTime={date}
              className="text-[#7A857E] text-[10px] sm:text-[12px] font-normal leading-6 whitespace-nowrap shrink-0"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {date}
            </time>
          </div>
        </div>
      </Link>
    </article>
  );
}
