"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getBlogById } from "@/lib/blogService";
import type { BlogPost } from "@/lib/mockBlogs";
import { ArrowLeft, Pencil } from "lucide-react";

export default function BlogPreviewPage() {
  const params = useParams<{ id: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setBlog(await getBlogById(params.id));
      setLoading(false);
    })();
  }, [params.id]);

  if (loading) {
    return (
      <div className="admin-page">
        <section className="admin-panel admin-empty-state">
          <h2>Loading…</h2>
        </section>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="admin-page">
        <section className="admin-panel admin-empty-state">
          <h2>Blog post not found</h2>
          <p>The requested blog could not be loaded.</p>
          <Link className="admin-button" href="/admin/blogs">
            <ArrowLeft size={16} />
            Back to blogs
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <section className="admin-panel admin-preview">
        <div className="admin-panel__header">
          <div>
            <p className="admin-overline">{blog.category}</p>
            <h2>{blog.title}</h2>
          </div>
          <Link className="admin-button" href={`/admin/blogs/${blog.id}/edit`}>
            <Pencil size={16} />
            Edit Blog
          </Link>
        </div>

        <div className="admin-preview__hero">
          {blog.featuredImage ? (
            <img alt={blog.title} src={blog.featuredImage} />
          ) : (
            <div className="admin-image-placeholder">No featured image</div>
          )}
        </div>

        <div className="admin-preview__meta">
          <span>Author: {blog.author}</span>
          <span>Date: {new Date(blog.publishDate || blog.createdAt).toLocaleDateString()}</span>
          <span>Status: {blog.status}</span>
        </div>

        <p className="admin-preview__description">{blog.description}</p>

        <div className="admin-tag-list">
          {blog.tags.map((tag) => (
            <span className="admin-tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>

        <article className="admin-preview__content">
          {blog.content.split("\n").map((paragraph, index) => (
            <p key={`${blog.id}-${index}`}>{paragraph}</p>
          ))}
        </article>

        <section className="admin-seo">
          <h3>SEO Details</h3>
          <div className="admin-seo__grid">
            <div>
              <strong>SEO Title</strong>
              <p>{blog.seoTitle || "Not provided"}</p>
            </div>
            <div>
              <strong>SEO Keywords</strong>
              <p>{blog.seoKeywords || "Not provided"}</p>
            </div>
            <div className="admin-seo__full">
              <strong>SEO Description</strong>
              <p>{blog.seoDescription || "Not provided"}</p>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
