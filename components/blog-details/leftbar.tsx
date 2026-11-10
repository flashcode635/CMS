import AuthorCard from "@/components/blog-details/AuthorCard";
import TagsList from "@/components/blog-details/TagsList";
import RelatedBlogs from "@/components/blog-details/RelatedBlogs";
import Button from "../ui/Button";

interface LeftSidebarProps {
  author: string;
  designation?: string;
  slug: string;
  tags: string[];
}

export default function LeftSidebar({
  author,
  designation,
  slug,
  tags,
}: LeftSidebarProps) {
  return (
    <aside
      className="
        hidden lg:flex
        flex-col gap-14
        w-full lg:w-68.5
        shrink-0
         lg:top-8
        lg:self-start
      "
      aria-label="Blog sidebar"
    >
      <AuthorCard
        name={author}
        designation={designation}
        variant="sidebar"
      />

      <TagsList tags={tags} />

      <RelatedBlogs slug={slug} />
      <Button type="button"/>
    </aside>
  );
}