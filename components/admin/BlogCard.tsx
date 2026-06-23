"use client";

import Link from "next/link";
import type { BlogPost } from "@/lib/mockBlogs";
import { BlogStatusMenu } from "./BlogStatusMenu";
import { Eye, Pencil, Trash2 } from "lucide-react";

type BlogCardProps = {
  blog: BlogPost;
  onDelete: (blog: BlogPost) => void;
  onStatusChange: (blog: BlogPost, status: BlogPost["status"]) => void;
};

function badgeClass(status: BlogPost["status"]) {
  if (status === "Published") return "admin-badge--published";
  if (status === "Archived") return "admin-badge--archived";
  return "admin-badge--draft";
}

export function BlogCard({ blog, onDelete, onStatusChange }: BlogCardProps) {
  return (
    <article className="admin-blog-card">
      <div className="admin-blog-card__top">
        <div>
          <p className="admin-overline">{blog.category}</p>
          <h3 className="admin-blog-card__title">{blog.title}</h3>
        </div>
        <span className={`admin-badge ${badgeClass(blog.status)}`}>
          {blog.status}
        </span>
      </div>
      <p className="admin-blog-card__description">{blog.description}</p>
      <div className="admin-blog-card__meta">
        <span>{blog.author}</span>
        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>
      <div className="admin-blog-card__actions" style={{ marginTop: '16px' }}>
        <Link className="admin-inline-link" href={`/admin/blogs/${blog.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <Eye size={16} />
          View
        </Link>
        <Link
          className="admin-inline-link"
          href={`/admin/blogs/${blog.id}/edit`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginLeft: '12px' }}
        >
          <Pencil size={16} />
          Edit
        </Link>
        <button
          className="admin-inline-link admin-inline-link--danger"
          onClick={() => onDelete(blog)}
          type="button"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginLeft: '12px' }}
        >
          <Trash2 size={16} />
          Delete
        </button>
        <BlogStatusMenu blog={blog} onChange={onStatusChange} />
      </div>
    </article>
  );
}
