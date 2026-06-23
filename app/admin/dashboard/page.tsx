"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getBlogs } from "@/lib/blogService";
import type { BlogPost } from "@/lib/mockBlogs";
import { Plus, Eye } from "lucide-react";

export default function DashboardPage() {
  const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([]);
  const [stats, setStats] = useState({
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    totalCategories: 0
  });

  useEffect(() => {
    let active = true;
    (async () => {
      const blogs = await getBlogs();
      if (!active) return;
      setRecentBlogs(blogs.slice(0, 5));
      setStats({
        totalBlogs: blogs.length,
        publishedBlogs: blogs.filter((b) => b.status === "Published").length,
        draftBlogs: blogs.filter((b) => b.status === "Draft").length,
        totalCategories: new Set(blogs.map((b) => b.category)).size
      });
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="admin-page">
      <section className="admin-stats">
        <article className="admin-stat-card">
          <span>Total Blogs</span>
          <strong>{stats.totalBlogs}</strong>
        </article>
        <article className="admin-stat-card">
          <span>Published Blogs</span>
          <strong>{stats.publishedBlogs}</strong>
        </article>
        <article className="admin-stat-card">
          <span>Draft Blogs</span>
          <strong>{stats.draftBlogs}</strong>
        </article>
        <article className="admin-stat-card">
          <span>Total Categories</span>
          <strong>{stats.totalCategories}</strong>
        </article>
      </section>

      <section className="admin-panel">
        <div className="admin-panel__header">
          <div>
            <p className="admin-overline">Recent posts</p>
            <h2>Latest blog activity</h2>
          </div>
          <Link className="admin-button" href="/admin/blogs/add">
            <Plus size={16} />
            Add New Blog
          </Link>
        </div>

        <div className="admin-list">
          {recentBlogs.map((blog) => (
            <div className="admin-list__item" key={blog.id}>
              <div>
                <h3>{blog.title}</h3>
                <p>
                  {blog.category} • {blog.author}
                </p>
              </div>
              <div className="admin-list__meta">
                <span
                  className={`admin-badge ${
                    blog.status === "Published"
                      ? "admin-badge--published"
                      : "admin-badge--draft"
                  }`}
                >
                  {blog.status}
                </span>
                <Link className="admin-inline-link" href={`/admin/blogs/${blog.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Eye size={16} />
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
