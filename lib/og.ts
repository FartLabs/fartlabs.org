import { ImageResponse } from "og_edge";
import { PostAttrs } from "#/components/blog_page/posts.ts";

// Can use non-JSX syntax to create an image
// https://github.com/vercel/satori?tab=readme-ov-file#use-without-jsx
export function ogImgHandler(_metadata: PostAttrs): Response {
  return new ImageResponse({
    type: "div",
    props: {
      children: "hello, world",
      style: { color: "black" },
    },
  } as any);
}
