import { DIV, H1, H3, P, SPAN, TIME } from "@fartlabs/htx";
import { Link } from "@fartlabs/css/link";
import type { Post, PostAuthor } from "./posts.ts";
import { BlogTopics } from "./blog_topics.tsx";

export function BlogPostPreview(props: { post: Post; level?: 1 | 3 }) {
  const Heading = props.level === 1 ? H1 : H3;
  return (
    <DIV class="post-preview">
      <Heading>
        <Link href={`/${props.post.id}`}>{props.post.attrs.title}</Link>
      </Heading>
      <BlogPostDate date={props.post.attrs.date} /> |{" "}
      <SPAN class="post-authors">
        {props.post.attrs.authors
          .map((author) => <BlogPostAuthor author={author} />)
          .join(", ")}
      </SPAN>
      <P>{props.post.attrs.description}</P>
      <BlogTopics topics={props.post.attrs.topics} />
    </DIV>
  );
}

function BlogPostDate(props: { date: Date }) {
  return (
    <TIME datetime={props.date.toISOString()} class="post-date">
      {Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
      }).format(props.date)}
    </TIME>
  );
}

function BlogPostAuthor(props: { author: PostAuthor }) {
  return (
    <Link href={`https://github.com/${props.author.username}`}>
      {props.author.name}
    </Link>
  );
}
