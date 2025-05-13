import { BODY, HEAD, HTML, LINK, META, SCRIPT, TITLE } from "@fartlabs/htx";
import { Navbar } from "./navbar.tsx";
import { PageFoot } from "./foot.tsx";

export interface LayoutProps {
  title?: string;
  description?: string;
  headHTML?: string;
  children?: string[];
}

export const defaultTitle = "FartLabs, where imagination becomes software";
export const defaultDescription =
  "Software out the wazoo! Claim your free FartLabs Computer today.";

export function Layout(props: LayoutProps) {
  const title = props.title ?? defaultTitle;
  const description = props.description ?? defaultDescription;
  const layout = (
    <HTML lang="en">
      <HEAD>
        <META charset="UTF-8" />
        <META name="theme-color" content="#004021" />
        <META
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <TITLE>{title}</TITLE>
        <META name="description" content={description} />
        <Favicon />
        <GoogleAnalytics />
        {stylesheets
          .map((href) => <LINK rel="stylesheet" href={href} />)
          .join("")}
        {scripts
          .map((src) => <SCRIPT src={src} />)
          .join("")}
        {props.headHTML ?? ""}
      </HEAD>
      <BODY>
        <Navbar />
        {props.children?.join("") ?? ""}
        <PageFoot />

        <SCRIPT>{fartCssScript()}</SCRIPT>
      </BODY>
    </HTML>
  );

  return "<!DOCTYPE html>" + layout;
}

function Favicon() {
  return <LINK rel="icon" href="/fl-logo.png" />;
}

const fartCSS = "https://css.fart.tools/fart.css";

const stylesheets = [
  "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark-dimmed.min.css",
  "/tube-green.css",
  "/tube-purple.css",
  "/tube-yellow.css",
  "/tube-turquoise.css",
  "/tube-magenta.css",
  "/tube-orange.css",
  "/tube-blue.css",
  "/tube-empty.css",
  fartCSS,
  "/cubes.css",
  "/index.css",
];

const scripts = [
  "https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js",
  "https://cdnjs.cloudflare.com/ajax/libs/parallax/3.1.0/parallax.min.js",
];

function fartCssScript() {
  return `document.addEventListener("DOMContentLoaded", function() {
  const url = new URL(window.location.href);
  if (url.searchParams.size === 0) {
    return;
  }

  const linkElement = document.head.querySelector('link[href="${fartCSS}"]');
  if (linkElement === null) {
    return;
  }

  linkElement.href = "${fartCSS}" + url.search;
});`;
}

function GoogleAnalytics() {
  return `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-HQTZKLCP0C"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-HQTZKLCP0C');
</script>`;
}
