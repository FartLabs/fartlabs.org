import { BODY, HEAD, HTML, LINK, META, SCRIPT, TITLE } from "@fartlabs/htx";
import { Navbar } from "./navbar.tsx";
import { PageFoot } from "./foot.tsx";

export interface LayoutProps {
  title?: string;
  description?: string;
  headHTML?: string;
  children?: string[];
}

export const defaultTitle = "FartLabs, software out the Wazoo";
export const defaultDescription = "Claim your free FartLabs Computer today.";

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
        <GoogleAnalyticsScript />
        {stylesheets
          .map((href) => <LINK rel="stylesheet" href={href} />)
          .join("")}
        {props.headHTML ?? ""}
      </HEAD>
      <BODY>
        <Navbar />
        {props.children?.join("") ?? ""}
        <PageFoot />

        <FartCssScript />
      </BODY>
    </HTML>
  );

  return "<!DOCTYPE html>" + layout;
}

function Favicon() {
  return <LINK rel="icon" href="/fl-logo.png" />;
}

const fartCss = "https://css.fart.tools/fart.css";

const stylesheets = [
  "/index.css",
  "/cubes.css",
  fartCss,
  "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark-dimmed.min.css",
];

function FartCssScript() {
  return (
    <SCRIPT>
      {`document.addEventListener("DOMContentLoaded", function() {
  const url = new URL(window.location.href);
  if (url.searchParams.size === 0) {
    return;
  }

  const linkElement = document.head.querySelector('link[href="${fartCss}"]');
  if (linkElement === null) {
    return;
  }

  linkElement.href = "${fartCss}" + url.search;
});`}
    </SCRIPT>
  );
}

function GoogleAnalyticsScript() {
  return `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-HQTZKLCP0C"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-HQTZKLCP0C');
</script>`;
}
