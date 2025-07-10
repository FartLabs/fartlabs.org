import { A, DIV, NAV } from "@fartlabs/htx";
import { Header, Link } from "@fartlabs/css";
import {
  BlogButton,
  ChatButton,
  GitHubButton,
} from "#/components/button/mod.ts";

export function Navbar() {
  return (
    <NAV class="fart-navbar">
      <DIV>
        <Header class="fart-inline">
          <Link
            href="/"
            variant="visible-on-hover"
            style="font-weight: bold; color: var(--fart-primary)"
          >
            FartLabs
          </Link>
        </Header>

        <LinkGroup class="middle-navbar" />

        <DIV class="fart-inline">
          <A href="/#waitlist" class="fart-cta">
            Claim
          </A>
        </DIV>
      </DIV>
    </NAV>
  );
}

export function LinkGroup(props: { class: string }) {
  return (
    <DIV class={props.class}>
      <BlogButton />
      <ChatButton />
      <GitHubButton />
    </DIV>
  );
}
