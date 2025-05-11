import { DIV, NAV } from "@fartlabs/htx";
import { Link } from "@fartlabs/css/link";
import {
  BlogButton,
  ChatButton,
  GitHubButton,
} from "#/components/button/mod.ts";

export function PageNav() {
  return (
    <NAV>
      <Link href="/" variant="visible-on-hover">FartLabs</Link>

      <DIV class="fart-inline">
        <BlogButton />
        <ChatButton />
        <GitHubButton />
      </DIV>
    </NAV>
  );
}
