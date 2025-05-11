import { H2 } from "@fartlabs/htx/h2";
import { Link, Section } from "@fartlabs/css";
import { BlogTopics } from "./blog_topics.tsx";
import { topics } from "./data.ts";

export function BlogHeroSection() {
  return (
    <Section class="blog-hero">
      <H2 id="blog" class="page-heading">
        <Link href="/blog" variant="visible-on-hover">Blog</Link>
      </H2>

      <BlogTopics topics={topics} />
    </Section>
  );
}
