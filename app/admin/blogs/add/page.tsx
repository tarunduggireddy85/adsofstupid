"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BlogForm } from "@/components/admin/BlogForm";
import { createBlog } from "@/lib/blogService";
import type { BlogInput } from "@/lib/blogService";

export default function AddBlogPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleCreate(values: BlogInput) {
    setError("");
    try {
      await createBlog(values);
      window.sessionStorage.setItem("admin-toast", "Blog created successfully.");
      router.push("/admin/blogs");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create blog post.");
    }
  }

  return (
    <div className="admin-page">
      <section className="admin-panel">
        <div className="admin-panel__header">
          <div>
            <p className="admin-overline">New content</p>
            <h2>Create a blog post</h2>
          </div>
        </div>
        {error ? <p className="admin-error" style={{ marginBottom: "1rem" }}>{error}</p> : null}
        <BlogForm onSubmit={handleCreate} submitLabel="Create Blog" />
      </section>
    </div>
  );
}
