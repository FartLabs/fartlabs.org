import { DIV, H2, H3, P } from "@fartlabs/htx";
import { Link, Section, Sparkle, TextGradient } from "@fartlabs/css";
import {
  BlogButton,
  ChatButton,
  GitHubButton,
} from "#/components/button/mod.ts";

export function FAQsSection() {
  return (
    <Section class="faq">
      <H2 id="faq" class="page-heading">
        <TextGradient>FAQs</TextGradient>
      </H2>

      <FAQSection
        id="what-is-fartlabs"
        questionHTML="What is FartLabs?"
        answerHTML={
          <P>
            We ethically develop economically-sustainable, built-to-last,
            open-source software libraries with an emphasis on
            <Sparkle style="font-weight: bold">imagination-driven</Sparkle>{" "}
            development, empowering developers to create their own durable
            software projects. Learn more about us on our <BlogButton />. blog.
          </P>
        }
      />

      <FAQSection
        id="join-community"
        questionHTML="How do I join the community?"
        answerHTML={
          <P>
            Join our <ChatButton />{" "}
            to hang out with us and other members of the community. Also, check
            out our org on <GitHubButton />.
          </P>
        }
      />
    </Section>
  );
}

interface FAQSectionProps {
  id: string;
  questionHTML: string;
  answerHTML: string;
}

function FAQSection(props: FAQSectionProps) {
  return (
    <DIV>
      <H3 id={props.id} class="page-heading-2">
        <Link href={`#${props.id}`}>{props.questionHTML}</Link>
      </H3>
      {props.answerHTML}
    </DIV>
  );
}
