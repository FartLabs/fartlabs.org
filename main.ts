import { serveDir } from "@std/http/file-server";
import { useGoogleAnalytics } from "./google-analytics.ts";
import { join } from "@std/path";
import { extract } from "@std/front-matter/any";
import { isPostAttrs, PostAttrs } from "#/components/blog_page/posts.ts";
import { ogImgHandler } from "#/lib/og.ts";

const blogNames = await getBlogMarkdownFilenames("/blog");

Deno.serve(useGoogleAnalytics(
  Deno.env.get("GOOGLE_ANALYTICS_ID")!,
  mainHandler,
));

async function mainHandler(req: Request) {
  const ogImgResp = await handleOgImgGeneration(req);
  if (ogImgResp) return ogImgResp;
  return serveDir(req, { fsRoot: Deno.args[0] ?? "." });
}

async function handleOgImgGeneration(req: Request): Promise<Response | null> {
  const url = new URL(req.url);

  // Remove leading slash
  const path = url.pathname.startsWith("/")
    ? url.pathname.slice(1)
    : url.pathname;

  const ogImgEndpt = "/og.png";
  const pathWithoutOg = path.endsWith(ogImgEndpt)
    ? path.replace(ogImgEndpt, "")
    : path;

  if (
    blogNames.includes(pathWithoutOg)
  ) {
    console.log(`Generating OG image for ${pathWithoutOg}`);
    const mdPath = join(".", "blog", pathWithoutOg + ".md");
    const metadata = await getPostMetadata(mdPath);
    if (!metadata) {
      return new Response("Not found", { status: 404 });
    }
    return ogImgHandler(metadata);
  }
  return null;
}

// Retrieve markdown frontmatter from /blog
async function getPostMetadata(mdPath: string): Promise<PostAttrs | null> {
  try {
    const md = await Deno.readTextFile(mdPath);
    const extracted = extract<PostAttrs>(md);
    if (!isPostAttrs(extracted.attrs)) {
      throw new Error(`invalid front matter in ${mdPath}`);
    }
    return extracted.attrs;
  } catch {
    return null;
  }
}

async function getBlogMarkdownFilenames(blogDir: string) {
  const blogFiles = [];
  const dir = join(".", blogDir);
  for await (const entry of Deno.readDir(dir)) {
    if (entry.isFile && entry.name.endsWith(".md")) {
      blogFiles.push(entry.name.replace(".md", ""));
    }
  }
  return blogFiles;
}
