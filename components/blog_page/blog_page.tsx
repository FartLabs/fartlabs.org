import { HorizontalRule, Section } from "@fartlabs/css";
import { defaultTitle, Layout } from "../layout.tsx";
import { BlogHeroSection } from "./blog_hero_section.tsx";
import { BlogPostPreview } from "./blog_post_preview.tsx";
import { toTopicID } from "./posts.ts";
import { posts } from "./data.ts";

export interface BlogPageProps {
  topicID?: string;
}

export function BlogPage(props: BlogPageProps) {
  return (
    <Layout title={`Blog | ${defaultTitle}`}>
      <BlogHeroSection />

      <HorizontalRule />

      <Section class="blog-post-preview-list">
        {getPosts(props.topicID)
          .map((post) => <BlogPostPreview post={post} />)
          .join("")}
      </Section>
    </Layout>
  );
}

function getPosts(topicID?: string) {
  if (!topicID) {
    return posts;
  }

  return posts.filter((post) =>
    post.attrs.topics.some((t) => toTopicID(t) === topicID)
  );
}
