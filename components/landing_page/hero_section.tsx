import { BR, H1 } from "@fartlabs/htx";
import { Section, TextGradient, TextSpecial } from "@fartlabs/css";

export function HeroSection() {
  return (
    <Section class="hero background-blob">
      <H1 id="imagination" class="page-heading">
        <TextGradient>
          The last <TextSpecial>Computer</TextSpecial>
          <BR />you will ever need
        </TextGradient>
      </H1>
    </Section>
  );
}
