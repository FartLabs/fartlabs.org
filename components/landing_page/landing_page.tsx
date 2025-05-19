import { SCRIPT } from "@fartlabs/htx/script";
import { featuredPosts } from "#/components/blog_page/data.ts";
import { Layout } from "#/components/layout.tsx";
import { FAQsSection } from "./faqs_section.tsx";
import { FeaturedBlogPostsSection } from "./featured_blog_posts_section.tsx";
import { FeaturedGamesSection } from "./featured_games_section.tsx";
import { FeaturedProjectsSection } from "./featured_projects_section.tsx";
import { FutureOfComputingSection } from "./future_of_computing_section.tsx";
import { HeroSection } from "./hero_section.tsx";
import { RiseSection } from "./rise_section.tsx";
import { WaitlistSection } from "./waitlist_section.tsx";

export function LandingPage() {
  return (
    <Layout headHTML={scripts.join("")}>
      <HeroSection />
      <FutureOfComputingSection />
      <WaitlistSection />
      <RiseSection />
      <FeaturedProjectsSection />
      <FeaturedGamesSection />
      <FeaturedBlogPostsSection posts={featuredPosts} />
      <FAQsSection />
    </Layout>
  );
}

const scripts = [
  <SCRIPT src="https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js" />,
  <SCRIPT src="https://cdnjs.cloudflare.com/ajax/libs/parallax/3.1.0/parallax.min.js" />,
  <SCRIPT src="https://www.google.com/recaptcha/api.js?render=6LfJUC8rAAAAALwhkiZR_6YxdJGF9Q42jOkAXfa1" />,
  <ClaimFocusScript />,
];

/**
 * ClaimFocusScript is a script that focuses the email input when the
 * `#waitlist` link is clicked.
 */
function ClaimFocusScript() {
  return (
    <SCRIPT>
      {`document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.querySelector("#email");
  if (!emailInput) {
    return;
  }
  
  if (new URL(location.href).hash === "#waitlist") {
    setTimeout(() => {
      emailInput.focus();
    });
  }

  document.querySelectorAll("a[href='/#waitlist']").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      emailInput.focus();
    });
  });
});`}
    </SCRIPT>
  );
}
