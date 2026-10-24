import { useParams, NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/blogDetail.css";
import blogPosts from "../data/blogPosts";

export default function BlogDetail() {
  const { slug } = useParams();

  const blog = blogPosts[slug];

  if (!blog) {
    return <div style={{ padding: "100px" }}>Blog not found.</div>;
  }

  return (
    <div className="blog-detail-page">

  <div className="blog-layout">

    {/* MAIN ARTICLE */}
    <div className="blog-main">
        <Link to="/blogs" className="back-to-blogs">
  ← Back to Blogs
</Link>
      <img src={blog.image} alt={blog.title} className="blog-main-image" />

      <h1>{blog.title}</h1>

      <div className="blog-meta-row">

  <div className="blog-meta-left">
    <span>Planning</span>
    <span>•</span>
    <span>5 min read</span>
  </div>

  <div className="blog-author">
  <img loading="lazy" decoding="async" src={blog.author.image} alt={blog.author.name} />
  <p>{blog.author.name}</p>
</div>

</div>

      <div
        className="blog-body"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>

    {/* SIDEBAR */}
    <aside className="blog-sidebar">
  <div className="sidebar-card">
    <h3>Latest Posts</h3>

    <Link to="/blogs/balanced-eating" className="sidebar-post">
  <img loading="lazy" decoding="async" src="/blogs/balanced-eating.webp" alt="" />
  <div>
    <span className="sidebar-tag">Nutrition</span>
    <p>Balanced Eating Without Counting Calories</p>
  </div>
</Link>

<Link to="/blogs/grocery-lists" className="sidebar-post">
  <img loading="lazy" decoding="async" src="/blogs/grocery-smart.jpg" alt="" />
  <div>
    <span className="sidebar-tag">Grocery</span>
    <p>Smart Grocery Lists</p>
  </div>
</Link>

<Link to="/blogs/consistency-over-motivation" className="sidebar-post">
  <img loading="lazy" decoding="async" src="/blogs/consistency.jpg" alt="" />
  <div>
    <span className="sidebar-tag">Mindset</span>
    <p>Consistency Over Motivation</p>
  </div>
</Link>

  </div>
</aside>

  </div>
  

</div>
  );
}