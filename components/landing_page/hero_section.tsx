import { A, BR, DIV, H1, SCRIPT } from "@fartlabs/htx";
import { Section, TextSpecial } from "@fartlabs/css";

export function HeroSection() {
  // https://github.com/wagerfield/parallax#2-configuration
  return (
    <Section class="hero background-blob">
      <DIV class="hero-parallax-container" data-relative-input="true">
        <DIV data-depth="0.1">
          <H1 id="imagination" class="page-heading">
            The last <TextSpecial>Computer</TextSpecial>
            <BR />you will ever need
          </H1>
        </DIV>
      </DIV>

      <A href="#waitlist" class="fart-cta">
        Claim your free computer
      </A>

      <SCRIPT>{PARALLAX_SCRIPT}</SCRIPT>
    </Section>
  );
}

const PARALLAX_SCRIPT = `document.addEventListener("DOMContentLoaded", () => {
  new Parallax(
    document.querySelector(".hero-parallax-container", { relativeInput: true })
  );
});`;
