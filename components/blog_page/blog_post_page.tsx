import { LINK } from "@fartlabs/htx";
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
        `<meta property="og:image" content="https://fartlabs.org/${props.post.id}/og.png">`,
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
