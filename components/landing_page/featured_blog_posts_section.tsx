import { H2 } from "@fartlabs/htx";
import { Section } from "@fartlabs/css/section";
import type { Post } from "#/components/blog_page/posts.ts";
import { BlogPostPreviewList } from "#/components/blog_page/blog_post_preview_list.tsx";

export interface FeaturedBlogPostsSectionProps {
  posts: Post[];
}

export function FeaturedBlogPostsSection(props: FeaturedBlogPostsSectionProps) {
  return (
    <Section>
      <H2 id="blog-posts" class="page-heading">
        Featured blog posts
      </H2>

      <BlogPostPreviewList posts={props.posts} />
    </Section>
  );
}
