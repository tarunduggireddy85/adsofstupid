import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { readBlogs, writeBlogs } from "@/lib/db";
import type { BlogPost } from "@/lib/mockBlogs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const blogs = await readBlogs();
    const blog = blogs.find((b) => b.id === id || b.slug === id);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    if (blog.status === "Draft") {
      const cookieStore = await cookies();
      const isAdmin = cookieStore.get("admin_auth")?.value === "true";
      if (!isAdmin) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Failed to fetch blog:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_auth")?.value === "true";

  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const blogs = await readBlogs();
    const blogIndex = blogs.findIndex((b) => b.id === id);

    if (blogIndex === -1) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const existingBlog = blogs[blogIndex];

    if (body.slug && body.slug !== existingBlog.slug) {
      if (blogs.some((blog) => blog.slug === body.slug)) {
        return NextResponse.json({ error: "A blog post with this slug already exists." }, { status: 409 });
      }
    }

    const updatedBlog: BlogPost = {
      ...existingBlog,
      ...body,
      id: existingBlog.id,
      createdAt: existingBlog.createdAt,
      publishDate: body.publishDate || existingBlog.publishDate || new Date().toISOString().split("T")[0],
    };

    blogs[blogIndex] = updatedBlog;
    await writeBlogs(blogs);

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error("Failed to update blog:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_auth")?.value === "true";

  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const blogs = await readBlogs();
    const filteredBlogs = blogs.filter((blog) => blog.id !== id);

    if (blogs.length === filteredBlogs.length) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    await writeBlogs(filteredBlogs);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to delete blog:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
