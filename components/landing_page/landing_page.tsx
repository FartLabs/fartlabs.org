import { Layout } from "../layout.tsx";
import { featuredPosts } from "#/components/blog_page/data.ts";
import { HeroSection } from "./hero_section.tsx";
import { FeaturedBlogPostsSection } from "./featured_blog_posts_section.tsx";
import { FeaturedProjectsSection } from "./featured_projects_section.tsx";
import { FeaturedGamesSection } from "./featured_games_section.tsx";
import { RiseSection } from "./rise_section.tsx";
import { FAQsSection } from "./faqs_section.tsx";

export function LandingPage() {
  return (
    <Layout>
      <HeroSection />
      <FeaturedBlogPostsSection posts={featuredPosts} />
      <FeaturedProjectsSection />
      <FeaturedGamesSection />
      <RiseSection />
      <FAQsSection />
    </Layout>
  );
}
