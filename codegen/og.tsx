/** @jsxImportSource react */
/** @jsxTypesImportSource @types/react */

import { ImageResponse } from "og_edge";
import type { Post } from "#/components/blog_page/posts.ts";

const Overpass = await loadGoogleFont("Overpass");

export function renderPostImageResponse(post: Post): Response {
  return new ImageResponse(
    <div
      style={{
        backgroundColor: "#004021",
        color: "#c3ef3c",
        height: "100%",
        width: "100%",
        fontSize: 100,
        fontFamily: "Overpass",
        paddingTop: "100px",
        paddingLeft: "50px",
      }}
    >
      {post.attrs.title}
    </div>,
    {
      width: 1200,
      height: 650,
      fonts: [{ name: "Overpass", data: Overpass, style: "normal" }],
    },
  );
}

// https://vercel.com/guides/using-custom-font
async function loadGoogleFont(font: string) {
  const url = new URL("https://fonts.googleapis.com/css2");
  url.searchParams.set("family", font);
  const css = await fetch(url).then((response) => response.text());
  const resources = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/,
  );

  if (resources === null) {
    throw new Error("failed to load font data");
  }

  return await fetch(resources[1]).then((response) => response.arrayBuffer());
}
