import { notFound } from "next/navigation";
import PageBanner from "@/components/ui/PageBanner";
import PostTitleCard from "@/components/blog-details/PostTitleCard";
import BlogContent from "@/components/blog-details/BlogContent";
import TableOfContents from "@/components/blog-details/TableOfContents";
import AuthorCard from "@/components/blog-details/AuthorCard";
import TagsList from "@/components/blog-details/TagsList";
import LeftSidebar from "@/components/blog-details/leftbar";
import ShareBar from "@/components/blog-details/ShareBar";
import RelatedBlogs from "@/components/blog-details/RelatedBlogs";
import NewsletterCTA from "@/components/blog-details/NewsletterCTA";
import {
  BLOG_POSTS,
  DEFAULT_TOC_ITEMS,
  DEFAULT_DESIGNATION,
  DEFAULT_AUTHOR_BIO,
  DEFAULT_TOTAL_SHARES,
  ARTICLE_INTRO,
  getBlogPost,
  blogPostHref,
  tagsForPost,
} from "@/lib/blogPosts";

export interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_POSTS.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Blog | My Study Hub" };
  return {
    title: `${post.title} | My Study Hub Blog`,
    description: post.subtitle,
  };
}

const SITE_URL = "https://mystudyhub.com";

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound(); // unknown slugs → 404 page

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(93.86deg, rgba(0,146,63,0.1) 12.7%, rgba(49,99,255,0.1) 87.17%), #ffffff",
      }}
    >
      {/* Static brand banner — the per-post title sits inside the article */}
      <PageBanner
        title="Blog Detail"
        subtitle="Grow Together in Excellence"
        backgroundImage="/bg-doctor.jpg"
        overlayOpacity={0.7}
      />

      <div className="max-w-350 mx-auto px-4 sm:px-8 lg:px-16 py-14 sm:py-20">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-16 items-start">
          <main
            className="flex-1 min-w-0 flex flex-col gap-12"
            id="main-content"
          >
            <PostTitleCard
              title={post.title}
              subtitle={post.subtitle}
              category={post.category}
              author={post.author}
              date={post.date}
              readTime={post.readTime}
              coverImage={post.coverImg}
            />

            <p
              className="m-0 text-[#55697a]"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(14px, 1.15vw, 16.5px)", lineHeight: 1.7 }}
            >
              {ARTICLE_INTRO}
            </p>

            <TableOfContents items={DEFAULT_TOC_ITEMS} />

            <BlogContent />

            <div className="flex flex-col gap-6">
              <div className="h-px bg-[#e9ecef]" />
              <ShareBar
                totalShares={DEFAULT_TOTAL_SHARES}
                views={post.views}
                shareUrl={`${SITE_URL}${blogPostHref(post.slug)}`}
              />
              <div className="h-px bg-[#e9ecef]" />
            </div>

            <AuthorCard
              name={post.author}
              designation={DEFAULT_DESIGNATION}
              bio={DEFAULT_AUTHOR_BIO}
              variant="full"
            />

            <div className="lg:hidden">
              <TagsList tags={tagsForPost(post)} />
            </div>
            <div className="lg:hidden">
              <RelatedBlogs slug={post.slug} />
            </div>
          </main>

          <LeftSidebar
            author={post.author}
            designation={DEFAULT_DESIGNATION}
            slug={post.slug}
            tags={tagsForPost(post)}
          />
        </div>
      </div>

      <NewsletterCTA />
    </div>
  );
}
