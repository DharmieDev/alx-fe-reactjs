import { useParams, Link } from "react-router-dom";
import { posts } from "../data/posts.js";

export default function BlogPost() {
  const { postId } = useParams();
  const post = posts.find(p => p.id === postId);

  if (!post) {
    return (
      <section>
        <h1>Post not found</h1>
        <p>No post with id: {postId}</p>
        <Link to="/blog">Back to blog</Link>
      </section>
    );
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <p><Link to="/blog">← Back to blog</Link></p>
    </article>
  );
}
