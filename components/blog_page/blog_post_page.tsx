import { LINK, META } from "@fartlabs/htx";
import type { Post } from "#/components/blog_page/posts.ts";
import { PageLayout } from "#/components/page_layout.tsx";
import { PageSection } from "#/components/page_section.tsx";
import { PageBreak } from "#/components/page_break.tsx";
import { BlogPostPreview } from "#/components/blog_page/blog_post_preview.tsx";

export interface BlogPostPageProps {
  post: Post;
}

export function BlogPostPage(props: BlogPostPageProps) {
  return (
    <PageLayout
      title={props.post.attrs.title}
      description={props.post.attrs.description}
      headHTML={[
        <LINK rel="stylesheet" href="/blog-post.css" />,
        <META name="og:title" content={props.post.attrs.title} />,
        <META name="og:description" content={props.post.attrs.description} />,
        <META name="og:image" content="./og.png" />,
      ].join("")}
    >
      <PageSection>
        <BlogPostPreview post={props.post} level={1} />
      </PageSection>

      <PageBreak />

      <PageSection class="markdown-body">
        {props.post.html}
      </PageSection>
    </PageLayout>
  );
}
