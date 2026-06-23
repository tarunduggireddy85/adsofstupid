import type { BlogPost } from "./mockBlogs";

export type BlogInput = Omit<BlogPost, "id" | "createdAt">;

/* Admin blog client — talks to the real API (/api/blogs), which persists to
   data/blogs.json. Changes made here appear on the live site. Auth is handled
   by the admin_auth cookie, sent automatically on same-origin requests. */

async function parseError(response: Response, fallback: string) {
  const payload = (await response.json().catch(() => null)) as { error?: string } | null;
  return payload?.error ?? fallback;
}

export async function getBlogs(): Promise<BlogPost[]> {
  const response = await fetch("/api/blogs", { cache: "no-store" });
  if (!response.ok) return [];
  return (await response.json()) as BlogPost[];
}

export async function getBlogById(id: string): Promise<BlogPost | null> {
  const response = await fetch(`/api/blogs/${id}`, { cache: "no-store" });
  if (!response.ok) return null;
  return (await response.json()) as BlogPost;
}

export async function createBlog(input: BlogInput): Promise<BlogPost> {
  const response = await fetch("/api/blogs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  });
  if (!response.ok) {
    throw new Error(await parseError(response, "Failed to create blog post."));
  }
  return (await response.json()) as BlogPost;
}

export async function updateBlog(id: string, input: BlogInput): Promise<BlogPost | null> {
  const response = await fetch(`/api/blogs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  });
  if (!response.ok) {
    throw new Error(await parseError(response, "Failed to update blog post."));
  }
  return (await response.json()) as BlogPost;
}

export async function setBlogStatus(id: string, status: BlogPost["status"]): Promise<BlogPost | null> {
  const response = await fetch(`/api/blogs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });
  if (!response.ok) {
    throw new Error(await parseError(response, "Failed to update status."));
  }
  return (await response.json()) as BlogPost;
}

export async function deleteBlog(id: string): Promise<void> {
  const response = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error(await parseError(response, "Failed to delete blog post."));
  }
}

export async function getBlogStats() {
  const blogs = await getBlogs();
  const publishedBlogs = blogs.filter((blog) => blog.status === "Published");
  const draftBlogs = blogs.filter((blog) => blog.status === "Draft");
  const categories = new Set(blogs.map((blog) => blog.category));

  return {
    totalBlogs: blogs.length,
    publishedBlogs: publishedBlogs.length,
    draftBlogs: draftBlogs.length,
    totalCategories: categories.size
  };
}
