import { DIV } from "@fartlabs/htx/div";
import { Button } from "@fartlabs/css/button";
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
    <Button href={`/blog/${toTopicID(props.topic)}`}>
      {props.topic}
    </Button>
  );
}
