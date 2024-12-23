import { ImageResponse } from "https://deno.land/x/og_edge/mod.ts";
import { PostAttrs } from "#/components/blog_page/posts.ts";

// Can use non-JSX syntax to create an image
// https://github.com/vercel/satori?tab=readme-ov-file#use-without-jsx
export function ogImgHandler(metadata: PostAttrs): Response {
  return new ImageResponse(
    // Test OG img. to be worked upon later
    {
      type: "div",
      props: {
        children: "hello, world",
        style: { color: "black" },
      },
    },
  );
}
