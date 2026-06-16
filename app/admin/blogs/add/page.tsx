"use client";

import { useRouter } from "next/navigation";
import { BlogForm } from "@/components/admin/BlogForm";
import { createBlog } from "@/lib/blogService";
import type { BlogInput } from "@/lib/blogService";

export default function AddBlogPage() {
  const router = useRouter();

  async function handleCreate(values: BlogInput) {
    createBlog(values);
    window.sessionStorage.setItem("admin-toast", "Blog created successfully.");
    router.push("/admin/blogs");
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
        <BlogForm onSubmit={handleCreate} submitLabel="Create Blog" />
      </section>
    </div>
  );
}
