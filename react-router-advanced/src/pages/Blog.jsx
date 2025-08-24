import { Link } from "react-router-dom";
import { posts } from "../data/posts.js";

export default function Blog() {
  return (
    <section>
      <h1>Blog</h1>
      <ul style={{ lineHeight: 2 }}>
        {posts.map(p => (
          <li key={p.id}>
            <Link to={`/blog/${p.id}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
      <p>Tip: Click a post to visit a dynamic route like <code>/blog/2</code>.</p>
    </section>
  );
}
