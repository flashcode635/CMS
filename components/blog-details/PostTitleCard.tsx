import Image from "next/image";
import { Clock, CalendarDays } from "lucide-react";

interface PostTitleCardProps {
  title: string;
  subtitle: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
  coverImage: string;
}

/**
 * PostTitleCard — the per-post hero inside the article column: cover photo with
 * a light bottom gradient, category chip + date, uppercase post title and its
 * subtitle, then the author/read-time meta row. Design ref: the main-column
 * card just under the "Blog Detail" banner.
 */
export default function PostTitleCard({
  title,
  subtitle,
  category,
  author,
  date,
  readTime,
  coverImage,
}: PostTitleCardProps) {
  return (
    <section className="relative w-full rounded-3xl overflow-hidden bg-[#0d1b3a]" aria-label="Blog post title">
      {/* Cover */}
      <div className="relative inset-x-0" style={{ height: "clamp(300px, 34vw, 430px)" }}>
        <Image
          src={coverImage}
          alt={title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover object-center"
        />
        {/* Light sky fade into the text zone */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(240,246,255,0.97) 0%, rgba(240,246,255,0.82) 26%, rgba(240,246,255,0.25) 52%, rgba(240,246,255,0) 70%)",
          }}
        />

        {/* Text pinned to the bottom-left, on the light fade */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2.5 px-5 pb-5 sm:px-8 sm:pb-7">
          <div className="flex items-center gap-2.5">
            <span
              className="px-2.5 py-1 rounded-md text-white font-medium"
              style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 12, background: "#4b6bfb" }}
            >
              {category}
            </span>
            <time
              dateTime={date}
              className="text-[#5b6e77]"
              style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 12.5, fontWeight: 500 }}
            >
              {date}
            </time>
          </div>

          <h2
            className="m-0 uppercase font-bold text-[#101b33]"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(19px, 2.5vw, 31px)",
              lineHeight: 1.22,
              maxWidth: "34ch",
            }}
          >
            {title}
          </h2>

          <p
            className="m-0 text-[#55697a]"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(12.5px, 1.05vw, 15px)" }}
          >
            {subtitle}
          </p>
        </div>
      </div>

      {/* Meta row under the card, light blue chip like the design */}
      <div
        className="flex items-center justify-between gap-4 px-5 sm:px-8 py-4 text-white"
        style={{ background: "linear-gradient(93.86deg, rgba(0,146,63,0.85) 12.7%, rgba(49,99,255,0.85) 87.17%)" }}
      >
        <span
          className="flex items-center gap-2.5 min-w-0"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, fontWeight: 500 }}
        >
          <CalendarDays className="w-4 h-4 shrink-0" aria-hidden />
          by {author}
        </span>
        <span
          className="flex items-center gap-1.5 shrink-0 text-white/90"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: 13 }}
        >
          <Clock className="w-4 h-4" aria-hidden />
          {readTime} minute read
        </span>
      </div>
    </section>
  );
}
