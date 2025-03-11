import { A, DIV, H2, H3, P } from "@fartlabs/htx";
import { PageSection } from "#/components/page_section.tsx";

export function FeaturedGamesSection() {
  return (
    <PageSection>
      <H2 id="games" class="page-heading">
        Featured games
      </H2>

      <DIV class="projects">
        <GameSection
          titleHTML={
            <A href="https://concentration.fart.tools/" class="fart-link">
              Fart Concentration
            </A>
          }
          descriptionHTML={
            <P>
              Fun and challenging memory game that puts your auditory memory
              skills to the test! Study each sound carefully, and try to
              remember where you heard it. Can you match them all? Open source
              on{" "}
              <A
                class="fart-button"
                href="https://github.com/FartLabs/concentration"
              >
                GitHub★
              </A>!
            </P>
          }
          tubeColor="magenta"
          tubeGlow
        />
      </DIV>
    </PageSection>
  );
}

type TubeColor =
  | "blue"
  | "turquoise"
  | "purple"
  | "yellow"
  | "magenta"
  | "green"
  | "orange";

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
