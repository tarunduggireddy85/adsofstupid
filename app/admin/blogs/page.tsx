"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BlogTable } from "@/components/admin/BlogTable";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { Toast } from "@/components/ui/Toast";
import { deleteBlog, getBlogs } from "@/lib/blogService";
import { BLOG_CATEGORIES, type BlogPost } from "@/lib/mockBlogs";
import { Plus } from "lucide-react";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");
  const [pendingDelete, setPendingDelete] = useState<BlogPost | null>(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    setBlogs(getBlogs());

    const flashMessage = window.sessionStorage.getItem("admin-toast");

    if (flashMessage) {
      setToast(flashMessage);
      window.sessionStorage.removeItem("admin-toast");
    }
  }, []);

  function handleConfirmDelete() {
    if (!pendingDelete) {
      return;
    }

    deleteBlog(pendingDelete.id);
    setBlogs(getBlogs());
    setToast(`"${pendingDelete.title}" deleted.`);
    setPendingDelete(null);
  }

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === "All" || blog.status === status;
    const matchesCategory = category === "All" || blog.category === category;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="admin-page">
      {toast ? <Toast message={toast} onClose={() => setToast("")} /> : null}

      <section className="admin-panel">
        <div className="admin-panel__header">
          <div>
            <p className="admin-overline">Blog library</p>
            <h2>Manage all posts</h2>
          </div>
          <Link className="admin-button" href="/admin/blogs/add">
            <Plus size={16} />
            Add New Blog
          </Link>
        </div>

        <div className="admin-filters">
          <input
            className="admin-input"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title"
            value={search}
          />
          <select
            className="admin-input"
            onChange={(event) => setStatus(event.target.value)}
            value={status}
          >
            <option value="All">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
          <select
            className="admin-input"
            onChange={(event) => setCategory(event.target.value)}
            value={category}
          >
            <option value="All">All Categories</option>
            {BLOG_CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {filteredBlogs.length ? (
          <BlogTable blogs={filteredBlogs} onDelete={setPendingDelete} />
        ) : (
          <div className="admin-empty-state">
            <h3>No blogs found</h3>
            <p>Try adjusting your search or filters, or create a new blog post.</p>
            <Link className="admin-button" href="/admin/blogs/add">
              <Plus size={16} />
              Add Blog
            </Link>
          </div>
        )}
      </section>

      <ConfirmModal
        description={
          pendingDelete
            ? `This will remove "${pendingDelete.title}" from the local blog list.`
            : ""
        }
        isOpen={Boolean(pendingDelete)}
        onCancel={() => setPendingDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete blog post?"
      />
    </div>
  );
}
