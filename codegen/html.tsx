import { LandingPage } from "#/components/landing_page/mod.ts";
import { PeoplePage } from "#/components/people_page/mod.ts";
import { aliases, posts, topics } from "#/components/blog_page/data.ts";
import { toTopicID } from "#/components/blog_page/posts.ts";
import { BlogPage } from "#/components/blog_page/blog_page.tsx";
import { BlogPostPage } from "#/components/blog_page/blog_post_page.tsx";
import { PageRedirect } from "#/components/page_redirect.tsx";
import people from "#/static/people.json" with { type: "json" };
import { ogImgHandler } from "#/lib/og.ts";

/**
 * generateHTML generates the HTML files for the website.
 */
export async function generateHTML(directory: string) {
  await Deno.writeTextFile(`${directory}/index.html`, <LandingPage />);

  await Deno.mkdir(`${directory}/people`, { recursive: true });
  await Deno.writeTextFile(
    `${directory}/people/index.html`,
    <PeoplePage people={people} />,
  );

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

    const image = ogImgHandler(post.attrs);
    await Deno.writeFile(`${directory}/${post.id}/og.png`, await image.bytes());
  }

  for (const [alias, destination] of aliases) {
    await Deno.mkdir(`${directory}/${alias}`, { recursive: true });
    await Deno.writeTextFile(
      `${directory}/${alias}/index.html`,
      <PageRedirect to={destination} />,
    );
  }
}
