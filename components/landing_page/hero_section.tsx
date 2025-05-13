import { A, BR, H1 } from "@fartlabs/htx";
import { Section, TextSpecial } from "@fartlabs/css";

export function HeroSection() {
  return (
    <Section class="hero background-blob">
      <H1 id="imagination" class="page-heading">
        The last <TextSpecial>Computer</TextSpecial>
        <BR />you will ever need
      </H1>

      <A href="#waitlist" class="fart-cta">
        Claim your free computer
      </A>
    </Section>
  );
}
