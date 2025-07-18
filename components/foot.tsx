import { A, BR, DIV, FOOTER } from "@fartlabs/htx";
import { LinkGroup } from "./navbar.tsx";
import { ServicesStatus } from "./status.tsx";

export function PageFoot() {
  return (
    <FOOTER
      class="fart-section"
      style="display: flex; justify-content: space-between; align-items: center; margin: 0 auto; padding: 1rem"
    >
      <DIV style="display: flex; align-items: center; gap: 2rem">
        <DIV>
          © FartLabs out the <A href="https://wazoo.tech/">Wazoo</A>
          <BR />
          <ServicesStatus />
        </DIV>
      </DIV>

      <LinkGroup class="fart-inline" />
    </FOOTER>
  );
}
