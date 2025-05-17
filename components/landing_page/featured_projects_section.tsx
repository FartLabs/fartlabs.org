import { CODE, DIV, H2, H3, P, SPAN } from "@fartlabs/htx";
import { Link, Section, Sparkle, TextGradient } from "@fartlabs/css";
import type { TubeColor } from "#/components/border-tube.tsx";
import { BorderTube } from "#/components/border-tube.tsx";

export function FeaturedProjectsSection() {
  return (
    <Section>
      <H2 id="projects" class="page-heading">
        <TextGradient>Open source projects</TextGradient>
      </H2>

      <P>
        We are the creators, maintainers, and contributors of critical
        infrastructure projects in the TypeScript ecosystem.
      </P>

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
          color="magenta"
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
          color="purple"
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
          color="blue"
          topics={["deno", "http", "jsr.io", "jsx/tsx"]}
        />

        <ProjectSection
          titleHTML={
            <Link href="https://github.com/FartLabs/fart.css">Fart.css</Link>
          }
          descriptionHTML={
            <P>
              CSS library reusable across <Sparkle>fart-tastic</Sparkle>{" "}
              frontends. Visit{" "}
              <Link href="https://css.fart.tools/">css.fart.tools</Link>{" "}
              to learn more!
            </P>
          }
          color="green"
          topics={["css"]}
        />
      </DIV>
    </Section>
  );
}

export interface ProjectSectionProps {
  titleHTML: string;
  descriptionHTML: string;
  topics: string[];
  color: TubeColor;
}

function ProjectSection(props: ProjectSectionProps) {
  return (
    <BorderTube glow color={props.color} class="project">
      <H3 class="project-title">{props.titleHTML}</H3>
      {props.descriptionHTML}
      <ProjectTopics topics={props.topics} />
    </BorderTube>
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
