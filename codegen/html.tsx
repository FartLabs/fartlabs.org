import { LandingPage } from "#/components/landing_page/mod.ts";
import { aliases, posts, topics } from "#/components/blog_page/data.ts";
import { toTopicID } from "#/components/blog_page/posts.ts";
import { BlogPage } from "#/components/blog_page/blog_page.tsx";
import { BlogPostPage } from "#/components/blog_page/blog_post_page.tsx";
import { RedirectPage } from "#/components/redirect_page.tsx";
import { renderPostImageResponse } from "#/codegen/og.tsx";

/**
 * generateHTML generates the HTML files for the website.
 */
export async function generateHTML(directory: string) {
  await Deno.writeTextFile(`${directory}/index.html`, <LandingPage />);

  await Deno.mkdir(`${directory}/blog`, { recursive: true });
  await Deno.writeTextFile(`${directory}/blog/index.html`, <BlogPage />);

  for (const topic of topics) {
    const topicID = toTopicID(topic);
    await Deno.mkdir(`${directory}/blog/${topicID}`, { recursive: true });
    await Deno.writeTextFile(
      `${directory}/blog/${topicID}/index.html`,
      <BlogPage topicID={topicID} />,
    );
  }

  for (const post of posts) {
    await Deno.mkdir(`${directory}/${post.id}`, { recursive: true });
    await Deno.writeTextFile(
      `${directory}/${post.id}/index.html`,
      <BlogPostPage post={post} />,
    );

    const ogPNG = renderPostImageResponse(post);
    await Deno.writeFile(`${directory}/${post.id}/og.png`, await ogPNG.bytes());
  }

  for (const [alias, destination] of aliases) {
    await Deno.mkdir(`${directory}/${alias}`, { recursive: true });
    await Deno.writeTextFile(
      `${directory}/${alias}/index.html`,
      <RedirectPage to={destination} />,
    );
  }
}
