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
        ...og(props.post),
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

function og(post: Post, host = "https://fartlabs.org"): string[] {
  return [
    `<meta property="og:title" content="${post.attrs.title}">`,
    `<meta property="og:description" content="${post.attrs.description}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:url" content="${host}/${post.id}">`,
    `<meta property="og:image" content="${host}/${post.id}/og.png">`,
    `<meta property="og:image:type" content="image/png">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:site_name" content="FartLabs">`,
    `<meta property="og:locale" content="en_US">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${post.attrs.title}">`,
    `<meta name="twitter:description" content="${post.attrs.description}">`,
    `<meta name="twitter:image" content="${host}/${post.id}/og.png">`,
  ];
}
