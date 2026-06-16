"use client";

import Link from "next/link";
import type { BlogPost } from "@/lib/mockBlogs";
import { BlogCard } from "./BlogCard";
import { Eye, Pencil, Trash2 } from "lucide-react";

type BlogTableProps = {
  blogs: BlogPost[];
  onDelete: (blog: BlogPost) => void;
};

export function BlogTable({ blogs, onDelete }: BlogTableProps) {
  return (
    <>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Author</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id}>
                <td>
                  <div className="admin-table__title">{blog.title}</div>
                  <div className="admin-table__subtitle">{blog.slug}</div>
                </td>
                <td>{blog.category}</td>
                <td>
                  <span
                    className={`admin-badge ${
                      blog.status === "Published"
                        ? "admin-badge--published"
                        : "admin-badge--draft"
                    }`}
                  >
                    {blog.status}
                  </span>
                </td>
                <td>{blog.author}</td>
                <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="admin-table__actions">
                    <Link
                      className="admin-inline-link"
                      href={`/admin/blogs/${blog.id}`}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
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
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="admin-blog-grid">
        {blogs.map((blog) => (
          <BlogCard blog={blog} key={blog.id} onDelete={onDelete} />
        ))}
      </div>
    </>
  );
}
