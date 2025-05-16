import { DIV, H2, H3, P } from "@fartlabs/htx";
import { Button, Link, Section, TextGradient } from "@fartlabs/css";
import type { TubeColor } from "./featured_projects_section.tsx";

export function FeaturedGamesSection() {
  return (
    <Section>
      <H2 id="games" class="page-heading">
        <TextGradient>Featured games</TextGradient>
      </H2>

      <DIV class="projects">
        <GameSection
          titleHTML={
            <Link href="https://concentration.fart.tools/">
              Fart Concentration
            </Link>
          }
          descriptionHTML={
            <P>
              Fun and challenging memory game that puts your auditory memory
              skills to the test! Study each sound carefully, and try to
              remember where you heard it. Can you match them all? Open source
              on{" "}
              <Button href="https://github.com/FartLabs/concentration">
                GitHub★
              </Button>!
            </P>
          }
          tubeColor="magenta"
          tubeGlow
        />
      </DIV>
    </Section>
  );
}

export interface ProjectSectionProps {
  titleHTML: string;
  descriptionHTML: string;
  tubeColor?: TubeColor;
  tubeGlow: boolean;
}

function GameSection(props: ProjectSectionProps) {
  const className = `project${
    props.tubeColor ? ` border-tube-${props.tubeColor}` : ""
  }${props.tubeGlow ? " glow" : ""}`;
  return (
    <DIV class={className}>
      <H3 class="project-title">{props.titleHTML}</H3>
      {props.descriptionHTML}
    </DIV>
  );
}
