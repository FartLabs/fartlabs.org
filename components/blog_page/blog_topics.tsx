import { A, DIV } from "@fartlabs/htx";
import { toTopicID } from "./posts.ts";

export interface BlogTopicsProps {
  topics: string[];
}

export function BlogTopics(props: BlogTopicsProps) {
  return (
    <DIV class="fart-topics">
      {props.topics
        .map((topic) => <BlogTopic topic={topic} />)
        .join(" ")}
    </DIV>
  );
}

export interface BlogTopicProps {
  topic: string;
}

export function BlogTopic(props: BlogTopicProps) {
  return (
    <A class="fart-button" href={`/blog/${toTopicID(props.topic)}`}>
      {props.topic}
    </A>
  );
}
