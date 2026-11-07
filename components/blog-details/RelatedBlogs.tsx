import BlogCard from "./BlogCard";
import { relatedPosts, blogPostHref, type BlogPost } from "@/lib/blogPosts";

/**
 * RelatedBlogs — "You May Also Like" sidebar section.
 *
 * Matches Figma node 356:15495 — a vertical column of BlogCards in the
 * right sidebar, below the TagsList.
 *
 * Posts come from the shared registry (`@/lib/blogPosts`) so every card links
 * to a real `/collections/blog/[slug]` page, matching the listing page. Pass
 * `slug` to exclude the current post (same-category posts surface first).
 *
 * Props
 * ─────────────────────────────────────────────────────────────
 * @param {string} [slug]     – slug of the post being read (excluded from the list)
 * @param {Array}  [posts]    – explicit post list override (registry otherwise)
 * @param {string} [heading]  – section heading text
 */
export default function RelatedBlogs({
  slug,
  posts,
  heading = "You May Also Like",
}: {
  slug?: string;
  posts?: BlogPost[];
  heading?: string;
}) {
  const related = (posts ?? (slug ? relatedPosts(slug, 4) : relatedPosts("", 4)))
    .map((post: BlogPost, i: number) => ({
      id: i + 1,
      category: post.category,
      title: post.title,
      author: post.author,
      authorImg: post.authorImg,
      date: post.date,
      coverImg: post.coverImg,
      href: blogPostHref(post.slug),
    }));

  return (
    <aside aria-label="Related blog posts" className="w-full flex flex-col gap-10">
      {/* Section heading */}
      <h2
        className="text-[#121416] text-[20px] sm:text-3xl  font-bold leading-tight uppercase"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {heading}
      </h2>

      {/* Card list */}
      <div className="flex flex-col gap-10">
        {related.map((post) => (
          <BlogCard key={post.id} {...post} />
        ))}
      </div>
    </aside>
  );
}
