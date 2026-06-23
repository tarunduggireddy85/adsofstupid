"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BlogTable } from "@/components/admin/BlogTable";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { Toast } from "@/components/ui/Toast";
import { deleteBlog, getBlogs, setBlogStatus } from "@/lib/blogService";
import { type BlogPost } from "@/lib/mockBlogs";
import { Plus } from "lucide-react";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");
  const [pendingDelete, setPendingDelete] = useState<BlogPost | null>(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    (async () => {
      setBlogs(await getBlogs());
    })();

    const flashMessage = window.sessionStorage.getItem("admin-toast");

    if (flashMessage) {
      setToast(flashMessage);
      window.sessionStorage.removeItem("admin-toast");
    }
  }, []);

  async function handleConfirmDelete() {
    if (!pendingDelete) {
      return;
    }

    const title = pendingDelete.title;
    try {
      await deleteBlog(pendingDelete.id);
      setBlogs(await getBlogs());
      setToast(`"${title}" deleted.`);
    } catch (error) {
      setToast(error instanceof Error ? error.message : "Failed to delete blog.");
    } finally {
      setPendingDelete(null);
    }
  }

  async function handleStatusChange(blog: BlogPost, nextStatus: BlogPost["status"]) {
    try {
      await setBlogStatus(blog.id, nextStatus);
      setBlogs(await getBlogs());
      const verb =
        nextStatus === "Published" ? "published" : nextStatus === "Archived" ? "archived" : "moved to draft";
      setToast(`"${blog.title}" ${verb}.`);
    } catch (error) {
      setToast(error instanceof Error ? error.message : "Failed to update status.");
    }
  }

  const categories = Array.from(new Set(blogs.map((blog) => blog.category).filter(Boolean)));

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
            <option value="Archived">Archived</option>
          </select>
          <select
            className="admin-input"
            onChange={(event) => setCategory(event.target.value)}
            value={category}
          >
            <option value="All">All Categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {filteredBlogs.length ? (
          <BlogTable blogs={filteredBlogs} onDelete={setPendingDelete} onStatusChange={handleStatusChange} />
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
