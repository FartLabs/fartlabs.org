import { CODE, DIV, H2, H3, P, SPAN } from "@fartlabs/htx";
import { Link, Section } from "@fartlabs/css";

export function FeaturedProjectsSection() {
  return (
    <Section>
      <H2 id="projects" class="page-heading">
        Featured projects
      </H2>

      <DIV class="projects">
        <ProjectSection
          titleHTML={
            <Link href="https://github.com/FartLabs/jsonx">jsonx</Link>
          }
          descriptionHTML={
            <P>
              JSX runtime and compiler for composing JSON data. Visit the
              official{" "}
              <Link href="https://jsonx.fart.tools/">jsonx website</Link>{" "}
              to play with JSON like never before!
            </P>
          }
          tubeColor="magenta"
          tubeGlow
          topics={["deno", "jsr.io", "jsx/tsx"]}
        />

        <ProjectSection
          titleHTML={<Link href="https://github.com/FartLabs/htx">htx</Link>}
          descriptionHTML={
            <P>
              Library of <CODE>@fartlabs/jsonx</CODE>{" "}
              components for composing HTML content. Visit the generated{" "}
              <Link href="https://jsr.io/@fartlabs/htx">API documentation</Link>
              {" "}
              to learn more!
            </P>
          }
          tubeColor="purple"
          tubeGlow
          topics={["deno", "html", "jsr.io", "jsx/tsx"]}
        />

        <ProjectSection
          titleHTML={<Link href="https://github.com/FartLabs/rtx">rtx</Link>}
          descriptionHTML={
            <P>
              Library of <CODE>@fartlabs/jsonx</CODE> components for composing
              {" "}
              <CODE>@fartlabs/rt</CODE> routers. Visit the generated{" "}
              <Link href="https://jsr.io/@fartlabs/rtx">API documentation</Link>
              {" "}
              to learn more!
            </P>
          }
          tubeColor="blue"
          tubeGlow
          topics={["deno", "http", "jsr.io", "jsx/tsx"]}
        />

        <ProjectSection
          titleHTML={
            <Link href="https://github.com/FartLabs/fart.css">Fart.css</Link>
          }
          descriptionHTML={
            <P>
              CSS library reusable across{" "}
              <SPAN class="sparkle">fart-tastic</SPAN> frontends. Visit{" "}
              <Link href="https://css.fart.tools/">css.fart.tools</Link>{" "}
              to learn more!
            </P>
          }
          tubeColor="green"
          tubeGlow
          topics={["css"]}
        />
      </DIV>
    </Section>
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
  topics: string[];
  tubeColor?: TubeColor;
  tubeGlow: boolean;
}

function ProjectSection(props: ProjectSectionProps) {
  const className = `project${
    props.tubeColor ? ` border-tube-${props.tubeColor}` : ""
  }${props.tubeGlow ? " glow" : ""}`;
  return (
    <DIV class={className}>
      <H3 class="project-title">{props.titleHTML}</H3>
      {props.descriptionHTML}
      <ProjectTopics topics={props.topics} />
    </DIV>
  );
}

function ProjectTopics(props: { topics: string[] }) {
  return (
    <DIV class="fart-topics">
      {props.topics.map((topic) => <ProjectTopic topic={topic} />)}
    </DIV>
  );
}

function ProjectTopic(props: { topic: string }) {
  return <SPAN class="fart-topic">{props.topic}</SPAN>;
}
