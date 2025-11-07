import { A, BR, DIV, FOOTER, STRONG } from "@fartlabs/htx";
import { LinkGroup } from "./navbar.tsx";
import { ServicesStatus } from "./status.tsx";

export function PageFoot() {
  return (
    <FOOTER
      class="fart-section"
      style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 0 auto; padding: 1rem; gap: 1rem;"
    >
      <DIV>
        <DIV style="text-align: center;">
          <LinkGroup class="fart-inline" />
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
