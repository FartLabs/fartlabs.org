import {
  getAliases,
  getFeaturedPosts,
  getSortedTopics,
  readPosts,
} from "./posts.ts";

export const posts = await readPosts();
export const featuredPosts = getFeaturedPosts(posts);
export const topics = getSortedTopics(posts);
export const aliases = getAliases(posts);
