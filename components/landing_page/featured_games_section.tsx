import { DIV, H2, H3, P } from "@fartlabs/htx";
import { Button, Link, Section } from "@fartlabs/css";
import type { TubeColor } from "#/components/border-tube.tsx";

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
  const borderColor = getBorderColor(props.color);
  const backgroundColor = getBackgroundColor(props.color);

  return (
    <DIV
      class="project"
      style={`border: 1px solid ${borderColor}; border-radius: 0.5rem; background-color: ${backgroundColor};`}
    >
      <H3 class="project-title">{props.titleHTML}</H3>
      {props.descriptionHTML}
    </DIV>
  );
}

function getBorderColor(color: TubeColor): string {
  switch (color) {
    case "blue":
      return "rgba(59, 130, 246, 0.3)";
    case "turquoise":
      return "rgba(20, 184, 166, 0.3)";
    case "purple":
      return "rgba(168, 85, 247, 0.3)";
    case "yellow":
      return "rgba(234, 179, 8, 0.3)";
    case "magenta":
      return "rgba(236, 72, 153, 0.3)";
    case "green":
      return "rgba(34, 197, 94, 0.3)";
    case "orange":
      return "rgba(249, 115, 22, 0.3)";
    default:
      return "rgba(255, 255, 255, 0.3)";
  }
}

function getBackgroundColor(color: TubeColor): string {
  switch (color) {
    case "blue":
      return "rgba(59, 130, 246, 0.05)";
    case "turquoise":
      return "rgba(20, 184, 166, 0.05)";
    case "purple":
      return "rgba(168, 85, 247, 0.05)";
    case "yellow":
      return "rgba(234, 179, 8, 0.05)";
    case "magenta":
      return "rgba(236, 72, 153, 0.05)";
    case "green":
      return "rgba(34, 197, 94, 0.05)";
    case "orange":
      return "rgba(249, 115, 22, 0.05)";
    default:
      return "rgba(255, 255, 255, 0.05)";
  }
}
