import type { WalkEntry } from "@std/fs/expand-glob";
import { expandGlob } from "@std/fs/expand-glob";
import { test } from "@std/front-matter";
import { extract } from "@std/front-matter/any";
import { renderHTML } from "./markdown.ts";

/**
 * getPostsByTopicID returns the blog posts by topic ID.
 */
export function getPostsByTopicID(posts: Post[], topicID?: string) {
  if (!topicID) {
    return posts;
  }

  return posts.filter((post) =>
    post.attrs.topics.some((t) => toTopicID(t) === topicID)
  );
}

/**
 * readPosts reads all the blog posts.
 */
export function readPosts(): Promise<Post[]> {
  return Array.fromAsync(expandGlob("blog/*.md"))
    .then((files) => {
      return Promise.all(files.map((file) => readPost(file)));
    })
    .then((posts) => {
      return posts
        .filter((post) => !post.attrs.draft)
        .toSorted(byDateDescending);
    });
}

/**
 * byPinnedDescending sorts posts by pinned status in descending order.
 */
export function byPinnedDescending(a: Post, b: Post): number {
  if (a.attrs.pinned && !b.attrs.pinned) {
    return -1;
  }

  if (!a.attrs.pinned && b.attrs.pinned) {
    return 1;
  }

  return byDateDescending(a, b);
}

/**
 * byDateDescending sorts posts by date in descending order.
 */
export function byDateDescending(a: Post, b: Post): number {
  return b.attrs.date.getTime() - a.attrs.date.getTime();
}

/**
 * readPostSync reads a blog post synchronously.
 */
export function readPost(entry: WalkEntry): Post {
  const md = Deno.readTextFileSync(entry.path);
  if (!test(md)) {
    throw new Error(`invalid front matter in ${entry.path}`);
  }

  const extracted = extract<PostAttrs>(md);
  if (!isPostAttrs(extracted.attrs)) {
    throw new Error(`invalid post attributes in ${entry.path}`);
  }

  const id = entry.name.replace(/\.md$/, "");
  return {
    id,
    attrs: extracted.attrs,
    html: renderHTML(
      `${(extracted.attrs.toc ?? true) ? tocPrefix : ""}${extracted.body}`,
    ),
  };
}

const tocPrefix = "<strong>On this page</strong>\n\n[[toc]]\n";

/**
 * countTopics counts the topics.
 */
export function countTopics(posts: Post[]): Map<string, number> {
  const topics = new Map<string, number>();
  for (const post of posts) {
    for (const topic of post.attrs.topics) {
      topics.set(topic, (topics.get(topic) ?? 0) + 1);
    }
  }

  return topics;
}

/**
 * getSortedTopics returns the topics of the blog posts sorted by frequency.
 */
export function getSortedTopics(posts: Post[]): string[] {
  return Array.from(countTopics(posts).entries())
    .toSorted(([aTopic, aCount], [bTopic, bCount]) =>
      aCount > bCount ? -1 : aCount < bCount ? 1 : aTopic.localeCompare(bTopic)
    )
    .map(([topic]) => topic);
}

/**
 * Post represents a blog post.
 */
export interface Post {
  id: string;
  attrs: PostAttrs;
  html: string;
}

/**
 * PostAttrs represents a blog post's attributes.
 */
export interface PostAttrs {
  pinned?: boolean;
  draft?: boolean;
  title: string;
  description: string;
  authors: PostAuthor[];
  topics: string[];
  date: Date;
  aliases?: string[];
  toc?: boolean;
}

/**
 * isPostAttrs checks if an object is a PostAttrs.
 */
// deno-lint-ignore no-explicit-any
export function isPostAttrs(obj: any): obj is PostAttrs {
  return (
    typeof obj.title === "string" &&
    typeof obj.description === "string" &&
    Array.isArray(obj.authors) &&
    // deno-lint-ignore no-explicit-any
    obj.authors.every((author: any) => isPostAuthor(author)) &&
    Array.isArray(obj.topics) &&
    // deno-lint-ignore no-explicit-any
    obj.topics.every((topic: any) => typeof topic === "string") &&
    obj.date instanceof Date
  );
}

/**
 * PostAuthor represents the author of a post.
 */
export interface PostAuthor {
  name: string;
  username: string;
}

/**
 * isPostAuthor checks if an object is a PostAuthor.
 */
// deno-lint-ignore no-explicit-any
export function isPostAuthor(obj: any): obj is PostAuthor {
  return (
    typeof obj.name === "string" &&
    typeof obj.username === "string"
  );
}

/**
 * toTopicIDs converts topic strings to topic IDs.
 */
export function toTopicIDs(topics: string[]) {
  return topics.map((topic) => toTopicID(topic));
}

/**
 * toTopicID converts a topic string to a topic ID.
 */
export function toTopicID(topic: string) {
  return topic.toLowerCase().replace(" ", "-");
}

/**
 * getFeaturedPosts returns the featured posts.
 */
export function getFeaturedPosts(posts: Post[], limit = 3): Post[] {
  return posts.toSorted(byPinnedDescending).slice(0, limit);
}

/**
 * getAliases returns the aliases of the blog posts.
 */
export function getAliases(posts: Post[]): Map<string, string> {
  const aliases = new Map<string, string>();
  for (const post of posts) {
    if (post.attrs.aliases === undefined) {
      continue;
    }

    for (const alias of post.attrs.aliases) {
      if (aliases.has(alias)) {
        throw new Error(`duplicate alias ${alias}`);
      }

      aliases.set(alias, `/${post.id}`);
    }
  }

  return aliases;
}
