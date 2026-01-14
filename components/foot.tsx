import { A, BR, DIV, FOOTER, STRONG } from "@fartlabs/htx";
import { ServicesStatus } from "./status.tsx";
import {
  BlogButton,
  BlueskyButton,
  CareersButton,
  ChatButton,
  GitHubButton,
  InstagramButton,
  LinkedInButton,
  TwitterButton,
  YouTubeButton,
} from "./button/mod.ts";

export function PageFoot() {
  return (
    <FOOTER
      class="fart-section"
      style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 0 auto; padding: 1rem; gap: 1rem;"
    >
      <DIV>
        <DIV style="text-align: center;">
          <DIV>
            <BlogButton />&nbsp;<ChatButton />&nbsp;<GitHubButton />&nbsp;<BlueskyButton />&nbsp;<InstagramButton />&nbsp;<LinkedInButton />&nbsp;<TwitterButton />&nbsp;<YouTubeButton />&nbsp;<CareersButton />
          </DIV>
        </DIV>
      </DIV>

      <DIV style="text-align: center;">
        © FartLabs out the <A href="https://wazoo.tech/">Wazoo</A>
        <BR />
        <BR />
        <ServicesStatus />
      </DIV>

      <DIV style="text-align: center;">
        <STRONG>P.O. Box 1312</STRONG>
        <BR />
        Garden Grove, CA 92842
      </DIV>
    </FOOTER>
  );
}
