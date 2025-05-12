import { A, DIV, FOOTER } from "@fartlabs/htx";
import {
  BlogButton,
  ChatButton,
  GitHubButton,
} from "#/components/button/mod.ts";

export function PageFoot() {
  return (
    <FOOTER
      class="fart-section"
      style="display: flex; justify-content: space-between; align-items: center; margin: 0 auto; padding: 1rem"
    >
      <DIV>
        © FartLabs out the <A href="https://wazoo.tech/">Wazoo</A>
      </DIV>
      <DIV class="fart-inline">
        <BlogButton />
        <ChatButton />
        <GitHubButton />
      </DIV>
    </FOOTER>
  );
}
