import { H2, P } from "@fartlabs/htx";
import { Section, Shake, Sparkle, TextGradient } from "@fartlabs/css";

export function FutureOfComputingSection() {
  return (
    <Section>
      <H2 id="future-of-computing" class="page-heading">
        <TextGradient>Future of computing</TextGradient>
      </H2>

      <P>
        Our system adapts to you, not the other way around. With{" "}
        <Sparkle>imagination-driven</Sparkle>{" "}
        development, the computer responds to your thoughts and needs, creating
        a truly personalized experience.
      </P>

      <P>
        For researchers, scientists, academics, students, and engineers, the
        {" "}
        <Shake style="font-weight: bold">FartLabs Computer</Shake>{" "}
        provides a unique platform for exploring new ideas and collaborating on
        projects. With its intuitive interface and flexible architecture, it's
        the perfect tool for anyone looking to push the boundaries of
        technology.
      </P>
    </Section>
  );
}
