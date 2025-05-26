import { DIV, H2, H3, P } from "@fartlabs/htx";
import { Button, Link, Section } from "@fartlabs/css";
import type { TubeColor } from "#/components/border-tube.tsx";
import { BorderTube } from "#/components/border-tube.tsx";

export function FeaturedGamesSection() {
  return (
    <Section>
      <H2 id="games" class="page-heading">Featured games</H2>

      <DIV class="projects">
        <GameSection
          color="magenta"
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
        />
      </DIV>
    </Section>
  );
}

export interface ProjectSectionProps {
  titleHTML: string;
  descriptionHTML: string;
  color: TubeColor;
}

function GameSection(props: ProjectSectionProps) {
  return (
    <BorderTube glow color={props.color} class="project">
      <H3 class="project-title">{props.titleHTML}</H3>
      {props.descriptionHTML}
    </BorderTube>
  );
}
