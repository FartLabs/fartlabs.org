import { DIV, NAV } from "@fartlabs/htx";
import { Header, Link } from "@fartlabs/css";
import {
  BlogButton,
  ChatButton,
  GitHubButton,
} from "#/components/button/mod.ts";

export function PageNav() {
  return (
    <NAV>
      <Header>
        <Link href="/" variant="visible-on-hover">FartLabs</Link>
      </Header>

      <DIV class="fart-inline">
        <BlogButton />
        <ChatButton />
        <GitHubButton />
      </DIV>
    </NAV>
  );
}
