"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BlogForm } from "@/components/admin/BlogForm";
import { getBlogById, updateBlog } from "@/lib/blogService";
import type { BlogInput } from "@/lib/blogService";
import type { BlogPost } from "@/lib/mockBlogs";

export default function EditBlogPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      setBlog(await getBlogById(params.id));
      setLoading(false);
    })();
  }, [params.id]);

  async function handleUpdate(values: BlogInput) {
    setError("");
    try {
      await updateBlog(params.id, values);
      window.sessionStorage.setItem("admin-toast", "Blog updated successfully.");
      router.push("/admin/blogs");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update blog post.");
    }
  }

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
          <p>The blog you are trying to edit does not exist.</p>
          <Link className="admin-button" href="/admin/blogs">
            Back to blogs
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <section className="admin-panel">
        <div className="admin-panel__header">
          <div>
            <p className="admin-overline">Update content</p>
            <h2>Edit blog post</h2>
          </div>
        </div>
        {error ? <p className="admin-error" style={{ marginBottom: "1rem" }}>{error}</p> : null}
        <BlogForm initialValues={blog} onSubmit={handleUpdate} submitLabel="Save Changes" />
      </section>
    </div>
  );
}
